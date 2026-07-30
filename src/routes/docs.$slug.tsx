import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownDoc, extractHeadings } from "@/components/MarkdownDoc";
import { TableOfContents } from "@/components/TableOfContents";
import { getDoc, DOCS_CATEGORY } from "@/lib/docs-catalog";
import { getSeedDoc } from "@/lib/seed-docs";
import { supabase } from "@/integrations/supabase/client";
import { useSEO, SITE_URL } from "@/hooks/use-seo";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => {
    const doc = getDoc(params.slug);
    if (!doc) throw notFound();
    return { name: doc.name };
  },
  component: DocPage,
  notFoundComponent: () => (
    <SiteShell><div className="p-8 text-sm">Doc not found.</div></SiteShell>
  ),
});

function DocPage() {
  const { name } = Route.useLoaderData();
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["doc", slug],
    queryFn: async () => {
      const { data: row } = await supabase
        .from("docs")
        .select("title, description, body_md, updated_at")
        .eq("category", DOCS_CATEGORY)
        .eq("slug", slug)
        .maybeSingle();
      if (row) return { ...row, source: "db" as const };
      const seed = getSeedDoc(slug);
      if (!seed) return null;
      return {
        title: seed.title,
        description: seed.description,
        body_md: seed.body_md,
        updated_at: null as string | null,
        source: "seed" as const,
      };
    },
  });

  const body = data?.body_md ?? "";
  const headings = extractHeadings(body);

  useSEO({
    title: data?.title ?? name,
    description: data?.description ?? `Panduan ${name} — instalasi dan konfigurasi step-by-step.`,
    path: `/docs/${slug}`,
    type: "article",
    jsonLd: data
      ? {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: data.title,
          description: data.description,
          url: `${SITE_URL}/docs/${slug}`,
          author: { "@type": "Person", name: "Nanda Khalif Akbar" },
          ...(data.updated_at ? { dateModified: data.updated_at } : {}),
        }
      : undefined,
  });

  return (
    <SiteShell>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <article className="min-w-0 flex-1">
          <Breadcrumbs
            items={[
              { label: "Docs", to: "/docs" },
              { label: name },
            ]}
          />
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                {name}
              </p>
            </div>
            {data?.updated_at && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Updated {new Date(data.updated_at).toLocaleDateString()}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="mt-8 space-y-3">
              <div className="h-8 w-2/3 bg-accent animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-accent animate-pulse rounded" />
              <div className="h-32 w-full bg-accent animate-pulse rounded mt-6" />
            </div>
          ) : (
            <div className="mt-4">
              <MarkdownDoc source={body} />
            </div>
          )}
        </article>

        <TableOfContents headings={headings} />
      </div>
    </SiteShell>
  );
}

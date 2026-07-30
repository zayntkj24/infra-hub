import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DOCS, slugify } from "@/lib/docs-catalog";
import { useSEO, SITE_URL } from "@/hooks/use-seo";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/docs/")({
  component: DocsIndex,
});

function DocsIndex() {
  useSEO({
    title: "Dokumentasi",
    description:
      "Kumpulan panduan instalasi dan konfigurasi infrastruktur server: Nagios, MailServer, Docker, PowerDNS, LibreNMS, dan lainnya.",
    path: "/docs",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Dokumentasi Infra Hub",
      url: `${SITE_URL}/docs`,
      hasPart: DOCS.map((d) => ({
        "@type": "TechArticle",
        name: d.name,
        url: `${SITE_URL}/docs/${d.slug}`,
      })),
    },
  });

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Breadcrumbs items={[{ label: "Docs" }]} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Documentation</h1>
        <p className="mt-1 text-muted-foreground">
          Practical, command-first guides for setting up and running server infrastructure.
        </p>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {DOCS.map((doc) => (
            <li key={doc.slug}>
              <Link
                to="/docs/$slug"
                params={{ slug: doc.slug }}
                className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5 text-sm hover:border-primary/50 hover:bg-accent"
              >
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="flex-1 min-w-0">{doc.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">/{slugify(doc.name)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}

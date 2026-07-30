import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { DOCS } from "@/lib/docs-catalog";
import { useSEO, SITE_URL } from "@/hooks/use-seo";
import { ArrowRight, Server } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useSEO({
    title: "Infra Hub — Sysadmin & Cloud Engineering Reference",
    description:
      "Dokumentasi praktis instalasi dan konfigurasi infrastruktur server: Nagios, MailServer, Docker, PowerDNS, LibreNMS, dan lainnya. Panduan step-by-step, langsung ke perintahnya.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Infra Hub",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/docs?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  });

  return (
    <SiteShell>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">// infra-hub</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
            Infrastructure docs for sysadmins & cloud engineers.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Practical, command-first reference for setting up and running server infrastructure.
            No fluff — just the steps, the commands, and the gotchas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Documentation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">All documentation</h2>
          <span className="text-[11px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">
            {DOCS.length} guides
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {DOCS.map((doc) => (
            <Link
              key={doc.slug}
              to="/docs/$slug"
              params={{ slug: doc.slug }}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                <Server className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium tracking-tight">{doc.name}</h3>
                <p className="text-[11px] font-mono text-muted-foreground">/docs/{doc.slug}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

// Built-in starter documentation. Every doc has its own source markdown file.
// Admin-created docs in Supabase override these by slug.
//
// Files are imported with Vite's ?raw suffix → plain string at build time.
// To edit content: open src/docs/linux/<slug-source>.md

import { DOCS } from "./docs-catalog";

// ── Source markdown files ────────────────────────────────────────────────
import nagiosMd     from "../docs/linux/nagios.md?raw";
import mailserverMd from "../docs/linux/mailserver.md?raw";
import dockerMd     from "../docs/linux/docker.md?raw";
import powerdnsMd   from "../docs/linux/powerdns.md?raw";
import librenmsMd   from "../docs/linux/librenms.md?raw";
import wordpressMd  from "../docs/linux/wordpress.md?raw";
import cyberpanelMd from "../docs/linux/cyberpanel.md?raw";
import wazuhlMd     from "../docs/linux/wazuh.md?raw";


export interface SeedDoc {
  slug: string;
  title: string;
  description: string;
  body_md: string;
}

// Map: doc slug → markdown string
const DOC_MAP: Record<string, string> = {
  "installasi-nagios":     nagiosMd,
  "installasi-mailserver": mailserverMd,
  "installasi-docker":     dockerMd,
  "installasi-powerdns":   powerdnsMd,
  "installasi-librenms":   librenmsMd,
  "installasi-wordpress":  wordpressMd,
  "installasi-cyberpanel": cyberpanelMd,
  "installasi-wazuhl":     wazuhMd,
};
 
/** Derive title and description from the markdown body */
function parseMeta(body: string): { title: string; description: string } {
  const lines = body.split("\n");
  const titleLine = lines.find((l) => l.startsWith("# "));
  const title = titleLine ? titleLine.replace(/^#\s+/, "").trim() : "Untitled";

  // First non-empty line that isn't a heading or blockquote arrow
  const desc =
    lines
      .slice(1)
      .find((l) => l.trim() && !l.startsWith("#") && !l.startsWith(">"))
      ?.trim() ?? "";

  return { title, description: desc };
}

export const SEED_DOCS: SeedDoc[] = DOCS.map((doc): SeedDoc => {
  const body_md = DOC_MAP[doc.slug] ?? `# ${doc.name}\n\nDokumentasi belum tersedia.`;
  const { title, description } = parseMeta(body_md);
  return { slug: doc.slug, title, description, body_md };
});

export function getSeedDoc(slug: string): SeedDoc | undefined {
  return SEED_DOCS.find((d) => d.slug === slug);
}

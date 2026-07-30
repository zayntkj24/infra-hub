// Flat documentation catalog — no categories, no subcategories.
// Every doc lives at the same level: /docs/$slug
//
// NOTE: the Supabase `docs` table still has legacy `category` / `subcategory`
// columns (see supabase/migrations). We keep using them under the hood so we
// don't need a destructive DB migration, but the app itself no longer exposes
// "category" as a concept — DOCS_CATEGORY is just a fixed, hidden bucket name.

export interface DocDef {
  slug: string;
  name: string;
}

/** Fixed internal bucket name used only for the Supabase `category` column. */
export const DOCS_CATEGORY = "docs";

export const DOCS: DocDef[] = [
  { slug: "installasi-nagios", name: "Installasi Nagios" },
  { slug: "installasi-mailserver", name: "Installasi MailServer" },
  { slug: "installasi-docker", name: "Installasi Docker" },
  { slug: "installasi-powerdns", name: "Installasi PowerDNS" },
  { slug: "installasi-librenms", name: "Installasi LibreNMS" },
  { slug: "installasi-wordpress", name: "Installasi Wordpress" },
  { slug: "installasi-cyberpanel", name: "Installasi Cyberpanel" },


];

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDoc(slug: string): DocDef | undefined {
  return DOCS.find((d) => d.slug === slug);
}

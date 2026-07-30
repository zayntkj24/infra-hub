import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FileText } from "lucide-react";
import { DOCS } from "@/lib/docs-catalog";
import { cn } from "@/lib/utils";

interface Props {
  onNavigate?: () => void;
}

export function DocsSidebar({ onNavigate }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex h-full flex-col gap-1 p-3 text-sm">
      <Link
        to="/docs"
        onClick={onNavigate}
        className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <BookOpen className="h-4 w-4 text-primary" />
        <span className="font-medium">All documentation</span>
      </Link>
      <ul className="flex flex-col gap-0.5">
        {DOCS.map((doc) => {
          const to = `/docs/${doc.slug}`;
          const active = pathname === to;
          return (
            <li key={doc.slug}>
              <Link
                to={to}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sidebar-foreground hover:bg-sidebar-accent",
                  active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                )}
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{doc.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

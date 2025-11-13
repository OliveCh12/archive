import { cn, container } from "@/lib/utils";
import { Mail, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t py-4">
      <div
        className={cn(
          "text-sm text-foreground flex justify-between items-center",
          container()
        )}
      >
        <div className="flex items-center gap-6">
          <div className="font-semibold text-foreground">Phoenix</div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Development
            </span>
            <span>v1.0.0</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:contact@phoenix-app.com"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
          <a
            href="https://github.com/phoenix-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

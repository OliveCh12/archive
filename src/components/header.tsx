import { Flame, Home, LogIn } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserButton } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";
import { cn, container } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

// Constants for styling consistency
const HEADER_HEIGHT = "h-14";
const HEADER_Z_INDEX = "z-50";

export function Header() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  return (
    <header
      className={cn(
        "w-full sticky top-0 flex items-center justify-between border-b bg-card",
        HEADER_HEIGHT,
        HEADER_Z_INDEX
      )}
    >
      {/* Header Container */}
      <div
        className={cn(
          "flex items-center justify-between gap-4 w-full",
          container()
        )}
      >
        <Button
          size="default"
          variant="default"
          asChild
          className="font-semibold"
          aria-label="Go to dashboard"
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <Flame aria-hidden="true" />
            <span className="hidden sm:inline">Phoenix</span>
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {isAuthenticated ? (
            <UserButton
              size="default"
              className="bg-secondary text-foreground hover:bg-secondary/80"
              additionalLinks={[
                { href: "/dashboard", icon: <Home />, label: "Dashboard" },
              ]}
            />
          ) : (
            <Button variant="default" size="icon" asChild aria-label="Sign in">
              <Link to="/auth/$path" params={{ path: "sign-in" }}>
                <LogIn className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

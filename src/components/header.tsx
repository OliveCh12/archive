import { LogOut, User, Loader2, Flame, LogIn } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "@tanstack/react-router";
import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types for better type safety
interface UserSession {
  user: {
    name?: string;
    email: string;
    isAnonymous: boolean;
  };
}

// Constants to avoid magic strings/numbers
const HEADER_HEIGHT = "h-14";
const HEADER_Z_INDEX = "z-50";
const TOAST_MESSAGES = {
  SIGNOUT_SUCCESS: "Successfully signed out",
  SIGNOUT_ERROR: "Failed to sign out. Please try again.",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
} as const;

// Extracted user info component for better organization
const UserInfo = ({ user }: { user: UserSession["user"] }) => (
  <div className="px-2 py-1.5 text-sm font-medium">
    {user.name || user.email}
    <span className="text-xs text-muted-foreground">
      {" "}({user.isAnonymous ? "Anonymous" : "User"})
    </span>
  </div>
);

// Extracted sign out button component
const SignOutButton = ({ isSigningOut, onSignOut }: { 
  isSigningOut: boolean; 
  onSignOut: () => void;
}) => (
  <DropdownMenuItem
    className={cn(
      "flex items-center cursor-pointer text-red-600 focus:text-red-600",
      isSigningOut && "opacity-70 cursor-not-allowed"
    )}
    onSelect={(e) => {
      e.preventDefault();
      if (!isSigningOut) onSignOut();
    }}
    disabled={isSigningOut}
  >
    {isSigningOut ? (
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
    ) : (
      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
    )}
    <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
  </DropdownMenuItem>
);

// Authenticated user dropdown component
const AuthenticatedUserDropdown = ({ 
  session, 
  isSigningOut, 
  onSignOut 
}: {
  session: UserSession;
  isSigningOut: boolean;
  onSignOut: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        aria-label="User menu"
        className="relative"
      >
        <User className="h-4 w-4" aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <UserInfo user={session.user} />
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          to="/account/$path"
          params={{ path: "profile" }}
          className="flex items-center cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <SignOutButton isSigningOut={isSigningOut} onSignOut={onSignOut} />
    </DropdownMenuContent>
  </DropdownMenu>
);

// Unauthenticated user login button component
const UnauthenticatedUserButton = () => (
  <Button
    variant="default"
    size="icon"
    asChild
    aria-label="Sign in"
  >
    <Link to="/auth/sign-in">
      <LogIn className="h-4 w-4" aria-hidden="true" />
    </Link>
  </Button>
);

export function Header() {
  const { navigate } = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session } = authClient.useSession();

  // Memoize the sign out function to prevent unnecessary re-renders
  const signOut = useCallback(async () => {
    if (isSigningOut) return; // Prevent multiple simultaneous sign outs
    
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: "/" });
            toast.success(TOAST_MESSAGES.SIGNOUT_SUCCESS);
          },
          onError: (error) => {
            console.error("Sign out error:", error);
            toast.error(TOAST_MESSAGES.SIGNOUT_ERROR);
          },
        },
      });
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      toast.error(TOAST_MESSAGES.UNEXPECTED_ERROR);
    } finally {
      setIsSigningOut(false);
    }
  }, [isSigningOut, navigate]);

  // Memoize the authentication status check
  const isAuthenticated = useMemo(() => !!session?.user, [session?.user]);

  return (
    <header 
      className={cn(
        "sticky top-0 flex items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-6",
        HEADER_HEIGHT,
        HEADER_Z_INDEX
      )}
    >
      <div className="flex items-center gap-4">
        <Button 
          size="sm" 
          variant="outline" 
          asChild 
          className="font-semibold"
          aria-label="Go to homepage"
        >
          <Link to="/" className="flex items-center gap-2">
            <Flame aria-hidden="true" />
            <span className="hidden sm:inline">Phoenix</span>
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        {isAuthenticated ? (
          <AuthenticatedUserDropdown 
            session={session!} 
            isSigningOut={isSigningOut}
            onSignOut={signOut}
          />
        ) : (
          <UnauthenticatedUserButton />
        )}
      </div>
    </header>
  );
}
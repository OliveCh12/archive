import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NameParts {
  firstName: string | null;
  lastName: string | null;
}

function extractNameParts(name?: string | null): NameParts {
  if (!name) {
    return { firstName: null, lastName: null };
  }

  const segments = name.trim().split(/\s+/).filter(Boolean);

  if (segments.length === 0) {
    return { firstName: null, lastName: null };
  }

  if (segments.length === 1) {
    return { firstName: segments[0], lastName: null };
  }

  const [firstName, ...rest] = segments;
  return { firstName: firstName ?? null, lastName: rest.join(" ") || null };
}

async function fetchSession() {
  const { data, error } = await authClient.getSession();

  if (error) {
    const message =
      typeof error === "string"
        ? error
        : error?.message ?? "Unable to load the current session.";

    throw new Error(message);
  }

  return data ?? null;
}

export function Greetings() {
  const {
    data: session,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 30_000,
  });

  const user = session?.user;

  const nameParts = useMemo(() => extractNameParts(user?.name), [user?.name]);

  if (isPending) {
    return (
      <Card className="border-border shadow-sm">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-44" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive/40 shadow-sm">
        <CardHeader>
          <CardTitle>We could not load your profile</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : "Please try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            The request failed or timed out.
          </span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in to unlock your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              We could not find an active session.
            </p>
          </div>
          <Button asChild>
            <Link to="/auth/$path" params={{ path: "sign-in" }}>
              Sign in
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const firstName = nameParts.firstName ?? user.email?.split("@")[0] ?? "User";
  const lastName = nameParts.lastName;
  const fullName = user.name ?? `${firstName}${lastName ? ` ${lastName}` : ""}`;

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle>Hello, {firstName}</CardTitle>
        <CardDescription>
          Here is a quick summary of your profile details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Full name</span>
          <span className="font-medium">{fullName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">First name</span>
          <span className="font-medium">{firstName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Last name</span>
          <span className="font-medium">
            {lastName ?? "Not provided"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{user.email ?? "Not provided"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Anonymous</span>
          <span className="font-medium">
            {user.isAnonymous ? "Yes" : "No"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

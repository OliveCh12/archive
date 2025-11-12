import { useMemo, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

const FILTER_OPTIONS = [
  { value: "latest", label: "Dernières offres" },
  { value: "valid", label: "Montages en cours de validité" },
  { value: "review", label: "Montages à contrôler" },
  { value: "local", label: "Montages de ma direction locale" },
  { value: "pending", label: "Montages en attente de contrôle" },
];

export function Greetings() {
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_OPTIONS[0].value);
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
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <Skeleton key={option.value} className="h-10 w-40" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>We could not load your profile</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : "Please try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 justify-between">
          <CardDescription className="flex-1">
            The request failed or timed out.
          </CardDescription>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in to unlock your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
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
    <Card>
      <CardHeader className="flex flex-col gap-4">
        <div className="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">{fullName}</CardTitle>
            <CardDescription>{user.email ?? "Adresse inconnue"}</CardDescription>
          </div>
          <Button asChild size="lg" className="self-start lg:self-center">
            <Link to="/dashboard">Nouvelle Offre</Link>
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <ToggleGroup
          type="single"
          value={activeFilter}
          onValueChange={(value) => {
            if (value) {
              setActiveFilter(value);
            }
          }}
          className="flex flex-wrap gap-2"
          aria-label="Filtres des offres"
        >
          {FILTER_OPTIONS.map((filter) => (
            <ToggleGroupItem key={filter.value} value={filter.value}>
              {filter.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}

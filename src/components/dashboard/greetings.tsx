import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { AlertTriangle, CheckCircle, Clock, MapPin, Timer } from "lucide-react"
import { useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { authClient } from "@/lib/auth-client"

interface NameParts {
    firstName: string | null
    lastName: string | null
}

function extractNameParts(name?: string | null): NameParts {
    if (!name) {
        return { firstName: null, lastName: null }
    }

    const segments = name.trim().split(/\s+/).filter(Boolean)

    if (segments.length === 0) {
        return { firstName: null, lastName: null }
    }

    if (segments.length === 1) {
        return { firstName: segments[0], lastName: null }
    }

    const [firstName, ...rest] = segments
    return { firstName: firstName ?? null, lastName: rest.join(" ") || null }
}

async function fetchSession() {
    const { data, error } = await authClient.getSession()

    if (error) {
        const message =
            typeof error === "string"
                ? error
                : (error?.message ?? "Unable to load the current session.")

        throw new Error(message)
    }

    return data ?? null
}

const FILTER_OPTIONS = [
    { value: "latest", label: "Dernières offres", icon: Clock },
    {
        value: "valid",
        label: "Montages en cours de validité",
        icon: CheckCircle
    },
    { value: "review", label: "Montages à contrôler", icon: AlertTriangle },
    { value: "local", label: "Montages de ma direction locale", icon: MapPin },
    { value: "pending", label: "Montages en attente de contrôle", icon: Timer }
]

export function Greetings() {
    const [activeFilter, setActiveFilter] = useState<string>(
        FILTER_OPTIONS[0].value
    )
    const {
        data: session,
        isPending,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ["session"],
        queryFn: fetchSession,
        staleTime: 30_000
    })

    const user = session?.user

    const nameParts = useMemo(() => extractNameParts(user?.name), [user?.name])

    if (isPending) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex flex-col gap-0 min-w-0 flex-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                        <Skeleton className="h-7 w-24 shrink-0" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                        {FILTER_OPTIONS.map((option) => (
                            <Skeleton
                                key={option.value}
                                className="h-7 w-full"
                            />
                        ))}
                    </div>
                    <div className="md:hidden">
                        <Skeleton className="h-8 w-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (isError) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                        We could not load your profile
                    </CardTitle>
                    <CardDescription className="text-sm">
                        {error instanceof Error
                            ? error.message
                            : "Please try again."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-2 justify-between pt-0">
                    <CardDescription className="flex-1 text-sm">
                        The request failed or timed out.
                    </CardDescription>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => refetch()}
                    >
                        Retry
                    </Button>
                </CardContent>
            </Card>
        )
    }

    if (!user) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Welcome</CardTitle>
                    <CardDescription className="text-sm">
                        Sign in to unlock your dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end pt-0">
                    <Button asChild size="sm" className="h-7 px-2 text-xs">
                        <Link to="/auth/$path" params={{ path: "sign-in" }}>
                            Sign in
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    const firstName = nameParts.firstName ?? user.email?.split("@")[0] ?? "User"
    const lastName = nameParts.lastName
    const fullName =
        user.name ?? `${firstName}${lastName ? ` ${lastName}` : ""}`

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage
                            src={user.image ?? undefined}
                            alt={fullName}
                        />
                        <AvatarFallback className="text-xs font-medium">
                            {firstName?.charAt(0)?.toUpperCase() ?? "U"}
                            {lastName?.charAt(0)?.toUpperCase() ?? ""}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0 min-w-0 flex-1">
                        <CardTitle className="text-primary text-base leading-tight">
                            {fullName}
                        </CardTitle>
                        <CardDescription className="overflow-wrap-anywhere text-xs leading-tight">
                            {user.email ?? "Adresse inconnue"}
                        </CardDescription>
                    </div>
                    <Button
                        asChild
                        size="lg"
                    >
                        <Link to="/dashboard">Nouvelle Offre</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>

                {/* Desktop: Toggle Group */}
                <div className="hidden md:block">
                    <ToggleGroup
                        type="single"
                        value={activeFilter}
                        onValueChange={(value) => {
                            if (value) {
                                setActiveFilter(value)
                            }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"
                        aria-label="Filtres des offres"
                    >
                        {FILTER_OPTIONS.map((filter) => {
                            const Icon = filter.icon
                            return (
                                <ToggleGroupItem
                                    key={filter.value}
                                    value={filter.value}
                                    className="flex items-center gap-1.5 px-2 py-1.5 h-auto w-auto border justify-start text-xs"
                                >
                                    <Icon className="h-3 w-3" />
                                    <span className="hidden lg:inline">
                                        {filter.label}
                                    </span>
                                    <span className="lg:hidden">
                                        {filter.label.split(" ")[0]}
                                    </span>
                                </ToggleGroupItem>
                            )
                        })}
                    </ToggleGroup>
                </div>

                {/* Mobile: Select Dropdown */}
                <div className="md:hidden">
                    <Select
                        value={activeFilter}
                        onValueChange={setActiveFilter}
                    >
                        <SelectTrigger className="w-full h-8 text-xs">
                            <SelectValue placeholder="Sélectionner un filtre" />
                        </SelectTrigger>
                        <SelectContent>
                            {FILTER_OPTIONS.map((filter) => {
                                const Icon = filter.icon
                                return (
                                    <SelectItem
                                        key={filter.value}
                                        value={filter.value}
                                        className="flex items-center gap-2 text-xs py-1.5"
                                    >
                                        <Icon className="h-3 w-3" />
                                        {filter.label}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

import { authClient } from "@/lib/auth-client"
import { Github, Home, LogOut, User } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-12 justify-between border-b bg-background/60 px-safe-or-4 backdrop-blur md:h-14 md:px-safe-or-6">
            <Link to="/" className="flex items-center gap-2">
                <Home className="size-5" />
                PHOENIX
            </Link>

            <div className="flex items-center gap-2">
                <a
                    href="https://github.com/daveyplate/better-auth-nextjs-starter"
                    target="_blank"
                    rel="noopener"
                >
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <Github />
                    </Button>
                </a>

                <ModeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                        >
                            <User />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link to="/account/$path" params={{ path: "profile" }}>
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => authClient.signOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

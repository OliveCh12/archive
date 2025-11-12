import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Link, useRouter } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import { useState } from "react"

import { authClient } from "@/lib/auth-client"
import { MetaTheme } from "./meta-theme"

export function Providers({ children }: { children: React.ReactNode }) {
    const { navigate } = useRouter()
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <AuthUIProvider
                    authClient={authClient}
                    navigate={(href) => navigate({ href })}
                    replace={(href) => navigate({ href, replace: true })}
                    Link={({ href, ...props }) => <Link to={href} {...props} />}
                >
                    {children}

                    <MetaTheme />
                </AuthUIProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

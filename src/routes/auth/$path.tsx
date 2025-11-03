import { AuthView } from "@daveyplate/better-auth-ui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/$path")({
    component: RouteComponent
})

function RouteComponent() {
    const { path } = Route.useParams()

    return (
        <main className="container items-center flex flex-col">
            <AuthView path={path} />
        </main>
    )
}

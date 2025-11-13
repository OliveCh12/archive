import { AccountView } from "@daveyplate/better-auth-ui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/account/$path")({
    component: RouteComponent
})

function RouteComponent() {
    const { path } = Route.useParams()

    return (
            <AccountView
                classNames={{
                    sidebar: {
                        base: "sticky top-20"
                    }
                }}
                path={path}
            />
    )
}

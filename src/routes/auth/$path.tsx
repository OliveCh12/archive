import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/$path")({
  component: RouteComponent,
});

function RouteComponent() {
  const { path } = Route.useParams();

  return (
    <div className="flex justify-center items-center h-full w-full">
      <AuthView
        path={path}
        redirectTo="/dashboard"
        localization={{ SIGN_IN: "Connexion", SIGN_UP: "Inscription" }}
        classNames={{
          title: "text-2xl font-semibold",
          footerLink: "text-primary hover:underline",
        }}
      />
    </div>
  );
}

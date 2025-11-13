import { createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";

import { Greetings } from "@/components/dashboard/greetings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OffresTable } from "@/components/offres/offres-table";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoute,
});

function DashboardRoute() {
  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="h-full w-full">
          <section className="flex h-full flex-col gap-4">
            <Greetings />
            <OffresTable />
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Quick actions</CardTitle>
                  <CardDescription>
                    Jump back into the work that needs your attention first.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  <Button variant="default" className="justify-start">
                    Create task
                  </Button>
                  <Button variant="outline" className="justify-start">
                    View teams
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Alert settings
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Open reports
                  </Button>
                </CardContent>
              </Card>

              <Card className="h-fit border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Session status</CardTitle>
                  <CardDescription>
                    Track the latest information about your authentication
                    state.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium">Active</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Last refresh
                      </span>
                      <span className="font-medium">Moments ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </SignedIn>
    </>
  );
}

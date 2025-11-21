import { createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { useState } from "react";

import { Greetings, FILTER_OPTIONS } from "@/components/dashboard/greetings";
import { DashboardStats } from "@/components/dashboard/stats";
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
  const [activeFilter, setActiveFilter] = useState<string>(
    FILTER_OPTIONS[0].value
  );

  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="h-full w-full space-y-4">
          <Greetings
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          
          <DashboardStats />

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <OffresTable filter={activeFilter} />
            </div>
            
            <div className="space-y-4">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Quick actions</CardTitle>
                  <CardDescription>
                    Jump back into the work that needs your attention first.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <Button variant="default" className="justify-start w-full">
                    Create task
                  </Button>
                  <Button variant="outline" className="justify-start w-full">
                    View teams
                  </Button>
                  <Button variant="outline" className="justify-start w-full">
                    Alert settings
                  </Button>
                  <Button variant="ghost" className="justify-start w-full">
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
          </div>
        </div>
      </SignedIn>
    </>
  );
}

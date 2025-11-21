import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useId } from "react";

export const Route = createFileRoute("/offres/create")({
  component: CreateOfferRoute,
});

function CreateOfferRoute() {
  const titleId = useId();
  const amountId = useId();
  const descriptionId = useId();

  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer une offre</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous pour créer une nouvelle offre.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={titleId}>Titre de l'offre</Label>
                  <Input id={titleId} placeholder="Ex: Financement projet A" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={amountId}>Montant (€)</Label>
                  <Input id={amountId} type="number" placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={descriptionId}>Description</Label>
                  <Textarea 
                    id={descriptionId} 
                    placeholder="Détails de l'offre..." 
                    className="min-h-[100px]"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link to="/dashboard">Annuler</Link>
              </Button>
              <Button>Créer l'offre</Button>
            </CardFooter>
          </Card>
        </div>
      </SignedIn>
    </>
  );
}

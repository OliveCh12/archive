import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Zap, Shield } from "lucide-react";

export const Route = createFileRoute("/")({ component: IndexPage });

// Feature data for better organization
const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description: "Optimized performance for seamless task management",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    description: "Work together efficiently, no matter where you are",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your peace of mind",
  },
];

// Gradient colors for the bento grid
const gradientColors = [
  "bg-gradient-to-br from-primary/20 to-primary/40",
  "bg-gradient-to-br from-primary/30 to-primary/50",
  "bg-gradient-to-br from-primary/25 to-primary/45",
  "bg-gradient-to-br from-primary/35 to-primary/55",
];

function IndexPage() {
  return (
    <div className="h-full text-foreground">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32 h-full overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Column - Content */}
            <div className="space-y-8 z-10">
              <Badge variant="secondary" className="w-fit">
                We've just raised $2.6M in funding →
              </Badge>

              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Effortless task management for{" "}
                <span className="text-primary">Remote Teams</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Streamline your projects, automate task assignments, and boost
                team productivity—anywhere, anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Button size="lg" className="sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                  Login LBP
                </Button>
                <Button size="lg" variant={"secondary"} className="sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                  Login SFIL
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Sign up and get 1 week free.{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Book a demo today.
                </Link>
              </p>

              {/* Features List */}
              <div className="pt-4 space-y-3">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-center gap-3">
                    <div className="text-primary">{feature.icon}</div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Bento Grid with Gradients */}
            <div className="relative">
              <div className="grid grid-cols-3 grid-rows-3 gap-4 h-96">
                {gradientColors.map((gradient, index) => (
                  <div
                    key={gradient}
                    className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                      index === 0
                        ? "col-span-2 row-span-2"
                        : index === 1
                        ? ""
                        : index === 2
                        ? "row-span-2"
                        : index === 3
                        ? ""
                        : "col-span-2"
                    }`}
                  >
                    <div className={`w-full h-full ${gradient} flex items-center justify-center`}>
                      <div className="text-center p-4">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Feature {index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
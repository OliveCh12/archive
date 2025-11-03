import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: IndexPage });
  const images = [
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1587",
    "https://images.unsplash.com/photo-1562519990-50eb51e282b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632",
    "https://plus.unsplash.com/premium_photo-1680206587718-19b00a9be6b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  ];



function IndexPage() {

  return (
    <div className="h-full text-foreground">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32 h-full">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                We've just raised $2.6M in funding →
              </Badge>

              <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold leading-tight">
                Effortless task management for{" "}
                <span className="text-primary">Remote Teams</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Streamline your projects, automate task assignments, and boost
                team productivity—anywhere, anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Button size="lg" className="sm:w-auto">
                  Login LBP
                </Button>
                <Button size="lg" variant={"secondary"} className="sm:w-auto">
                  Login SFIL
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Sign up and get 1 week free.{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Book a demo today.
                </Link>
              </p>
            </div>

            {/* Bento Image, use no image. , but block with gradient with color primary */}
            <div className="relative">
              <div className="grid grid-cols-3 grid-rows-3 gap-4 h-96">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-lg overflow-hidden ${
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
                    <img
                      src={image}
                      alt={`Bento Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Gradient Blocks
                <div className="col-span-2 row-span-2 bg-linear-to-br from-primary to-primary/50 rounded-lg shadow-lg"></div>
                <div className="bg-linear-to-tr from-primary/80 to-primary/30 rounded-lg shadow-lg"></div>
                <div className="row-span-2 bg-linear-to-bl from-primary/60 to-primary/40 rounded-lg shadow-lg"></div>
                <div className="bg-linear-to-r from-primary/70 to-primary/20 rounded-lg shadow-lg"></div>
                <div className="col-span-2 bg-linear-to-tl from-primary/50 to-primary/60 rounded-lg shadow-lg"></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


import { HeartHandshake } from "lucide-react";
import CreateEventForm from "@/components/events/CreateEventForm";

export default function CreateEventPage() {
    return (
        <main className="w-full bg-muted/20 px-4 py-12 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
                        <HeartHandshake className="h-7 w-7" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Create an Event
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Bring people together, support meaningful causes, and create
                        positive changes in your community.
                    </p>
                </div>

                <CreateEventForm />
            </div>
        </main>
    );
}

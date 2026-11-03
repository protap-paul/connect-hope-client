import EventsList from "@/components/events/EventsList";

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-muted/20 px-4 py-12 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-7xl">
                {/* Page Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Upcoming Events
                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Discover upcoming community events and join us
                        to make a positive difference.
                    </p>
                </div>

                {/* Events List */}
                <EventsList />
            </div>
        </main>
    );
}
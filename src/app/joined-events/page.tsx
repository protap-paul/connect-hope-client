import JoinedEventsList from "@/components/events/JoinedEventsList";

export default function JoinedEventsPage() {
    return (
        <main className="min-h-screen bg-muted/20 px-4 py-12 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My Joined Events
                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Explore the community events you have joined
                        and stay connected with meaningful activities.
                    </p>
                </div>

                <JoinedEventsList />
            </div>
        </main>
    );
}
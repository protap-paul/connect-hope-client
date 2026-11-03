import ManageEventsList from "@/components/events/ManageEventsList";


export default function ManageEventsPage() {
    return (
        <main className="min-h-screen bg-muted/20 px-4 py-12 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Manage My Events
                    </h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        View, update, and manage the community events you have created.
                    </p>
                </div>

                <ManageEventsList />
            </div>
        </main>
    );
}
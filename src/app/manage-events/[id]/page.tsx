import EditEventForm from "@/components/events/EditEventForm";
import { Suspense } from "react";

interface EditEventPageProps {
    params: Promise<{ id: string }>;
}

async function EditEventContent({ params }: EditEventPageProps) {
    const { id } = await params;

    return <EditEventForm id={id} />;
}

export default function EditEventPage({ params }: EditEventPageProps) {
    return (
        <main className="min-h-screen bg-muted/20 px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit Event
                    </h1>

                    <p className="mt-3 text-muted-foreground">
                        Update your event information and save your changes.
                    </p>
                </div>

                <Suspense
                    fallback={
                        <p className="py-12 text-center text-muted-foreground">
                            Loading edit page...
                        </p>
                    }
                >
                    <EditEventContent params={params} />
                </Suspense>
            </div>
        </main>
    );
}
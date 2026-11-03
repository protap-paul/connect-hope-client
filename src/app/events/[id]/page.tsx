import { Suspense } from "react";
import EventDetails from "@/components/events/EventDetails";

interface EventDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function EventDetailsContent({ params }: EventDetailsPageProps) {
    const { id } = await params;

    return <EventDetails id={id} />;
}

export default function EventDetailsPage({
    params,
}: EventDetailsPageProps) {
    return (
        <main className="min-h-screen bg-muted/20 px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <Suspense
                    fallback={
                        <p className="py-16 text-center">
                            Loading event details...
                        </p>
                    }
                >
                    <EventDetailsContent params={params} />
                </Suspense>
            </div>
        </main>
    );
}
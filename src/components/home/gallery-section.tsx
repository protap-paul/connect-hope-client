
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    ArrowRight,
    Images,
    Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import type { Event, EventsResponse } from "@/types/event";

const GallerySection = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    // Automatically hide notification after 4 seconds
    useEffect(() => {
        if (!showMessage) return;

        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, [showMessage]);

    const handleExploreEvents = () => {
        setShowMessage(true);
    };

    useEffect(() => {
        const fetchGalleryEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/past`
                );

                if (!response.ok) {
                    throw new Error("Failed to load gallery events.");
                }

                const result: EventsResponse = await response.json();

                if (!result.success) {
                    throw new Error(
                        result.message || "Something went wrong."
                    );
                }

                setEvents(result.data.slice(0, 6));
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryEvents();
    }, []);

    return (
        <section className="w-full py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                        <Images className="h-5 w-5" />
                        <span>Our Gallery</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Moments That{" "}
                        <span className="text-primary">Matter</span>
                    </h2>

                    <p className="mt-4 leading-7 text-muted-foreground">
                        Explore the moments, activities, and positive changes
                        created by people coming together for a better community.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-64 w-full rounded-xl"
                            />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-xl border border-destructive/30 p-8 text-center">
                        <p className="text-destructive">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && events.length === 0 && (
                    <div className="rounded-xl border p-10 text-center">
                        <Images className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

                        <h3 className="text-lg font-semibold">
                            No Events Available
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            There are no events to display in the gallery yet.
                        </p>
                    </div>
                )}

                {/* Gallery Grid */}
                {!loading && !error && events.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="group relative h-64 overflow-hidden rounded-xl"
                            >
                                <Image
                                    src={event.thumbnail}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                                <div className="absolute bottom-5 left-5 right-5">
                                    <Badge className="mb-2">
                                        {event.eventType}
                                    </Badge>

                                    <h3 className="text-lg font-semibold text-white">
                                        {event.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="mt-10 flex flex-col items-center text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={handleExploreEvents}
                    >
                        Explore Events
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* Coming Soon Notification */}
                    {showMessage && (
                        <div
                            role="status"
                            className="mt-4 flex w-full max-w-md items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-left animate-in fade-in slide-in-from-top-2 duration-300"
                        >
                            <div className="rounded-full bg-primary/10 p-2 text-primary">
                                <Clock className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    We&apos;re Working on It!
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    We&apos;re working on this feature.
                                    You can explore it soon. Stay tuned!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default GallerySection;

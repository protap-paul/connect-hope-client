
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event, EventsResponse } from "@/types/event";
import Image from "next/image";

const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/upcoming`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch upcoming events.");
                }

                const result: EventsResponse = await response.json();

                if (!result.success) {
                    throw new Error(result.message || "Something went wrong.");
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

        fetchUpcomingEvents();
    }, []);

    return (
        <section className="py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div className="max-w-2xl space-y-4">
                        <Badge variant="secondary">
                            Make A Difference
                        </Badge>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Upcoming{" "}
                            <span className="text-primary">Events</span>
                        </h2>

                        <p className="leading-7 text-muted-foreground">
                            Discover upcoming community events and become a part
                            of something meaningful.
                        </p>
                    </div>

                    <Link href="/events">
                        <Button variant="outline">
                            View All Events
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                                <Skeleton className="h-52 w-full rounded-none" />
                                <CardContent className="space-y-4 p-5">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <p className="py-10 text-center text-destructive">
                        {error}
                    </p>
                ) : events.length === 0 ? (
                    <p className="py-10 text-center text-muted-foreground">
                        No upcoming events available right now.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <Card
                                key={event._id}
                                className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={event.thumbnail}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <Badge className="absolute left-4 top-4">
                                        {event.eventType}
                                    </Badge>
                                </div>

                                <CardContent className="space-y-4 p-5">
                                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                                        {event.title}
                                    </h3>

                                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                                        {event.description}
                                    </p>

                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-primary" />
                                            {new Date(event.eventDate).toLocaleDateString(
                                                "en-US",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            {event.location}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-5 pt-0">
                                    <Link
                                        href={`/events/${event._id}`}
                                        className="w-full"
                                    >
                                        <Button className="w-full" variant="outline">
                                            View Details
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default UpcomingEvents;
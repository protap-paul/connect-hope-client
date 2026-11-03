
"use client";

import { useEffect, useState } from "react";
import { getJWTToken, useSession } from "@/lib/auth-client";
import type { Event } from "@/types/event";

import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    ArrowRight,
    Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function JoinedEventsList() {
    const router = useRouter();

    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentTime, setCurrentTime] = useState<number | null>(null);

    const { data: session, isPending } = useSession();

    // Get current time after component mounts
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTime(Date.now());
    }, []);

    useEffect(() => {
        if (isPending) return;

        // User logged out
        if (!session?.user) {
            toast.error("Please login to view your joined events.");
            router.replace("/login");
            return;
        }

        const fetchJoinedEvents = async () => {
            try {
                setIsLoading(true);
                setError("");

                const token = await getJWTToken();

                if (!token) {
                    toast.error("Please login again.");
                    router.replace("/login");
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/joined/my-events`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                if (response.status === 401) {
                    toast.error(
                        "Your session has expired. Please login again."
                    );
                    router.replace("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch joined events"
                    );
                }

                setEvents(result.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong!"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [session, isPending, router]);

    if (isLoading || isPending || currentTime === null) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                Loading your joined events...
            </p>
        );
    }

    if (error) {
        return (
            <p className="py-12 text-center text-destructive">
                {error}
            </p>
        );
    }

    if (events.length === 0) {
        return (
            <div className="rounded-xl border bg-card py-16 text-center">
                <h2 className="text-xl font-semibold">
                    No Joined Events Yet
                </h2>
                <p className="mt-2 text-muted-foreground">
                    Explore upcoming events and join a community activity.
                </p>
            </div>
        );
    }

    return (
        <div>
            <p className="mb-6 text-sm text-muted-foreground">
                You have joined {events.length} events.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                    const isExpired =
                        new Date(event.eventDate).getTime() < currentTime;

                    return (
                        <Card
                            key={event._id}
                            className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Event Image */}
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

                                {/* Event Status */}
                                <Badge
                                    variant={isExpired ? "destructive" : "default"}
                                    className={`absolute right-4 top-4 ${!isExpired
                                            ? "bg-green-600 text-white hover:bg-green-700"
                                            : ""
                                        }`}
                                >
                                    {isExpired ? "Expired" : "Upcoming"}
                                </Badge>
                            </div>

                            <CardContent className="space-y-4 p-5">
                                <h2 className="line-clamp-2 text-xl font-semibold">
                                    {event.title}
                                </h2>

                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {event.description}
                                </p>

                                <div className="space-y-3 text-sm text-muted-foreground">
                                    {/* Event Date */}
                                    <p className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                                        <span>
                                            Event Date:{" "}
                                            {new Date(event.eventDate).toLocaleDateString(
                                                "en-BD",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </p>

                                    {/* Joined Date */}
                                    <p className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 shrink-0 text-primary" />
                                        <span>
                                            Joined on:{" "}
                                            {event.joinedAt
                                                ? new Date(event.joinedAt).toLocaleDateString(
                                                    "en-BD",
                                                    {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "Date unavailable"}
                                        </span>
                                    </p>

                                    {/* Event Location */}
                                    <p className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                                        <span className="line-clamp-1">
                                            {event.location}
                                        </span>
                                    </p>
                                </div>
                            </CardContent>

                            <CardFooter className="p-5 pt-0">
                                <Button
                                    nativeButton={false}
                                    render={
                                        <Link href={`/events/${event._id}`} />
                                    }
                                    className="w-full"
                                >
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

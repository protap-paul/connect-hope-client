
"use client";

import { useEffect, useState } from "react";
import { getJWTToken } from "@/lib/auth-client";
import type { Event, EventsResponse } from "@/types/event";
import toast from "react-hot-toast";

import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import DeleteEventDialog from "@/components/events/DeleteEventDialog";

export default function ManageEventsList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentTime, setCurrentTime] = useState<number | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const token = await getJWTToken();

                if (!token) {
                    toast.error("Please login to manage your events.");
                    setError("You need to login to view your events.");
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/my-events`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result: EventsResponse = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to load your events."
                    );
                }

                setEvents(result.data);
            } catch (err) {
                const message =
                    err instanceof Error
                        ? err.message
                        : "Something went wrong.";

                setError(message);
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTime(Date.now());
    }, []);

    // Separate past and upcoming events
    const now = currentTime ?? 0;

    if (currentTime === null) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                Loading your events...
            </p>
        );
    }

    const pastEvents = events
        .filter(
            (event) =>
                new Date(event.eventDate).getTime() < now
        )
        .sort(
            (a, b) =>
                new Date(b.eventDate).getTime() -
                new Date(a.eventDate).getTime()
        );

    const upcomingEvents = events
        .filter(
            (event) =>
                new Date(event.eventDate).getTime() >= now
        )
        .sort(
            (a, b) =>
                new Date(a.eventDate).getTime() -
                new Date(b.eventDate).getTime()
        );

    // Reusable event card
    const renderEventCard = (event: Event, isExpired: boolean) => (
        <Card key={event._id} className="overflow-hidden pt-0">
            <div className="relative h-52 w-full">
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute right-3 top-3">
                    <Badge
                        variant={isExpired ? "destructive" : "default"}
                        className={
                            !isExpired
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : ""
                        }
                    >
                        {isExpired ? "Expired" : "Upcoming"}
                    </Badge>
                </div>
            </div>

            <CardContent className="space-y-3">
                <Badge variant="secondary">{event.eventType}</Badge>

                <h2 className="line-clamp-1 text-xl font-semibold">
                    {event.title}
                </h2>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {event.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(event.eventDate).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">
                        {event.location}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2">
                {/* View Button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    nativeButton={false}
                    render={<Link href={`/events/${event._id}`} />}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                </Button>

                {/* Edit Button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    nativeButton={false}
                    render={
                        <Link href={`/manage-events/${event._id}`} />
                    }
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>

                {/* Delete Button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-destructive/30 text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setSelectedEvent(event)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );

    if (isLoading) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                Loading your events...
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
            <div className="rounded-xl border border-dashed p-12 text-center">
                <h2 className="text-xl font-semibold">
                    No events found
                </h2>
                <p className="mt-2 text-muted-foreground">
                    You have not created any events yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <p className="text-sm text-muted-foreground">
                You have created {events.length} event(s).
            </p>

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Past Events
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {pastEvents.length} expired event(s).
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pastEvents.map((event) =>
                            renderEventCard(event, true)
                        )}
                    </div>
                </section>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Upcoming Events
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {upcomingEvents.length} upcoming event(s).
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {upcomingEvents.map((event) =>
                            renderEventCard(event, false)
                        )}
                    </div>
                </section>
            )}

            {/* Delete Event Dialog */}
            {selectedEvent && (
                <DeleteEventDialog
                    eventId={selectedEvent._id}
                    eventTitle={selectedEvent.title}
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) {
                            setSelectedEvent(null);
                        }
                    }}
                    onDeleted={(eventId) => {
                        setEvents((previousEvents) =>
                            previousEvents.filter(
                                (event) => event._id !== eventId
                            )
                        );

                        setSelectedEvent(null);
                    }}
                />
            )}
        </div>
    );
}

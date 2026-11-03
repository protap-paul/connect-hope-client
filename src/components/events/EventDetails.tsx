
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    CalendarDays,
    MapPin,
    CheckCircle2,
    LogOut,
    Users,
    Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Event, EventsResponse } from "@/types/event";
import { getJWTToken, useSession } from "@/lib/auth-client";

interface EventDetailsProps {
    id: string;
}

export default function EventDetails({ id }: EventDetailsProps) {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [isJoined, setIsJoined] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

    // Fetch Event Details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch event.");
                }

                setEvent(result.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    // Check whether current user has joined this event
    useEffect(() => {
        if (isPending) return;

        const checkJoinStatus = async () => {
            if (!session?.user) {
                setIsJoined(false);
                setIsCheckingStatus(false);
                return;
            }

            try {
                setIsCheckingStatus(true);

                const token = await getJWTToken();

                if (!token) {
                    setIsJoined(false);
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

                const result: EventsResponse = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to check join status."
                    );
                }

                setIsJoined(
                    result.data.some((joinedEvent) => joinedEvent._id === id)
                );
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to check join status.";

                toast.error(message);
            } finally {
                setIsCheckingStatus(false);
            }
        };

        checkJoinStatus();
    }, [id, session, isPending]);

    // Join Event
    const handleJoinEvent = async () => {
        if (isPending) return;

        if (!session?.user) {
            toast.error("Please login first to join this event.");
            router.push("/login");
            return;
        }

        setIsProcessing(true);

        try {
            const token = await getJWTToken();

            if (!token) {
                toast.error("Please login again to continue.");
                router.push("/login");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}/join`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (response.status === 401) {
                toast.error("Your session has expired. Please login again.");
                router.push("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(result.message || "Failed to join event.");
            }

            setIsJoined(true);

            setEvent((current) =>
                current
                    ? {
                        ...current,
                        volunteerCount: (current.volunteerCount ?? 0) + 1,
                    }
                    : current
            );

            toast.success("You have successfully joined this event!");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setIsProcessing(false);
        }
    };

    // Leave Event
    const handleLeaveEvent = async () => {
        setIsProcessing(true);

        try {
            const token = await getJWTToken();

            if (!token) {
                toast.error("Please login again to continue.");
                router.push("/login");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}/leave`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (response.status === 401) {
                toast.error("Your session has expired. Please login again.");
                router.push("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(result.message || "Failed to leave event.");
            }

            // Update joined status
            setIsJoined(false);

            // Close confirmation dialog
            setIsLeaveDialogOpen(false);

            // Update volunteer count
            setEvent((current) =>
                current
                    ? {
                        ...current,
                        volunteerCount: Math.max(
                            0,
                            (current.volunteerCount ?? 0) - 1
                        ),
                    }
                    : current
            );

            toast.success("You have successfully left this event.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setIsProcessing(false);
        }
    };

    // Loading State
    if (isLoading) {
        return (
            <p className="py-16 text-center text-muted-foreground">
                Loading event details...
            </p>
        );
    }

    // Error State
    if (error) {
        return (
            <p className="py-16 text-center text-destructive">{error}</p>
        );
    }

    // Not Found State
    if (!event) {
        return <p className="py-16 text-center">Event not found.</p>;
    }

    return (
        <Card className="overflow-hidden">
            <div className="relative h-64 sm:h-96">
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                />
            </div>

            <CardContent className="space-y-5 p-6 sm:p-8">
                <Badge>{event.eventType}</Badge>

                <h1 className="text-3xl font-bold sm:text-4xl">
                    {event.title}
                </h1>

                <p className="leading-7 text-muted-foreground">
                    {event.description}
                </p>

                <div className="flex flex-col gap-4 border-t pt-5 text-sm sm:flex-row sm:gap-8">
                    <p className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        {new Date(event.eventDate).toLocaleString("en-BD", {
                            dateStyle: "long",
                            timeStyle: "short",
                        })}
                    </p>

                    <p className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {event.location}
                    </p>
                </div>

                <div className="flex items-center gap-3 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <p className="text-2xl font-bold tabular-nums">
                            {event.volunteerCount ?? 0}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Volunteers Joined
                        </p>
                    </div>
                </div>

                {/* Event Organizer */}
                {event.organizer && (
                    <div className="rounded-xl border p-5 space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Event Organizer
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Organized by this community member
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {event.organizer.image ? (
                                <Image
                                    src={event.organizer.image}
                                    alt={event.organizer.name}
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                                    {event.organizer.name?.charAt(0).toUpperCase() || "O"}
                                </div>
                            )}

                            <div className="min-w-0 space-y-2">
                                <h3 className="font-semibold">
                                    {event.organizer.name}
                                </h3>

                                {event.organizer.email && (
                                    <p className="flex items-center gap-2 break-all text-sm text-muted-foreground">
                                        <Mail className="h-4 w-4 shrink-0" />
                                        {event.organizer.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Badge variant="secondary">
                            Event Organizer
                        </Badge>
                    </div>
                )}

                <div className="border-t pt-5">
                    {!session?.user ? (
                        <Button onClick={handleJoinEvent}>
                            Join This Event
                        </Button>
                    ) : isCheckingStatus ? (
                        <Button disabled>Checking Status...</Button>
                    ) : isJoined ? (
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" disabled>
                                <CheckCircle2 className="h-4 w-4" />
                                Joined
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => setIsLeaveDialogOpen(true)}
                            >
                                <LogOut className="h-4 w-4" />
                                Leave Event
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={handleJoinEvent}
                            disabled={isProcessing}
                        >
                            Join This Event
                        </Button>
                    )}
                </div>

                {/* Leave Event Confirmation Dialog */}
                <Dialog
                    open={isLeaveDialogOpen}
                    onOpenChange={(open) => {
                        if (!isProcessing) {
                            setIsLeaveDialogOpen(open);
                        }
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Leave This Event?</DialogTitle>

                            <DialogDescription>
                                Are you sure you want to leave "{event.title}"?
                                You can join again later if registration is still available.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsLeaveDialogOpen(false)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={handleLeaveEvent}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Leaving..." : "Yes, Leave Event"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}

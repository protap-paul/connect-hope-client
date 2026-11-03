
"use client";

import Link from "next/link";
import Image from "next/image";
import {
    CalendarDays,
    Users,
    Clock,
    HeartHandshake,
    Plus,
    ClipboardList,
    CalendarCheck,
    ArrowRight,
    RefreshCw,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getJWTToken, useSession } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DashboardStats {
    eventsCreated: number;
    eventsJoined: number;
    upcomingEvents: number;
    communityImpact: number;
}

interface DashboardEvent {
    _id: string;
    title: string;
    eventDate: string;
    eventType?: string;
    location?: string;
    thumbnail?: string;
    createdAt?: string;
    joinedAt?: string;
}

const quickActions = [
    {
        title: "Create Event",
        description: "Organize a new community event.",
        href: "/create-event",
        icon: Plus,
    },
    {
        title: "Manage Events",
        description: "Manage the events you created.",
        href: "/manage-events",
        icon: ClipboardList,
    },
    {
        title: "Joined Events",
        description: "View events you have joined.",
        href: "/joined-events",
        icon: CalendarCheck,
    },
];

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [stats, setStats] = useState<DashboardStats>({
        eventsCreated: 0,
        eventsJoined: 0,
        upcomingEvents: 0,
        communityImpact: 0,
    });

    const [loading, setLoading] = useState(true);

    const [currentTime, setCurrentTime] = useState<number | null>(null);

    useEffect(() => {
        setCurrentTime(Date.now());
    }, []);

    const [myRecentEvents, setMyRecentEvents] = useState<DashboardEvent[]>([]);
    const [joinedRecentEvents, setJoinedRecentEvents] = useState<DashboardEvent[]>([]);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    useEffect(() => {
        // Wait until Better Auth finishes checking the session.
        if (isPending) return;

        // Do not request a JWT if the user is not logged in.
        if (!session) return;

        const fetchDashboardStats = async () => {
            try {
                const token = await getJWTToken();

                if (!token) {
                    throw new Error("Authentication token not found.");
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const [myEventsResponse, joinedEventsResponse] =
                    await Promise.all([
                        fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/events/my-events`,
                            { headers, cache: "no-store" }
                        ),
                        fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/events/joined/my-events`,
                            { headers, cache: "no-store" }
                        ),
                    ]);

                if (!myEventsResponse.ok || !joinedEventsResponse.ok) {
                    throw new Error("Failed to fetch dashboard data.");
                }

                const myEventsData = await myEventsResponse.json();
                const joinedEventsData = await joinedEventsResponse.json();

                const myEvents: DashboardEvent[] = myEventsData.data || [];
                const joinedEvents: DashboardEvent[] =
                    joinedEventsData.data || [];

                const now = new Date();

                const upcomingEventIds = new Set(
                    [...myEvents, ...joinedEvents]
                        .filter((event) => new Date(event.eventDate) > now)
                        .map((event) => event._id)
                );

                setStats({
                    eventsCreated: myEvents.length,
                    eventsJoined: joinedEvents.length,
                    upcomingEvents: upcomingEventIds.size,
                    communityImpact: joinedEvents.length,
                });

                const sortedCreatedEvents = [...myEvents]
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt || 0).getTime() -
                            new Date(a.createdAt || 0).getTime()
                    )
                    .slice(0, 3);

                const sortedJoinedEvents = [...joinedEvents]
                    .sort(
                        (a, b) =>
                            new Date(b.joinedAt || 0).getTime() -
                            new Date(a.joinedAt || 0).getTime()
                    )
                    .slice(0, 3);

                setMyRecentEvents(sortedCreatedEvents);
                setJoinedRecentEvents(sortedJoinedEvents);
            } catch (error) {
                console.error("Dashboard Stats Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, [isPending, session]);

    const statistics = [
        {
            title: "Events Created",
            value: stats.eventsCreated,
            description: "Events you have organized",
            icon: CalendarDays,
        },
        {
            title: "Events Joined",
            value: stats.eventsJoined,
            description: "Events you have participated in",
            icon: Users,
        },
        {
            title: "Upcoming Events",
            value: stats.upcomingEvents,
            description: "Your upcoming activities",
            icon: Clock,
        },
        {
            title: "Community Participation",
            value: stats.communityImpact,
            description: "Events you have joined",
            icon: HeartHandshake,
        },
    ];

    const userName = session?.user?.name || "Volunteer";

    if (isPending) {
        return (
            <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
                <p className="text-muted-foreground">
                    Checking authentication...
                </p>
            </main>
        );
    }

    if (!session) {
        return null;
    }

    if (currentTime === null) {
        return (
            <main className="container mx-auto flex min-h-screen items-center justify-center px-4">
                <p className="text-muted-foreground">
                    Loading dashboard...
                </p>
            </main>
        );
    }

    return (
        <main className="container mx-auto min-h-screen space-y-8 px-4 py-10">

            {/* Welcome Section */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-2">
                    <Badge variant="secondary">Volunteer Dashboard</Badge>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {userName}!
                    </h1>

                    <p className="text-muted-foreground">
                        Track your activities and make a difference in your community.
                    </p>
                </div>

                <Button
                    nativeButton={false}
                    render={<Link href="/create-event" />}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                </Button>
            </section>

            {/* Statistics */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Your Overview</h2>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statistics.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card key={item.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {item.title}
                                    </CardTitle>

                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                </CardHeader>

                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {loading ? "..." : item.value}
                                    </div>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Quick Actions</h2>

                <div className="grid gap-4 md:grid-cols-3">
                    {quickActions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Card key={action.title} className="transition-shadow hover:shadow-md">
                                <CardContent className="flex items-center justify-between gap-3 p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-muted p-3">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        nativeButton={false}
                                        render={<Link href={action.href} />}
                                        aria-label={`Go to ${action.title}`}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Recent Activities */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Activities</h2>

                    <Button
                        variant="outline"
                        size="sm"
                        nativeButton={false}
                        render={<Link href="/manage-events" />}
                    >
                        Manage Events
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    {/* Created Events */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Created Events
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Your recently organized events
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {loading ? (
                                <p className="py-6 text-center text-sm text-muted-foreground">
                                    Loading events...
                                </p>
                            ) : myRecentEvents.length === 0 ? (
                                <p className="py-6 text-center text-sm text-muted-foreground">
                                    You haven&apos;t created any events yet.
                                </p>
                            ) : (
                                myRecentEvents.map((event) => {
                                    const isUpcoming =
                                        new Date(event.eventDate).getTime() > currentTime;

                                    return (
                                        <div
                                            key={event._id}
                                            className="flex items-center gap-3 rounded-lg border p-3"
                                        >
                                            <Image
                                                src={event.thumbnail || "/placeholder-event.jpg"}
                                                alt={event.title}
                                                width={64}
                                                height={64}
                                                className="h-16 w-16 shrink-0 rounded-md object-cover"
                                            />

                                            <div className="min-w-0 flex-1 space-y-1">
                                                <Link
                                                    href={`/events/${event._id}`}
                                                    className="line-clamp-1 text-sm font-semibold hover:underline"
                                                >
                                                    {event.title}
                                                </Link>

                                                <p className="text-xs text-muted-foreground">
                                                    Created:{" "}
                                                    {event.createdAt
                                                        ? new Date(event.createdAt).toLocaleDateString("en-GB")
                                                        : "N/A"}
                                                </p>

                                                <Badge
                                                    variant={isUpcoming ? "default" : "secondary"}
                                                    className="text-[10px]"
                                                >
                                                    {isUpcoming ? "Upcoming" : "Completed"}
                                                </Badge>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>

                    {/* Joined Events */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Joined Events
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Events you have recently joined
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {loading ? (
                                <p className="py-6 text-center text-sm text-muted-foreground">
                                    Loading events...
                                </p>
                            ) : joinedRecentEvents.length === 0 ? (
                                <p className="py-6 text-center text-sm text-muted-foreground">
                                    You haven&apos;t joined any events yet.
                                </p>
                            ) : (
                                joinedRecentEvents.map((event) => {
                                    const isUpcoming =
                                        new Date(event.eventDate).getTime() > currentTime;

                                    return (
                                        <div
                                            key={event._id}
                                            className="flex items-center gap-3 rounded-lg border p-3"
                                        >
                                            <Image
                                                src={event.thumbnail || "/placeholder-event.jpg"}
                                                alt={event.title}
                                                width={64}
                                                height={64}
                                                className="h-16 w-16 shrink-0 rounded-md object-cover"
                                            />

                                            <div className="min-w-0 flex-1 space-y-1">
                                                <Link
                                                    href={`/events/${event._id}`}
                                                    className="line-clamp-1 text-sm font-semibold hover:underline"
                                                >
                                                    {event.title}
                                                </Link>

                                                <p className="text-xs text-muted-foreground">
                                                    Joined:{" "}
                                                    {event.joinedAt
                                                        ? new Date(event.joinedAt).toLocaleDateString("en-GB")
                                                        : "N/A"}
                                                </p>

                                                <Badge
                                                    variant={isUpcoming ? "default" : "secondary"}
                                                    className="text-[10px]"
                                                >
                                                    {isUpcoming ? "Upcoming" : "Completed"}
                                                </Badge>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}


"use client";

import { useEffect, useMemo, useState } from "react";
import type { Event, EventsResponse } from "@/types/event";

import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    ArrowRight,
    Search,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function EventsList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Search and Category Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/upcoming`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch upcoming events");
                }

                const result: EventsResponse = await response.json();

                setEvents(result.data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Get Unique Event Categories
    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(events.map((event) => event.eventType)),
        ];
    }, [events]);

    // Search and Category Filtering
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const search = searchTerm.trim().toLowerCase();

            const matchesSearch =
                event.title.toLowerCase().includes(search) ||
                event.description.toLowerCase().includes(search) ||
                event.location.toLowerCase().includes(search);

            const matchesCategory =
                selectedCategory === "All" ||
                event.eventType === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [events, searchTerm, selectedCategory]);

    // Clear Search and Filter
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("All");
    };

    if (isLoading) {
        return <p className="py-10 text-center">Loading events...</p>;
    }

    if (error) {
        return (
            <p className="py-10 text-center text-destructive">
                {error}
            </p>
        );
    }

    if (events.length === 0) {
        return (
            <p className="py-10 text-center">
                No upcoming events found.
            </p>
        );
    }

    return (
        <div>
            {/* Search and Category Filter */}
            <div className="mb-8 space-y-5 rounded-xl border bg-card p-5">

                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by event name, description or location..."
                        className="h-12 w-full rounded-lg border border-input bg-background pl-12 pr-12 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold">
                        Filter by Category
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                type="button"
                                size="sm"
                                variant={
                                    selectedCategory === category
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                            >
                                {category === "All" ? "All Events" : category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory !== "All") && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="px-0 text-primary"
                    >
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                )}
            </div>

            {/* Results Count */}
            <p className="mb-6 text-sm text-muted-foreground">
                Showing {filteredEvents.length} of {events.length} upcoming events
            </p>

            {/* No Search Results */}
            {filteredEvents.length === 0 ? (
                <div className="rounded-xl border bg-card py-16 text-center">
                    <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

                    <h2 className="text-xl font-semibold">
                        No Events Found
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Try another search term or category.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-5"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                </div>
            ) : (
                /* Event Cards */
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
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
                            </div>

                            <CardContent className="space-y-4 p-5">
                                <h2 className="line-clamp-2 text-xl font-semibold">
                                    {event.title}
                                </h2>

                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {event.description}
                                </p>

                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-primary" />
                                        {new Date(event.eventDate).toLocaleDateString("en-BD", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span className="line-clamp-1">
                                            {event.location}
                                        </span>
                                    </p>
                                </div>
                            </CardContent>

                            <CardFooter className="p-5 pt-0">
                                <Button
                                    nativeButton={false}
                                    render={<Link href={`/events/${event._id}`} />}
                                    className="w-full"
                                >
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

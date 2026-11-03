
"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getJWTToken } from "@/lib/auth-client";
import { useState } from "react";

import {
    CalendarDays,
    HeartHandshake,
    ImagePlus,
    MapPin,
} from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { eventTypes, type EventType } from "@/types/event";

// Validation Schema
const createEventSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters"),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters"),

    eventType: z.custom<EventType>(
        (value) =>
            typeof value === "string" &&
            eventTypes.includes(value as EventType),
        "Please select a valid event type"
    ),

    thumbnail: z
        .string()
        .trim()
        .url("Please enter a valid image URL"),

    location: z
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters"),

    eventDate: z
        .string()
        .min(1, "Please select an event date")
        .refine(
            (value) =>
                !Number.isNaN(new Date(value).getTime()) &&
                new Date(value).getTime() > Date.now(),
            "Event date must be in the future"
        ),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEventForm() {

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CreateEventFormValues>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            title: "",
            description: "",
            eventType: "",
            thumbnail: "",
            location: "",
            eventDate: "",
        },
    });

    // Form Submit Handler
    const onSubmit = async (data: CreateEventFormValues) => {
        try {
            setIsSubmitting(true);

            // Get logged-in user's JWT token
            const token = await getJWTToken();

            if (!token) {
                toast.error("Please login to create an event.");
                return;
            }

            // Send event data to backend
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create event");
            }

            toast.success("Event created successfully!");

            reset();

            router.push("/events");
        } catch (error) {
            console.error("Create event error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
            <div className="mb-8 border-b pb-5">
                <h2 className="text-xl font-semibold">
                    Event Information
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Fill in the details below to create your community event.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Event Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>

                    <Input
                        id="title"
                        placeholder="Enter your event title"
                        {...register("title")}
                    />

                    {errors.title && (
                        <p className="text-sm text-destructive">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Event Description
                    </Label>

                    <Textarea
                        id="description"
                        placeholder="Describe your event..."
                        rows={5}
                        {...register("description")}
                    />

                    {errors.description && (
                        <p className="text-sm text-destructive">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>

                    <Controller
                        name="eventType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="eventType"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Select an event type" />
                                </SelectTrigger>

                                <SelectContent>
                                    {eventTypes.map((type) => (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                        >
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.eventType && (
                        <p className="text-sm text-destructive">
                            {errors.eventType.message}
                        </p>
                    )}
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                    <Label htmlFor="thumbnail">
                        <ImagePlus className="mr-2 inline h-4 w-4" />
                        Thumbnail Image URL
                    </Label>

                    <Input
                        id="thumbnail"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...register("thumbnail")}
                    />

                    {errors.thumbnail && (
                        <p className="text-sm text-destructive">
                            {errors.thumbnail.message}
                        </p>
                    )}
                </div>

                {/* Event Location */}
                <div className="space-y-2">
                    <Label htmlFor="location">
                        <MapPin className="mr-2 inline h-4 w-4" />
                        Event Location
                    </Label>

                    <Input
                        id="location"
                        placeholder="Enter event location"
                        {...register("location")}
                    />

                    {errors.location && (
                        <p className="text-sm text-destructive">
                            {errors.location.message}
                        </p>
                    )}
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                    <Label htmlFor="eventDate">
                        <CalendarDays className="mr-2 inline h-4 w-4" />
                        Event Date & Time
                    </Label>

                    <Input
                        id="eventDate"
                        type="datetime-local"
                        {...register("eventDate")}
                    />

                    {errors.eventDate && (
                        <p className="text-sm text-destructive">
                            {errors.eventDate.message}
                        </p>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => reset()}
                    >
                        Reset Form
                    </Button>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Event..." : "Create Event"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

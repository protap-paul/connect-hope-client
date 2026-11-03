"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { getJWTToken } from "@/lib/auth-client";
import { eventTypes } from "@/types/event";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const editEventSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    eventType: z.string().min(1, "Please select an event type."),
    thumbnail: z.string().url("Please enter a valid image URL."),
    location: z.string().min(3, "Location must be at least 3 characters."),
    eventDate: z.string().min(1, "Please select an event date."),
});

type EditEventFormValues = z.infer<typeof editEventSchema>;

interface EditEventFormProps {
    id: string;
}

export default function EditEventForm({ id }: EditEventFormProps) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditEventFormValues>({
        resolver: zodResolver(editEventSchema),
        defaultValues: {
            title: "",
            description: "",
            eventType: "",
            thumbnail: "",
            location: "",
            eventDate: "",
        },
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to load event.");
                }

                const event = result.data;

                reset({
                    title: event.title,
                    description: event.description,
                    eventType: event.eventType,
                    thumbnail: event.thumbnail,
                    location: event.location,
                    eventDate: new Date(event.eventDate)
                        .toISOString()
                        .slice(0, 16),
                });
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "Something went wrong.";

                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [id, reset]);

    const onSubmit = async (data: EditEventFormValues) => {
        setIsSubmitting(true);

        try {
            const token = await getJWTToken();

            if (!token) {
                toast.error("Please login to update your event.");
                router.push("/login");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...data,
                        eventDate: new Date(data.eventDate).toISOString(),
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update event.");
            }

            toast.success("Event updated successfully!");
            router.push("/manage-events");
            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Something went wrong.";

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                Loading event information...
            </p>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
        >
            <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={5} {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                    id="eventType"
                    {...register("eventType")}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {errors.eventType && (
                    <p className="text-sm text-destructive">
                        {errors.eventType.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input id="thumbnail" type="url" {...register("thumbnail")} />
                {errors.thumbnail && (
                    <p className="text-sm text-destructive">
                        {errors.thumbnail.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} />
                {errors.location && (
                    <p className="text-sm text-destructive">
                        {errors.location.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
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

            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Updating..." : "Update Event"}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
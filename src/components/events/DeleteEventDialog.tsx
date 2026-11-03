"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getJWTToken } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DeleteEventDialogProps {
    eventId: string;
    eventTitle: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDeleted: (eventId: string) => void;
}

export default function DeleteEventDialog({
    eventId,
    eventTitle,
    open,
    onOpenChange,
    onDeleted,
}: DeleteEventDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const token = await getJWTToken();

            if (!token) {
                toast.error("Please login to delete your event.");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete event.");
            }

            toast.success("Event deleted successfully!");
            onDeleted(eventId);
            onOpenChange(false);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Something went wrong.";

            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Event?</DialogTitle>

                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <strong>{eventTitle}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
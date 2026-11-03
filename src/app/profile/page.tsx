
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import { getJWTToken, useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    image?: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { data: session, isPending } = useSession();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getJWTToken();

                if (!token) {
                    throw new Error("Authentication token not found.");
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to load profile.");
                }

                setProfile(result.data);

                setName(result.data.name);
                setImage(result.data.image || "");
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.";

                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending && session?.user) {
            fetchProfile();
        }
    }, [isPending, session]);

    if (isPending || (session?.user && loading)) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p>Unable to load your profile.</p>
            </div>
        );
    }

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);

            const token = await getJWTToken();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, image }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Profile update failed.");
            }

            setProfile(result.data);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setSaving(false);
        }
    };


    return (
        <main className="container mx-auto min-h-screen px-4 py-12">
            <div className="mx-auto max-w-2xl space-y-8">

                {/* Page Heading */}
                <div className="space-y-2 text-center">
                    <Badge variant="secondary">My Account</Badge>

                    <h1 className="text-3xl font-bold tracking-tight">
                        My Profile
                    </h1>

                    <p className="text-muted-foreground">
                        View and manage your personal information.
                    </p>
                </div>

                {/* Profile Card */}
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-28 w-28">
                            <AvatarImage
                                src={profile.image || ""}
                                alt={profile.name}
                            />
                            <AvatarFallback className="text-3xl">
                                {profile.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <CardTitle className="text-2xl">
                            {profile.name}
                        </CardTitle>

                        <CardDescription>
                            {profile.email}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Separator />

                        {/* Profile Information */}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input value={profile.name} readOnly />
                            </div>

                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input value={profile.email} readOnly />
                            </div>

                            <div className="space-y-2">
                                <Label>Member Since</Label>
                                <Input
                                    value={new Date(
                                        profile.createdAt
                                    ).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    readOnly
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Edit Profile Button */}

                        {isEditing ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Full Name</Label>
                                    <Input
                                        id="edit-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        minLength={2}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-image">Profile Image URL</Label>
                                    <Input
                                        id="edit-image"
                                        type="url"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={saving}
                                        onClick={() => {
                                            setName(profile.name);
                                            setImage(profile.image || "");
                                            setIsEditing(false);
                                        }}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="w-full"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        )}

                    </CardContent>
                </Card>
            </div>
        </main>
    );

}

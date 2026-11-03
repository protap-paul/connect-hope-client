
"use client";

import Image from "next/image";
import {
    ArrowRight,
    HeartHandshake,
    Users,
    Leaf,
    HandHeart,
    PlusCircle,
    MapPin,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const handleCreateEvent = () => {
        if (isPending) return;

        if (session?.user) {
            router.push("/create-event");
        } else {
            router.push("/login");
        }
    };

    return (
        <section className="relative isolate overflow-hidden bg-background">
            {/* Background Image */}
            <div
                className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-[0.10] dark:opacity-[0.07]"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=2000&q=85')",
                }}
            />

            {/* Background Overlay */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/95 to-primary/10" />

            {/* Decorative Shapes */}
            <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-24 lg:gap-20 lg:px-10">

                {/* Hero Content */}
                <div className="space-y-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                        <HeartHandshake className="h-4 w-4" />
                        Together, We Can Make a Difference
                    </div>

                    <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Connecting People,
                        <span className="block text-primary">
                            Creating Hope.
                        </span>
                    </h1>

                    <p className="max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
                        Join a community of passionate people working together
                        to make the world better. Discover meaningful events,
                        support important causes, and create positive change.
                    </p>

                    {/* Hero Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            nativeButton={false}
                            render={<a href="/events" />}
                        >
                            Explore Events
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleCreateEvent}
                            disabled={isPending}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create an Event
                        </Button>
                    </div>

                    {/* Impact Highlights */}
                    <div className="flex flex-wrap gap-6 border-t pt-7 sm:gap-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Community</p>
                                <p className="text-xs text-muted-foreground">
                                    People Together
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Environment</p>
                                <p className="text-xs text-muted-foreground">
                                    A Greener Future
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <HandHeart className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Social Care</p>
                                <p className="text-xs text-muted-foreground">
                                    Helping Others
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image Collage */}
                <div className="relative mx-auto w-full max-w-xl">
                    {/* Decorative Glow */}
                    <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-green-500/20 blur-2xl" />

                    {/* Main Image Frame */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 p-3 shadow-2xl backdrop-blur-md sm:p-4">

                        {/* Main Background Image */}
                        <div className="relative mb-3 h-48 overflow-hidden rounded-2xl sm:h-56">
                            <Image
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
                                alt="Volunteers working together for a community cause"
                                fill
                                priority
                                unoptimized
                                sizes="(max-width: 768px) 100vw, 600px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                            <div className="absolute bottom-5 left-5 text-white">
                                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
                                    <Sparkles className="h-3 w-3" />
                                    Making a Difference
                                </div>
                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    Together for a Better World
                                </h2>
                            </div>
                        </div>

                        {/* Four Event Images */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* Cleanup Event */}
                            <div className="group relative h-36 overflow-hidden rounded-2xl sm:h-40">
                                <Image
                                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=85"
                                    alt="Community cleanup event"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 50vw, 300px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                                <div className="absolute bottom-3 left-3 text-white">
                                    <p className="font-semibold">Clean Together</p>
                                    <p className="text-xs text-white/80">Cleanup</p>
                                </div>
                            </div>

                            {/* Plantation Event */}
                            <div className="group relative h-36 overflow-hidden rounded-2xl sm:h-40">
                                <Image
                                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=85"
                                    alt="Plantation and tree growing event"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 50vw, 300px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                                <div className="absolute bottom-3 left-3 text-white">
                                    <p className="font-semibold">Plant for Future</p>
                                    <p className="text-xs text-white/80">Plantation</p>
                                </div>
                            </div>

                            {/* Donation Event */}
                            <div className="group relative h-36 overflow-hidden rounded-2xl sm:h-40">
                                <Image
                                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=700&q=85"
                                    alt="Volunteers helping people through donation"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 50vw, 300px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                                <div className="absolute bottom-3 left-3 text-white">
                                    <p className="font-semibold">Spread Kindness</p>
                                    <p className="text-xs text-white/80">Donation</p>
                                </div>
                            </div>

                            {/* Community Event */}
                            <div className="group relative h-36 overflow-hidden rounded-2xl sm:h-40">
                                <Image
                                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=85"
                                    alt="People participating in a community event"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 50vw, 300px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                                <div className="absolute bottom-3 left-3 text-white">
                                    <p className="font-semibold">Unite People</p>
                                    <p className="text-xs text-white/80">Community</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Community Card */}
                    <div className="absolute -left-3 top-1/3 hidden items-center gap-3 rounded-2xl border bg-card/95 p-3 shadow-xl backdrop-blur-md sm:flex md:-left-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <HeartHandshake className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Spread Hope</p>
                            <p className="text-xs text-muted-foreground">
                                Every action matters
                            </p>
                        </div>
                    </div>

                    {/* Floating Location Card */}
                    <div className="absolute -bottom-5 right-3 flex items-center gap-2 rounded-2xl border bg-card/95 px-4 py-3 shadow-xl backdrop-blur-md sm:right-6">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Local Impact</p>
                            <p className="text-xs text-muted-foreground">
                                Start in your community
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
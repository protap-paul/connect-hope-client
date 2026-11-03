
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    ArrowRight,
    HeartHandshake,
    Leaf,
    Users,
    HandHeart,
    Clock,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const impacts = [
    {
        icon: Users,
        title: "Stronger Communities",
        description:
            "Bring people together to build supportive and connected communities.",
    },
    {
        icon: Leaf,
        title: "Greener Environment",
        description:
            "Take part in tree plantation and cleanup activities for a better planet.",
    },
    {
        icon: HandHeart,
        title: "Helping People",
        description:
            "Support people in need through donation and community initiatives.",
    },
];

const ImpactSection = () => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (!showMessage) return;

        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, [showMessage]);

    const handleJoinCommunity = () => {
        setShowMessage(true);
    };

    return (
        <section className="w-full bg-muted/40 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Content */}
                <div className="grid items-center gap-12 lg:grid-cols-2">

                    {/* Left Content */}
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
                            <HeartHandshake className="h-5 w-5" />
                            <span>Our Community Impact</span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Together, We Can Make a{" "}
                            <span className="text-primary">
                                Real Difference.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                            Every small action can create a meaningful change.
                            ConnectHope brings passionate people together to
                            support communities, protect the environment, and
                            help those in need.
                        </p>

                        <div className="mt-8">
                            <Button
                                size="lg"
                                onClick={handleJoinCommunity}
                            >
                                Join Our Community
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            {/* Coming Soon Message */}
                            {showMessage && (
                                <div
                                    role="status"
                                    className="mt-4 flex max-w-md items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 animate-in fade-in slide-in-from-top-2 duration-300"
                                >
                                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            Coming Soon!
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            This section is coming soon.
                                            Stay tuned for exciting updates!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85"
                                alt="Community volunteers working together"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
                                <div className="mb-3 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        Together We Grow
                                    </span>
                                </div>

                                <h3 className="max-w-md text-2xl font-bold sm:text-3xl">
                                    Small Actions. Big Changes.
                                </h3>

                                <p className="mt-2 text-sm text-white/80">
                                    Every volunteer makes a difference.
                                </p>
                            </div>
                        </div>

                        {/* Floating Decoration */}
                        <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border bg-background p-4 shadow-lg sm:flex">
                            <div className="rounded-full bg-primary/10 p-3 text-primary">
                                <HeartHandshake className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Spread Hope
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Inspire positive change
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Cards */}
                <div className="mt-20 grid gap-5 md:grid-cols-3">
                    {impacts.map((impact) => {
                        const Icon = impact.icon;

                        return (
                            <Card
                                key={impact.title}
                                className="border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <CardContent className="flex items-start gap-5 p-6">
                                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {impact.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {impact.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default ImpactSection;

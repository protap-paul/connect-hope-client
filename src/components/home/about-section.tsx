
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Users,
    Leaf,
    HandHeart,
    HeartHandshake,
    Sparkles,
} from "lucide-react";

export default function AboutSection() {
    const features = [
        {
            icon: Users,
            title: "Community First",
            description: "Bringing people together for a common purpose.",
        },
        {
            icon: Leaf,
            title: "Green Future",
            description: "Supporting a cleaner and healthier environment.",
        },
        {
            icon: HandHeart,
            title: "Social Impact",
            description: "Helping people and supporting meaningful causes.",
        },
        {
            icon: HeartHandshake,
            title: "Together We Grow",
            description: "Every volunteer can help create positive change.",
        },
    ];

    return (
        <section className="relative overflow-hidden border-t bg-muted/30 py-20 sm:py-28">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">

                {/* Left: About Image */}
                <div className="relative mx-auto w-full max-w-xl">
                    {/* Main Image */}
                    <div className="relative h-105 overflow-hidden rounded-[2rem] shadow-xl sm:h-[520px]">
                        <Image
                            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=85"
                            alt="Volunteers helping people in their community"
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                        <div className="absolute bottom-8 left-7 right-7 text-white sm:bottom-10 sm:left-10">
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                <HeartHandshake className="h-6 w-6" />
                            </div>

                            <h3 className="max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                                Together, We Create a Better Tomorrow.
                            </h3>

                            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                                Every small action brings us one step closer
                                to a stronger and more caring community.
                            </p>
                        </div>
                    </div>

                    {/* Floating Quote Card */}
                    <div className="absolute -bottom-7 right-4 flex max-w-[260px] items-center gap-3 rounded-2xl border bg-card p-4 shadow-xl sm:-right-7 sm:max-w-xs">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Sparkles className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-bold">Small Actions Matter</p>
                            <p className="text-xs text-muted-foreground">
                                Be the reason someone smiles.
                            </p>
                        </div>
                    </div>

                    {/* Decorative Shape */}
                    <div className="absolute -left-5 -top-5 -z-10 h-28 w-28 rounded-tl-[2rem] border-l-4 border-t-4 border-primary/30" />
                </div>

                {/* Right: About Content */}
                <div className="space-y-8 pt-5 lg:pt-0">
                    <div className="space-y-5">
                        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                            About ConnectHope
                        </span>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            Small Actions Can Create
                            <span className="block text-primary">
                                A Big Difference.
                            </span>
                        </h2>

                        <p className="leading-8 text-muted-foreground">
                            ConnectHope is a community-driven platform that
                            brings people together to support meaningful causes
                            and create positive social change.
                        </p>

                        <p className="leading-8 text-muted-foreground">
                            From environmental cleanups and tree plantations
                            to donation campaigns, everyone can participate,
                            contribute, and make a difference in their community.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-2xl border bg-card/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                                >
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="font-bold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Discover Events */}
                    <Link
                        href="/events"
                        className="group inline-flex items-center gap-2 font-semibold text-primary"
                    >
                        Discover Our Events
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
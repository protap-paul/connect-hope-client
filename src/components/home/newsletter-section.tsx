
"use client";

import { useState } from "react";
import { Mail, MailOpen, Send, HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        setLoading(true);

        try {
            // Newsletter API is not implemented yet.
            // Temporary frontend-only interaction.
            await new Promise((resolve) => setTimeout(resolve, 700));

            toast.success("Thanks for your interest in ConnectHope!");
            setEmail("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="relative isolate overflow-hidden rounded-2xl bg-primary px-6 py-14 text-primary-foreground shadow-xl sm:px-12 lg:px-20">

                    {/* Background Decoration */}
                    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

                        {/* Soft Glow */}
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-[90px]" />

                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />

                        {/* Email Graphics */}
                        <MailOpen className="absolute -right-10 top-1/2 h-80 w-80 -translate-y-1/2 rotate-12 text-white/10 blur-[2px] sm:right-10" />

                        <Mail className="absolute left-10 top-10 h-32 w-32 -rotate-12 text-white/10 blur-sm" />

                        {/* Soft Overlay */}
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                    </div>

                    {/* Content */}
                    <div className="relative mx-auto max-w-2xl text-center">

                        <div className="mb-5 flex justify-center">
                            <div className="rounded-full bg-white/15 p-4 backdrop-blur-sm">
                                <HeartHandshake className="h-8 w-8" />
                            </div>
                        </div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
                            Stay Connected
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Be Part of Something Meaningful
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl leading-7 text-primary-foreground/80">
                            Get updates about upcoming community events,
                            volunteer opportunities, and inspiring stories
                            of positive change.
                        </p>

                        {/* Newsletter Form */}
                        <form
                            onSubmit={handleSubscribe}
                            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    className="h-12 border-0 bg-white pl-12 text-gray-900 placeholder:text-gray-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="secondary"
                                size="lg"
                                disabled={loading}
                                className="h-12"
                            >
                                {loading ? "Subscribing..." : "Subscribe"}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        <p className="mt-4 text-xs text-primary-foreground/70">
                            Join our community and stay inspired. No spam.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;

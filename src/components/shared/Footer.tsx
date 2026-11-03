
"use client";

import { usePathname, useRouter } from "next/navigation";
import { HeartHandshake, Mail, Globe } from "lucide-react";

const Footer = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleInternalLink = (href: string) => {
        if (pathname === href) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }

        router.push(href);
    };

    return (
        <footer className="w-full shrink-0 border-t bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <button
                            onClick={() => handleInternalLink("/")}
                            className="flex items-center gap-2 text-left"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <HeartHandshake className="h-5 w-5" />
                            </div>

                            <span className="text-xl font-bold">
                                Connect<span className="text-primary">Hope</span>
                            </span>
                        </button>

                        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                            Connecting People, Creating Hope. Join hands with your
                            community and make a positive difference.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 font-semibold">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <button
                                    onClick={() => handleInternalLink("/")}
                                    className="hover:text-primary"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleInternalLink("/events")}
                                    className="hover:text-primary"
                                >
                                    Upcoming Events
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleInternalLink("/login")}
                                    className="hover:text-primary"
                                >
                                    Login
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleInternalLink("/register")}
                                    className="hover:text-primary"
                                >
                                    Get Started
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="mb-4 font-semibold">Community</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>Environmental Care</li>
                            <li>Social Support</li>
                            <li>Volunteer Together</li>
                            <li>Community Development</li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="mb-4 font-semibold">Connect With Us</h3>

                        <p className="mb-4 text-sm text-muted-foreground">
                            Together, we can create a better tomorrow.
                        </p>

                        <div className="flex items-center gap-3">
                            <a
                                href="mailto:connecthope@example.com"
                                aria-label="Email ConnectHope"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-accent"
                            >
                                <Mail className="h-4 w-4" />
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-accent"
                            >
                                <Globe className="h-4 w-4" />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-accent"
                            >
                                <Globe className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t pt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        © 2026 ConnectHope. All rights reserved.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Connecting People, Creating Hope.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

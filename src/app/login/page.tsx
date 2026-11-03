
"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartHandshake, Mail, Lock, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();

    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Email and Password Login
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setMessage("");

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                setMessage(error.message);
                setGoogleLoading(false);
            }
        } catch {
            setMessage("Google login failed. Please try again.");
            setGoogleLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 transition-colors duration-300">

            {/* Background Decoration */}
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative z-10 w-full max-w-md">

                {/* Logo */}
                <Link href="/" className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                        <HeartHandshake className="h-6 w-6" />
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        Connect<span className="text-green-400">Hope</span>
                    </span>
                </Link>

                {/* Login Card */}
                <div className="rounded-2xl border border-border bg-card p-7 text-card-foreground shadow-2xl sm:p-9">

                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to continue making a difference.
                    </p>

                    {/* Google Login */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={googleLoading || loading}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <svg
                            className="h-5 w-5 shrink-0"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.62 5.91c4.44-4.1 7.15-10.15 7.15-17.56z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.93 23.93 0 0 0 0 21.56l7.98-6.19z"
                            />
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.43-4.85 2.27-8.28 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                        </svg>

                        {googleLoading
                            ? "Connecting to Google..."
                            : "Continue with Google"}
                    </button>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Or continue with email
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>
                        </div>

                        {message && (
                            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || googleLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login to Account"}
                            {!loading && <ArrowRight className="h-4 w-4" />}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-7 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    © {currentYear ?? ""} ConnectHope. Together, we create change.
                </p>
            </div>
        </main>
    );
}

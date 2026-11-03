
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    HeartHandshake,
    UserRound,
    Mail,
    Lock,
    Image as ImageIcon,
    ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Password Validation
    const validatePassword = (value: string) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasMinimumLength = value.length >= 6;

        if (!hasUppercase) {
            return "Password must contain at least one uppercase letter.";
        }

        if (!hasLowercase) {
            return "Password must contain at least one lowercase letter.";
        }

        if (!hasMinimumLength) {
            return "Password must be at least 6 characters long.";
        }

        return null;
    };

    // Email and Password Registration
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordError = validatePassword(password);

        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        if (name.trim().length < 2) {
            toast.error("Name must contain at least 2 characters.");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
                image: image.trim() || undefined,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Account created successfully!");

            router.push("/");
            router.refresh();

        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Google Registration
    const handleGoogleRegister = async () => {
        setGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message);
                setGoogleLoading(false);
            }
        } catch {
            toast.error("Google registration failed. Please try again.");
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
                <Link href="/" className="mb-7 flex items-center justify-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                        <HeartHandshake className="h-6 w-6" />
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        Connect<span className="text-green-600 dark:text-green-400">Hope</span>
                    </span>
                </Link>

                {/* Register Card */}
                <div className="rounded-2xl border border-border bg-card p-7 text-card-foreground shadow-2xl sm:p-9">

                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Join ConnectHope
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your account and spread hope.
                        </p>
                    </div>

                    {/* Google Registration */}
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        disabled={googleLoading || loading}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <svg
                            className="h-5 w-5 shrink-0"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.62 5.91c4.44-4.1 7.15-10.15 7.15-17.56z" />
                            <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.93 23.93 0 0 0 0 21.56l7.98-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.43-4.85 2.27-8.28 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>

                        {googleLoading
                            ? "Connecting to Google..."
                            : "Continue with Google"}
                    </button>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />

                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Or register with email
                        </span>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                                Full Name
                            </label>

                            <div className="relative">
                                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    minLength={2}
                                    autoComplete="name"
                                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

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

                        {/* Profile Photo */}
                        <div>
                            <label htmlFor="image" className="mb-2 block text-sm font-semibold text-foreground">
                                Profile Photo URL <span className="font-normal text-muted-foreground">(Optional)</span>
                            </label>

                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    id="image"
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">
                                Password
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </div>

                            <p className="mt-2 text-xs text-muted-foreground">
                                Must contain uppercase, lowercase and at least 6 characters.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || googleLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                            {!loading && <ArrowRight className="h-4 w-4" />}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-green-700 hover:text-green-800 hover:underline dark:text-green-400"
                        >
                            Login
                        </Link>
                    </p>
                </div>

                {/* Copyright */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                    © ConnectHope. Together, we create change.
                </p>
            </div>
        </main>
    );
}

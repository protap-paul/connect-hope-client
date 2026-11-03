
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    HeartHandshake,
    CalendarPlus,
    CalendarCheck,
    ClipboardList,
    LogOut,
    UserRound,
    Menu,
    ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import { authClient } from "@/lib/auth-client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const pathname = usePathname();

    const handleHomeClick = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        if (pathname === "/") {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const user = session?.user;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-background/60 transition-all duration-300">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={handleHomeClick}
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <HeartHandshake className="h-5 w-5" />
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        Connect<span className="text-primary">Hope</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        href="/events"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Upcoming Events
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">

                    <ThemeToggle />

                    {/* Desktop Authentication */}
                    <div className="hidden md:block">
                        {isPending ? (
                            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
                        ) : user ? (
                            <div className="flex items-center gap-3">

                                {/* User Profile Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button
                                                variant="ghost"
                                                className="flex h-10 items-center gap-2 rounded-full px-2 hover:bg-muted"
                                            />
                                        }
                                    >
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage
                                                src={user.image || ""}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end" className="w-60">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>
                                                <p className="font-semibold">{user.name}</p>
                                                <p className="text-xs font-normal text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </DropdownMenuLabel>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem render={<Link href="/dashboard" />}>
                                            <UserRound className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </DropdownMenuItem>

                                        <DropdownMenuItem render={<Link href="/profile" />}>
                                            <UserRound className="mr-2 h-4 w-4" />
                                            My Profile
                                        </DropdownMenuItem>

                                        <DropdownMenuItem render={<Link href="/create-event" />}>
                                            <CalendarPlus className="mr-2 h-4 w-4" />
                                            Create Event
                                        </DropdownMenuItem>

                                        <DropdownMenuItem render={<Link href="/manage-events" />}>
                                            <ClipboardList className="mr-2 h-4 w-4" />
                                            Manage Events
                                        </DropdownMenuItem>

                                        <DropdownMenuItem render={<Link href="/joined-events" />}>
                                            <CalendarCheck className="mr-2 h-4 w-4" />
                                            Joined Events
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Separate Logout Button */}
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                    className="gap-2 border-destructive/30 text-destructive transition-colors hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    nativeButton={false}
                                    variant="ghost"
                                    render={<Link href="/login" />}
                                >
                                    Login
                                </Button>

                                <Button
                                    nativeButton={false}
                                    render={<Link href="/register" />}
                                >
                                    Get Started
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger
                                render={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        aria-label="Open navigation menu"
                                    />
                                }
                            >
                                <Menu className="h-5 w-5" />
                            </SheetTrigger>

                            <SheetContent side="right" className="w-70 sm:w-85">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <HeartHandshake className="h-5 w-5 text-primary" />
                                        ConnectHope
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="mt-8 flex flex-col gap-2">

                                    <SheetClose
                                        render={
                                            <button
                                                type="button"
                                                onClick={() => router.push("/events")}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
                                            >
                                                <CalendarCheck className="h-4 w-4" />
                                                Upcoming Events
                                            </button>
                                        }
                                    />

                                    <div className="my-3 border-t" />

                                    {isPending ? (
                                        <div className="h-10 animate-pulse rounded-md bg-muted" />
                                    ) : user ? (
                                        <>
                                            <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                                <Avatar>
                                                    <AvatarImage src={user.image || ""} />
                                                    <AvatarFallback>
                                                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold">
                                                        {user.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/dashboard")}
                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                                                    >
                                                        <UserRound className="h-4 w-4" />
                                                        Dashboard
                                                    </button>
                                                }
                                            />

                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/create-event")}
                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                                                    >
                                                        <CalendarPlus className="h-4 w-4" />
                                                        Create Event
                                                    </button>
                                                }
                                            />

                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/manage-events")}
                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                                                    >
                                                        <ClipboardList className="h-4 w-4" />
                                                        Manage Events
                                                    </button>
                                                }
                                            />

                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/joined-events")}
                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                                                    >
                                                        <CalendarCheck className="h-4 w-4" />
                                                        Joined Events
                                                    </button>
                                                }
                                            />

                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/profile")}
                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-muted"
                                                    >
                                                        <UserRound className="h-4 w-4" />
                                                        My Profile
                                                    </button>
                                                }
                                            />

                                            <div className="my-3 border-t" />

                                            <Button
                                                variant="ghost"
                                                className="justify-start text-destructive hover:text-destructive"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/login")}
                                                        className="w-full"
                                                    >
                                                        Login
                                                    </button>
                                                }
                                            />

                                            <SheetClose
                                                render={
                                                    <button
                                                        type="button"
                                                        onClick={() => router.push("/register")}
                                                        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
                                                    >
                                                        Get Started
                                                    </button>
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
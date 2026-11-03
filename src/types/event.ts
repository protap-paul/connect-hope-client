export type EventType =
    | "Cleanup"
    | "Plantation"
    | "Donation"
    | "Blood Donation"
    | "Food Distribution"
    | "Winter Clothes Distribution"
    | "Educational Support"
    | "Community Support"
    | "Other";

export interface Organizer {
    name: string;
    email: string;
    image: string;
}

export interface Event {
    _id: string;
    title: string;
    description: string;
    eventType: EventType;
    thumbnail: string;
    location: string;
    eventDate: string;
    volunteerCount?: number;
    organizer?: Organizer;
    joinedAt?: string;
}

export interface EventsResponse {
    success: boolean;
    message: string;
    data: Event[];
}

export const eventTypes: EventType[] = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Blood Donation",
    "Food Distribution",
    "Winter Clothes Distribution",
    "Educational Support",
    "Community Support",
    "Other",
];
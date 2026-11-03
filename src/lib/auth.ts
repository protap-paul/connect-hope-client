
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

// Environment variables
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl = process.env.BETTER_AUTH_URL;

// Check environment variables
if (!mongoUri || !dbName || !authSecret || !authUrl) {
    throw new Error("Missing Better Auth environment variables");
}

// MongoDB connection
const client = new MongoClient(mongoUri);
const db = client.db(dbName);

// Better Auth configuration
export const auth = betterAuth({
    baseURL: authUrl,
    secret: authSecret,

    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 128,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },

    plugins: [
        jwt({
            jwt: {
                definePayload: ({ user }) => ({
                    id: user.id,
                    email: user.email,
                }),
            },
        }),
    ],
});

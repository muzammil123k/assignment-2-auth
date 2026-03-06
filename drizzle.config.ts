import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// This line forces Drizzle to read your .env file
dotenv.config();

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL as string
	},
	verbose: true,
	strict: true
});
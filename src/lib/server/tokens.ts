import { db } from './db';
import { verificationTokens } from './db/schema';
import { eq } from 'drizzle-orm';

export async function generateVerificationToken(email: string) {
    // 1. Generate a secure, random token
    const token = crypto.randomUUID();
    
    // 2. Set expiration to 1 hour from now
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // 3. Check if a token already exists for this email and delete it
    const existingToken = await db.query.verificationTokens.findFirst({
        where: eq(verificationTokens.identifier, email)
    });

    if (existingToken) {
        await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
    }

    // 4. Insert the new token into your database
    const [newToken] = await db.insert(verificationTokens).values({
        identifier: email,
        token,
        expires
    }).returning();

    return newToken;
}
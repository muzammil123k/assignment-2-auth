import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import { GOOGLE_GENERATIVE_AI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const google = createGoogleGenerativeAI({
	apiKey: GOOGLE_GENERATIVE_AI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	const result = streamText({
		model: google('gemini-2.5-flash'),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
};
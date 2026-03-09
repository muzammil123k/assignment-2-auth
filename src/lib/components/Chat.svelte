<script lang="ts">
	import { browser } from '$app/environment';
	import { Chat } from '@ai-sdk/svelte';

	let input = $state('');
	let chat: Chat | undefined = $state(undefined);

	if (browser) {
		chat = new Chat({ api: '/api/chat' });
	}

	function getTextContent(message: { parts: Array<{ type: string; text?: string }> }): string {
		return message.parts
			.filter((p) => p.type === 'text')
			.map((p) => p.text ?? '')
			.join('');
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const text = input.trim();
		if (!text || !chat) return;
		input = '';
		await chat.sendMessage({ text });
	}
</script>

{#if chat}
	<div class="flex h-[500px] flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
		<div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
			{#if chat.messages.length === 0}
				<div class="flex h-full items-center justify-center text-sm text-gray-500">
					Send a message to start chatting with Gemini!
				</div>
			{/if}

			{#each chat.messages as message}
				<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div class="max-w-[85%] rounded-2xl px-4 py-2.5 {message.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none shadow-sm'}">
						<p class="text-sm whitespace-pre-wrap">{getTextContent(message)}</p>
					</div>
				</div>
			{/each}

			{#if chat.status === 'submitted' || chat.status === 'streaming'}
				<div class="flex justify-start">
					<div class="rounded-2xl rounded-tl-none bg-white border border-gray-200 px-4 py-2.5 shadow-sm text-gray-500">
						<p class="text-sm animate-pulse flex items-center gap-1">
							<span class="h-2 w-2 bg-gray-400 rounded-full"></span>
							<span class="h-2 w-2 bg-gray-400 rounded-full delay-75"></span>
							<span class="h-2 w-2 bg-gray-400 rounded-full delay-150"></span>
						</p>
					</div>
				</div>
			{/if}

			{#if chat.error}
				<div class="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200 text-center">
					Failed to fetch response. Please check your API key and terminal logs.
				</div>
			{/if}
		</div>

		<div class="border-t border-gray-200 bg-white p-4">
			<form onsubmit={handleSubmit} class="flex gap-3">
				<input
					bind:value={input}
					disabled={chat.status === 'submitted' || chat.status === 'streaming'}
					placeholder="Ask Gemini something..."
					class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:bg-gray-50"
				/>
				<button
					type="submit"
					disabled={chat.status === 'submitted' || chat.status === 'streaming' || !input.trim()}
					class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-sm"
				>
					Send
				</button>
			</form>
		</div>
	</div>
{:else}
	<div class="flex h-[500px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
		Loading chat...
	</div>
{/if}
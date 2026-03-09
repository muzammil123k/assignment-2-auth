<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	export let data: PageData;
	// Make the user data easily accessible
	$: user = data.session?.user;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
		
		<div class="mb-6 flex items-center justify-between border-b pb-4">
			<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
			
			<div class="flex items-center gap-3">
				{#if user?.role === 'admin'}
					<a 
						href="/admin" 
						class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-sm"
					>
						Admin Panel
					</a>
				{/if}

				<button
					on:click={() => signOut({ callbackUrl: '/login' })}
					class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 shadow-sm"
				>
					Sign Out
				</button>
			</div>
		</div>

		<div class="space-y-6">
			
			<div>
				<h2 class="text-lg font-medium text-gray-900">Profile Information</h2>
				<p class="text-sm text-gray-500">Manage your account details and view your role.</p>
			</div>

			<div class="flex items-center space-x-5 rounded-lg border border-gray-200 p-4">
				{#if user?.image}
					<img src={user.image} alt="Profile" class="h-16 w-16 rounded-full shadow-sm" />
				{:else}
					<div class="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-sm">
						{user?.name?.charAt(0).toUpperCase() || 'U'}
					</div>
				{/if}
				
				<div>
					<h3 class="text-xl font-semibold text-gray-900">{user?.name || 'User'}</h3>
					<p class="text-gray-600">{user?.email}</p>
					<span class="mt-2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
						Role: <strong class="ml-1 capitalize">{user?.role || 'user'}</strong>
					</span>
				</div>
			</div>

			<div class="mt-8 rounded-lg bg-gray-50 p-6 border border-gray-200 shadow-sm">
				<h3 class="text-lg font-medium text-gray-900 mb-4">AI Assistant Interface</h3>
				<Chat />
			</div>

		</div>
	</div>
</div>
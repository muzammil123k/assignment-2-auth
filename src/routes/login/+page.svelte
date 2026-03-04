<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';

	let email = '';
	let password = '';
	let errorMessage = '';
	let isLoading = false;

	async function handleEmailLogin(event: Event) {
		event.preventDefault();
		isLoading = true;
		errorMessage = '';

		// Call Auth.js credentials provider
		const response = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl: '/dashboard'
		});

		if (response?.error) {
			errorMessage = 'Invalid email or password. Please try again.';
			isLoading = false;
		} else if (response?.url) {
			window.location.href = response.url;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Sign in to your account
			</h2>
		</div>

		{#if errorMessage}
			<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
				{errorMessage}
			</div>
		{/if}

		<form class="mt-8 space-y-6" on:submit={handleEmailLogin}>
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input id="email" bind:value={email} type="email" required
						class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
						placeholder="Email address" />
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input id="password" bind:value={password} type="password" required
						class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
						placeholder="Password" />
				</div>
			</div>

			<div>
				<button type="submit" disabled={isLoading}
					class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400">
					{isLoading ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>

		<div class="mt-6">
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-gray-50 px-2 text-gray-500">Or continue with</span>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-2 gap-3">
				<button on:click={() => signIn('google', { callbackUrl: '/dashboard' })}
					class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
					Google
				</button>

				<button on:click={() => signIn('github', { callbackUrl: '/dashboard' })}
					class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#24292F]/90 focus-visible:ring-transparent">
					GitHub
				</button>
			</div>
		</div>

		<div class="text-center text-sm mt-4">
			<p class="text-gray-600">Don't have an account? <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register here</a></p>
		</div>
	</div>
</div>
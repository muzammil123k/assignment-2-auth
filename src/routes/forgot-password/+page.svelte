<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Forgot your password?
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Enter your email and we'll send you a link to reset your password.
			</p>
		</div>

		{#if form?.success}
			<div class="rounded-md bg-green-50 p-4 text-sm text-green-700">
				If an account with that email exists, we've sent a password reset link. Please check your inbox.
			</div>
			<div class="text-center text-sm mt-4">
				<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Back to Sign in</a>
			</div>
		{:else}
			{#if form?.error}
				<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
					{form.error}
				</div>
			{/if}

			<form class="mt-8 space-y-6" method="POST">
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
						placeholder="Email address"
					/>
				</div>

				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Send Reset Link
					</button>
				</div>
			</form>

			<div class="text-center text-sm mt-4">
				<p class="text-gray-600">
					Remember your password?
					<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a>
				</p>
			</div>
		{/if}
	</div>
</div>

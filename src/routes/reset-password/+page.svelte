<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Set a new password
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Enter your new password below.
			</p>
		</div>

		{#if form?.error}
			<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<form class="mt-8 space-y-6" method="POST">
			<input type="hidden" name="token" value={data.token} />

			<div>
				<label for="password" class="sr-only">New password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					minlength="6"
					class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
					placeholder="New password"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Reset Password
				</button>
			</div>
		</form>

		<div class="text-center text-sm mt-4">
			<p class="text-gray-600">
				Remember your password?
				<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a>
			</p>
		</div>
	</div>
</div>

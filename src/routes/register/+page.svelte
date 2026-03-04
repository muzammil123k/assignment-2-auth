<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Create your account
			</h2>
		</div>

		{#if form?.error}
			<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">
				{form.error}
			</div>
		{/if}

		<form class="mt-8 space-y-6" method="POST">
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="name" class="sr-only">Full Name</label>
					<input id="name" name="name" type="text" required
						class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
						placeholder="Full Name" />
				</div>
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input id="email" name="email" type="email" required
						class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
						placeholder="Email address" />
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input id="password" name="password" type="password" required
						class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
						placeholder="Password" />
				</div>
			</div>

			<div>
				<button type="submit"
					class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Register
				</button>
			</div>
            <div class="text-center text-sm">
                <p class="text-gray-600">Already have an account? <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a></p>
            </div>
		</form>
	</div>
</div>
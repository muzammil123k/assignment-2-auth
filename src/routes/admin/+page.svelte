<script lang="ts">
	import type { PageData, ActionData } from './$types';
	
	export let data: PageData;
	export let form: ActionData;
	
	$: currentUser = data.session?.user;
	$: stats = data.stats;
	$: allUsers = data.users;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
			<a href="/dashboard" class="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
				Back to Dashboard
			</a>
		</div>

		{#if form?.error}
			<div class="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
				{form.error}
			</div>
		{/if}

		<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
			<div class="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
				<p class="text-sm font-medium text-gray-500">Total Users</p>
				<p class="mt-2 text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
			</div>
			<div class="rounded-lg bg-indigo-50 p-6 shadow-sm border border-indigo-100">
				<p class="text-sm font-medium text-indigo-600">Admins</p>
				<p class="mt-2 text-3xl font-bold text-indigo-900">{stats.adminCount}</p>
			</div>
			<div class="rounded-lg bg-green-50 p-6 shadow-sm border border-green-100">
				<p class="text-sm font-medium text-green-600">Active Users</p>
				<p class="mt-2 text-3xl font-bold text-green-900">{stats.regularCount}</p>
			</div>
			<div class="rounded-lg bg-red-50 p-6 shadow-sm border border-red-100">
				<p class="text-sm font-medium text-red-600">Suspended</p>
				<p class="mt-2 text-3xl font-bold text-red-900">{stats.suspendedCount}</p>
			</div>
		</div>

		<div class="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200">
			<div class="border-b border-gray-200 px-6 py-4">
				<h2 class="text-lg font-medium text-gray-900">Registered Users</h2>
			</div>
			<ul class="divide-y divide-gray-200">
				{#each allUsers as user}
					<li class="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
						<div class="flex items-center gap-4">
							{#if user.image}
								<img src={user.image} alt="Profile" class="h-10 w-10 rounded-full bg-gray-100 object-cover" />
							{:else}
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold uppercase">
									{user.email?.charAt(0) || '?'}
								</div>
							{/if}
							
							<div>
								<p class="text-sm font-medium text-gray-900">{user.name || 'Unnamed User'}</p>
								<p class="text-xs text-gray-500">{user.email}</p>
							</div>
						</div>

						<div class="flex items-center gap-4">
							<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
								{user.role === 'admin' ? 'bg-indigo-50 text-indigo-700 ring-indigo-600/20' : ''}
								{user.role === 'user' ? 'bg-green-50 text-green-700 ring-green-600/20' : ''}
								{user.role === 'suspended' ? 'bg-red-50 text-red-700 ring-red-600/10' : ''}">
								{user.role}
							</span>

							{#if user.id !== currentUser?.id}
								<form method="POST" action="?/updateRole" class="flex items-center gap-2">
									<input type="hidden" name="userId" value={user.id} />
									<select name="role" class="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
										<option value="user" selected={user.role === 'user'}>User</option>
										<option value="admin" selected={user.role === 'admin'}>Admin</option>
										<option value="suspended" selected={user.role === 'suspended'}>Suspend</option>
									</select>
									<button type="submit" class="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-700">
										Update
									</button>
								</form>
							{:else}
								<span class="text-xs text-gray-400 italic w-[180px] text-right">Current Session</span>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
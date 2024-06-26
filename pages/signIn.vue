<script setup lang="ts">
	const authStore = useAuthStore()
	const router = useRouter()
	onBeforeMount(() => {
		if(authStore.isAuthenticated == true) {
			router.push('/profileUser')
		}
	})
</script>
<template>
	<div>
		<sign_in />		
	</div>
</template>
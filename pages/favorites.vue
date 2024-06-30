<script setup lang="ts">
	const cartStore = useCartStore()
	const authStore = useAuthStore()
	const items = ref<any>([])
	const isFav = ref<boolean>(true)
	const isLoading = ref<boolean>(true)
	const favoriteStore = useFavoritesStore()
	async function favorites() {
		try {
			const data = await $fetch<any>('http://localhost:3001/api/favorites-user', {
				method: 'POST',
				body: {
					id: useCookie('id').value,
				},
			})

			items.value = data[0].Favorite

			if (items.value) {
				items.value.forEach((el: any) => {
					el.isFavorite = true
				})
			}

			if (cartStore.items) {
				cartStore.items.forEach((el: any) => {
					items.value.forEach((item: any) => {
						if (el.id === item.id) {
							item.isAdded = true
						}
					})
				})
			}

			if (items.value.length === 0) {
				isFav.value = false
			}
		} catch (error) {
			console.log(error)
		} finally {
			isLoading.value = false
		}
	}
	onBeforeMount(() => {
		cartStore.cartDataGet()
		favorites()
		favoriteStore.favorites()
	})
</script>
<template>
	<div>
		<div class="min-h-[600px]">
			<div class="flex md:ml-[50px] sm:ml-[20px] mt-5 gap-[15px]">
				<div class="flex gap-5 items-center">
					<buttonBack />
					<h2 class="text-2xl font-extralight dark:text-ghostWhiteText">Избранное</h2>
				</div>
			</div>

			<div
				v-if="isLoading"
				class="mt-[30px]"
			>
				<badassLoader />
			</div>

			<div v-else>
				<div
					v-if="authStore.isAuthenticated && isFav && favoriteStore.items.length > 0"
					class="mt-[30px]"
					v-auto-animate
				>
					<FavList :items="items" />
				</div>

				<div
					v-else-if="authStore.isAuthenticated && favoriteStore.items.length === 0"
					class="flex flex-col justify-center items-center h-[500px]"
				>
					<div class="md:w-[500px] sm:w-auto text-center">
						<h1 class="md:text-2xl sm:text-xl dark:text-ghostWhiteText">
							К сожалению у вас нет добавленных
							<span class="text-2xl text-[#7747ff] dark:text-green-600">избранных</span> товаров
						</h1>
					</div>
					<p class="text-[70px]">👿</p>
				</div>

				<div
					v-else-if="!authStore.isAuthenticated"
					class="flex flex-col justify-center items-center h-[500px] md:p-0 sm:p-2"
				>
					<div class="md:w-[500px] sm:w-auto text-center">
						<h1 class="md:text-2xl sm:text-xl dark:text-ghostWhiteText">
							Зарегистрируйтесь или войдите в
							<span class="text-2xl text-[#7747ff]">аккаунт</span> для просмотра и добавления
							избранных товаров
						</h1>
					</div>
					<div class="md:text-[70px] sm:text-[50px] mt-5">😕</div>
				</div>
			</div>
		</div>
	</div>
</template>

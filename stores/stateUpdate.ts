import { defineStore } from 'pinia'

export const useStateStore = defineStore({
	id: 'state',
	state: () => ({
		itemsToUpdate: [] as any,
	}),
	actions: {
		async updateCardsCart(params: { sortBy: any; title?: any }) {
			try {
				const cartItems = useCartStore()
				const response = await $fetch('https://sneaker-server-three.vercel.app/api', {
					method: 'GET',
					params: params,
				})
				const allStore = useAllStore()
				const favoritesStore = useFavoritesStore()
				allStore.items = response
				if (cartItems.items !== undefined) {
					cartItems.items.forEach((el: any) => {
						allStore.items.forEach((item: any) => {
							if (el.id === item.id) {
								item.isAdded = true
							}
						})
					})
					favoritesStore.items.forEach((el: any) => {
						allStore.items.forEach((item: any) => {
							if (el.id == item.id) {
								item.isFavorite = true
							}
						})
					})
				}
			} catch (error) {
				console.error(error)
			}
		},
	},
})

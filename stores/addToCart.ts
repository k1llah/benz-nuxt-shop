import { defineStore } from 'pinia'
interface CartItem {
	id: number
	title: string
	imageUrl: string
	price: number
	count: number
	isAdded: boolean
	onDelete: Function
}
export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		items: [] as CartItem[],
		isAdded: false,
		cartCounter: null as number | null,
		localCounter: parseInt(useCookie('cartCounter').value || '0', 10),
		counter: 1,
		totalPrice: 0,
		localPrice: parseInt(useCookie('totalPrice').value || '0', 10),
		itemsOnMain: [] as any,
		// axiosGetParamsStore: function () {},
		// stateUpdates: useStateStore(),
		filters: {
			sortBy: 'title',
			title: '',
		},
	}),
	actions: {
		setFilters(filters: any) {
			this.filters = filters
		},
		counterPlus() {
			this.counter += 1
		},
		counterRemove() {
			if (this.counter > 1) {
				this.counter -= 1
			}
		},

		async onCartAdd(sneakerId: number, item: any, price: any) {
			try {
				const postAddData = await $fetch<any>('http://localhost:3001/api/add-to-cart', {
					method: 'POST',
					body: {
						userId: useCookie('id').value,
						sneakerId: sneakerId,
					},
				})
				this.items = postAddData.items
				item.isAdded = true
				this.totalPrice += price
				const stateUpdates = useStateStore()
				const allStore = useAllStore()
				stateUpdates.updateCardsCart(this.filters)
				useCookie('totalPrice').value = this.totalPrice.toString()
				this.cartCounter = this.items.length
				useCookie('cartCounter').value = this.cartCounter.toString()
			} catch (error) {
				console.log(error)
			}
		},
		async onDeleteItem(id: number, item: any, price: any) {
			if (item.isAdded) {
				try {
					const removeData = await $fetch('http://localhost:3001/api/remove-from-cart', {
						method: 'POST',
						body: {
							userId: useCookie('id').value,
							sneakerId: id,
						},
					})
					if (this.cartCounter !== null && this.cartCounter > 0) {
						this.cartCounter -= 1
						useCookie('cartCounter').value = this.cartCounter.toString()
					}

					if (this.totalPrice > 0) {
						this.totalPrice -= price
						useCookie('totalPrice').value = this.totalPrice.toString()
					}
					if (this.totalPrice < 0) {
						this.totalPrice = 0
					}
					this.items = this.items.filter((feedback) => feedback.id !== id)
					item.isAdded = false
					const stateUpdates = useStateStore()
					const allStore = useAllStore()
					stateUpdates.updateCardsCart(this.filters)
				} catch (error) {
					console.log(error)
				}
			}
		},

		async cartDataGet() {
			try {
				if (useCookie('id').value !== '') {
					const dataCart = await $fetch<any>('http://localhost:3001/api/get-cart-items', {
						method: 'POST',
						body: {
							userId: useCookie('id').value,
						},
					})
					this.items = dataCart.items
					if (this.items !== undefined) {
						this.isAdded = this.items.length > 0
					}

					if (this.isAdded) {
						this.items.forEach((el: any) => {
							el.isAdded = true
						})
					}
					this.totalPrice = parseInt(useCookie('totalPrice').value || '0', 10)
					if (this.items !== undefined) this.cartCounter = this.items.length
					if (this.cartCounter !== null)
						useCookie('cartCounter').value = this.cartCounter.toString()
				}
			} catch (error) {
				console.log(error)
			}
		},
	},
})

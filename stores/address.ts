import { defineStore } from 'pinia'
export const useAddressStore = defineStore({
	id: 'address',
	state: () => ({
		addressData: [] as any[],
		isAddress: false,
	}),
	actions: {
		async dataAddress() {
			try {
				const data = await $fetch<any>(
					'https://sneaker-server-three.vercel.app/api/get-addresses',
					{
						method: 'POST',
						body: {
							userId: useCookie('id').value,
						},
					},
				)
				this.addressData = data
				this.isAddress = this.addressData.length > 0
			} catch (error) {
				console.log(error)
			}
		},
		async deleteAddress(id: number) {
			try {
				const data = await $fetch<any>(
					'https://sneaker-server-three.vercel.app/api/delete-address',
					{
						method: 'POST',
						body: {
							id: id,
							userId: useCookie('id').value,
						},
					},
				)
				this.addressData = this.addressData.filter((address) => address.id !== id)
			} catch (error) {
				console.log(error)
			}
		},
	},
})

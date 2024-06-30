import { defineStore } from 'pinia'
export const useAllStore = defineStore({
	id: 'all',
	state: () => ({
		idShoe: ref<Number>(),
		brandImages: {
			Vans: 'https://static.street-beat.ru/upload/iblock/d0c/d0cce4e2fba49304d25a39de2a9ef5d6.svg',
			TheNorthFace:
				'https://static.street-beat.ru/upload/iblock/4f7/4f773befa3ff5485a4e6c2d98c9ef00d.svg',
			Nike: 'https://static.street-beat.ru/upload/iblock/be7/be79be54f63add76b08e75dc6eedbfa7.svg',
			Puma: 'https://static.street-beat.ru/upload/iblock/3b4/3b4fe7d256fd066693ce400192ab81cc.svg',
			Converse:
				'https://static.street-beat.ru/upload/iblock/ea2/ea28052b0d88d010a96b1bc1bc27f3e0.svg',
			Reebok:
				'https://static.street-beat.ru/upload/iblock/8b0/8b0db0a7d3c2bffa7e7df0c8843aa7f0.svg',
			Adidas:
				'https://static.street-beat.ru/upload/iblock/d24/d24e44f9f5ce894b5cfb1289271318c9.svg',
			Jordan:
				'https://static.street-beat.ru/upload/iblock/0d9/0d9a80d8726234ca418ef6cde0c523d1.svg',
			HellyHansen:
				'https://static.street-beat.ru/upload/iblock/809/809d5927ce5cca568d98a0b053bf4f79.svg',
			Timberland:
				'https://static.street-beat.ru/upload/iblock/3f7/3f7fe697e8a65cdae39c543150e251d8.svg',
			Columbia:
				'https://static.street-beat.ru/upload/iblock/189/189b04d3c24a105f24003e9f13ee53db.svg',
			NewBalance:
				'https://static.street-beat.ru/upload/iblock/a3c/a3cfae237440a133b540ad67792b67eb.svg',
			DrMartens:
				'https://static.street-beat.ru/upload/iblock/b23/b233da50b4b147d98a6dec186f18dda0.svg',
			Asics: 'https://static.street-beat.ru/upload/iblock/a47/a473eb406a0b7e775e27cfbf0ea84865.svg',
		} as any,
		isOpened: ref(false),
		targetPage: '',
		headerText: 'Мои адреса для доставки',
		idAddress: 0 as number,
		isOpenedFeedBack: false,
		addressData: [] as any[],
		items: [] as any,
	}),
	actions: {
		block() {
			document.body.style.overflow = 'hidden'
		},
		unlock() {
			document.body.style.overflow = 'visible'
		},

		getBrandImageUrl(brandName: string): string {
			// Проверяем, есть ли ключ с указанным названием бренда
			if (this.brandImages.hasOwnProperty(brandName)) {
				return this.brandImages[brandName]
			} else {
				return ''
			}
		},

		async getItemsMethod(params: { sortBy: any; title?: any }) {
			try {
				const response = await $fetch('https://sneaker-server-three.vercel.app/api', {
					method: 'GET',
					params: params,
				})
				this.items = response
			} catch (error) {
				console.error(error)
			}
		},
	},
})

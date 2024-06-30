export const useProfileDataStore = defineStore({
	id: 'profile',
	state: () => ({
		email: '',
		first_name: '',
		lastName: '',
		profileImg: '',
	}),
	actions: {
		async getData() {
			const authStore = useAuthStore()
			const uuid = useCookie('uuid').value
			const id = useCookie('id').value
			if (id && uuid) {
				try {
					const data = await $fetch<any>('https://sneaker-server-three.vercel.app/api/get-data', {
						method: 'POST',
						body: {
							uuid,
							id,
						},
					})
					this.email = data.user.email
					this.first_name = data.user.first_name
					this.lastName = data.user.last_name
					this.profileImg = data.user.profileImg
					console.log(data)
				} catch (error) {
					authStore.isAuthenticated = false
				} finally {
					console.log(this.email)
				}
			} else {
				authStore.isAuthenticated = false
			}
		},
	},
})

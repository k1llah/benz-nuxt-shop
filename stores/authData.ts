import { defineStore } from 'pinia'
export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		id: '',
		uuid: '',
		role: '',
		idLocal: useCookie('id').value,
		uuidLocal: useCookie('uuid').value,
		roleLocal: useCookie('role').value,
		isAuthenticated: false,
		currentUser: { id: '', uuid: '' },
		isLoading: true,
	}),
	actions: {
		async getRole() {
			try {
				if (this.isAuthenticated) {
					const data = await $fetch<any>('http://localhost:3001/api/get-data', {
						method: 'POST',
						body: {
							uuid: useCookie('uuid').value,
							id: useCookie('id').value,
						},
					})
					this.role = data.user.role
					if (this.role !== '') useCookie('role').value = this.role
				}
			} catch (error) {
				console.log(error)
			}
		},
		async checkAuth() {
			if (this.idLocal && this.uuidLocal && this.roleLocal) {
				this.isAuthenticated = true
				this.currentUser = { id: this.idLocal, uuid: this.uuidLocal }
				this.getRole()
				this.isLoading = false
			} else {
				this.isAuthenticated = false
				this.isLoading = false
				this.currentUser = this.currentUser = { id: '', uuid: '' }
				useCookie('totalPrice').value = '0'
			}
		},
		logOut() {
			const cartStore = useCartStore()
			cartStore.localCounter = 0
			useCookie('id').value = ''
			useCookie('uuid').value = ''
			useCookie('role').value = ''
			useCookie('cartCounter').value = '0'
			useCookie('totalPrice').value = '0'
			this.isAuthenticated = false
			this.currentUser = this.currentUser = { id: '', uuid: '' }
			this.role = ''
			const router = useRouter()
			router.push('/signIn')
		},
	},
})

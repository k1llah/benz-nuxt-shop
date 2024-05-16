import { defineStore } from "pinia"
export const useIsAdmin = defineStore({
  id: "isAdmin",
  state: () => ({
  role: '',
  }),
  actions: {
		async checkIsAdmin() {
			try {
						const data = await useFetch<any>("http://localhost:3001/api/get-data", {
							method: "POST",
							body: {
								uuid: useCookie('uuid'),
								id: useCookie('id'),
							}
						});
						this.role = data.data.value.user.role
						
					}catch(error){
						console.log(error)
					}
						if (this.role === "ADMIN") {
							console.log(this.role)
						}
						else{
							let setRole = useCookie('role')
							setRole.value = 'USER'
							location.assign('/')
							alert('Еще че придумал? сегодня не твой день салага')
						}
		}
  },
});

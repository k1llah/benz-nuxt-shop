import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

export const useIsAdmin = defineStore({
  id: "isAdmin",
  state: () => ({
  role: '',
  }),
  actions: {
		async checkIsAdmin() {
			try {
						const data = await axios.post("http://localhost:3001/api/get-data", {
							uuid: localStorage.getItem("uuid"),
							id: localStorage.getItem("id"),
						});
						this.role = data.data.user.role
						localStorage.setItem("role", this.role)
					}catch(error){
						console.log(error)
					}
						if (this.role === "ADMIN") {
							console.log(this.role)
						}
						else{
							localStorage.setItem('role', 'USER')
							location.assign('/')
							alert('Еще че придумал? сегодня не твой день салага')
						}
		}
  },
});

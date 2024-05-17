import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    id: "",
    uuid: "",
    role: "",
    isAuthenticated: false,
    currentUser: { id: "", uuid: "" },
  }),
  actions: {
    async getRole() {
      try {
        const data = await $fetch<any>("http://localhost:3001/api/get-data", {
          method: "POST",
          body:{
            uuid: useCookie('uuid').value,
            id: useCookie('id').value,
          }
        });
        this.role = data.user.role;
        if(this.role !== '') useCookie('role').value = this.role
        
      } catch (error) {
        console.log(error);
      }
    },
    async checkAuth() {
      const idLocal = useCookie('id').value
      const uuidLocal = useCookie('uuid').value
      const roleLocal = useCookie('role').value
      this.isAuthenticated = true;
      
      if (idLocal && uuidLocal && roleLocal) {
        this.isAuthenticated = true;
        this.currentUser = { id: idLocal, uuid: uuidLocal };
        this.getRole();
      } else {
        this.isAuthenticated = false;
        this.currentUser = this.currentUser = { id: "", uuid: "" };
        useCookie('totalPrice').value = '0'
      }
    },
    logOut() {
      useCookie("id").value = "";
      useCookie("uuid").value = "";
      useCookie("role").value = "";
      useCookie('cartCounter').value = '0'
      useCookie('totalPrice').value = '0'
      this.isAuthenticated = false;
      this.currentUser = this.currentUser = { id: "", uuid: "" };
      this.role = "";
    },
  },
});

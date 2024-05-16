import { defineStore } from "pinia";
export const useAddressStore = defineStore({
  id: "address",
  state: () => ({
    addressData: [] as any[],
    isAddress: false,
  }),
  actions: {
    async dataAddress() {
      try {
        const data = await useFetch<any>(
          "http://localhost:3001/api/get-addresses",
          {
            method: "POST",
            body:{
              userId: useCookie('id'),
            }
          }
        );

        this.addressData = data.data.value;
        this.isAddress = this.addressData.length > 0;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAddress(id: number) {
      try {
        const data = await useFetch<any>(
          "http://localhost:3001/api/delete-address",
          {
            method: "POST",
            body:{
              id: id,
              userId: useCookie('id'),
            }
          }
        );
        this.addressData = this.addressData.filter(
          address => address.id !== id
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});

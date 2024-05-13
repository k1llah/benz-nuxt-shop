import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAddressStore = defineStore({
  id: "address",
  state: () => ({
    addressData: [] as any[],
    isAddress: false,
  }),
  actions: {
    async dataAddress() {
      try {
        const data = await axios.post(
          "http://localhost:3001/api/get-addresses",
          {
            userId: localStorage.getItem("id"),
          }
        );

        this.addressData = data.data;
        this.isAddress = this.addressData.length > 0;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAddress(id: number) {
      try {
        const data = await axios.post(
          "http://localhost:3001/api/delete-address",
          {
            id: id,
            userId: localStorage.getItem("id"),
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

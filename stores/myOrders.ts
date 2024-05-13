import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useMyOrderStore = defineStore({
  id: "myOrders",
  state: () => ({
    orders: [] as any[],
    itemData: [] as any[],
    active: false,
    history: false,
  }),
  actions: {
    async getDataOrder() {
      try {
        const resOrders = await axios.post(
          "http://localhost:3001/api/get-orders",
          {
            userId: localStorage.getItem("id"),
          }
        );
        this.orders = resOrders.data;
        for (const order of this.orders) {
          const resItems = await axios.post(
            "http://localhost:3001/api/sneakers-to-order",
            {
              id: order.sneakerDataId,
            }
          );
          order.items = resItems.data;
        }
        if (
          resOrders.data.status !== "CANCELED" ||
          resOrders.data.status !== "RECEIVED"
        ) {
          this.active = true;
        }
        if (
          resOrders.data.status == "RECEIVED" ||
          resOrders.data.status == "CANCELED"
        ) {
          this.history = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

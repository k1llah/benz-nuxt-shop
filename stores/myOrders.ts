import { defineStore } from "pinia";
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
        const resOrders = await $fetch<any>(
          "http://localhost:3001/api/get-orders",
          {
            method: "POST",
            body: {
              userId: useCookie("id").value,
            }
          }
        );
        this.orders = resOrders;
        for (const order of this.orders) {
          const resItems = await $fetch<any>(
            "http://localhost:3001/api/sneakers-to-order",
            {
              method: "POST",
              body:{
                id: order.sneakerDataId,
              }
            }
          );
          order.items = resItems;
        }
        if (
          resOrders.status !== "CANCELED" ||
          resOrders.status !== "RECEIVED"
        ) {
          this.active = true;
        }
        if (
          resOrders.status == "RECEIVED" ||
          resOrders.status == "CANCELED"
        ) {
          this.history = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

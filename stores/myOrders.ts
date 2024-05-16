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
        const resOrders = await useFetch<any>(
          "http://localhost:3001/api/get-orders",
          {
            method: "POST",
            body: {
              userId: useCookie("id"),
            }
          }
        );
        this.orders = resOrders.data.value;
        for (const order of this.orders) {
          const resItems = await useFetch(
            "http://localhost:3001/api/sneakers-to-order",
            {
              method: "POST",
              body:{
                id: order.sneakerDataId,
              }
            }
          );
          order.items = resItems.data;
        }
        if (
          resOrders.data.value.status !== "CANCELED" ||
          resOrders.data.value.status !== "RECEIVED"
        ) {
          this.active = true;
        }
        if (
          resOrders.data.value.status == "RECEIVED" ||
          resOrders.data.value.status == "CANCELED"
        ) {
          this.history = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

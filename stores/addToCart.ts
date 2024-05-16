import { defineStore } from "pinia";
interface CartItem {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  count: number;
  isAdded: boolean;
  onDelete: Function;
}
export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    items: [] as CartItem[],
    isAdded: false,
    cartCounter: 0,
    localCounter: parseInt(useCookie('cartCounter').value || "0", 10),
    counter: 1,
    totalPrice: 0,
    localPrice: parseInt(useCookie('totalPrice').value || "0", 10),
    axiosGetParamsStore: function () {},
    favorites: function () {},
  }),
  actions: {
    counterPlus() {
      this.counter += 1;
    },
    counterRemove() {
      if (this.counter > 1) {
        this.counter -= 1;
      }
    },

    async onCartAdd(sneakerId: number, item: any, price: any) {
      try {
        const postAddData = await useFetch<any>(
          "http://localhost:3001/api/add-to-cart",
          {
            method: "POST",
            body: {
              userId: useCookie("id"),
              sneakerId: sneakerId,
            }
          }
        );
        this.items = postAddData.data.value.items;
        item.isAdded = true;
        this.totalPrice += price;
        this.axiosGetParamsStore();
        useCookie("totalPrice").value = this.totalPrice.toString()
        this.cartCounter = this.items.length;
        useCookie("cartCounter").value = this.cartCounter.toString();
      } catch (error) {
        console.log(error);
      }
    },
    async onDeleteItem(id: number, item: any, price: any) {
      if (item.isAdded) {
        try {
          const removeData = await useFetch(
            "http://localhost:3001/api/remove-from-cart",
            {
              method: "POST",
              body:{
                userId: useCookie('id'),
                sneakerId: id,
              }
            }
          );
          if (this.cartCounter > 0) {
            this.cartCounter -= 1;
            useCookie("cartCounter").value = this.cartCounter.toString()
          }

          if (this.totalPrice > 0) {
            this.totalPrice -= price;
            useCookie("totalPrice").value = this.totalPrice.toString()
          }
          if (this.totalPrice < 0) {
            this.totalPrice = 0;
          }
          this.items = this.items.filter(feedback => feedback.id !== id);
          item.isAdded = false;
          this.axiosGetParamsStore();
          this.favorites();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async cartDataGet() {
      try {
        const dataCart = await useFetch<any>(
          "http://localhost:3001/api/get-cart-items",
          {
            method: "POST",
            body:{
              userId: useCookie('id'),
            }
          }
        );
        this.items = dataCart.data.value.items;
        if (this.items !== undefined) {
          this.isAdded = this.items.length > 0;
        }

        if (this.isAdded) {
          this.items.forEach((el: any) => {
            el.isAdded = true;
          });
        }
        this.totalPrice = parseInt(
          useCookie('totalPrice').value || "0",
          10
        );
        if(this.items !== undefined) this.cartCounter = this.items.length;
        useCookie("cartCounter").value = this.cartCounter.toString();
      } catch (error) {
        console.log(error);
      }
    },
  },
});

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
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
    localCounter: parseInt(localStorage.getItem("cartCounter") || "0", 10),
    counter: 1,
    totalPrice: 0,
    localPrice: parseInt(localStorage.getItem("totalPrice") || "0", 10),
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
        const postAddData = await axios.post(
          "http://localhost:3001/api/add-to-cart",
          {
            userId: localStorage.getItem("id"),
            sneakerId: sneakerId,
          }
        );
        this.items = postAddData.data.items;
        item.isAdded = true;
        this.totalPrice += price;
        this.axiosGetParamsStore();
        localStorage.setItem("totalPrice", this.totalPrice.toString());
        this.cartCounter = this.items.length;
        localStorage.setItem("cartCounter", this.cartCounter.toString());
      } catch (error) {
        console.log(error);
      }
    },
    async onDeleteItem(id: number, item: any, price: any) {
      if (item.isAdded) {
        try {
          const removeData = await axios.post(
            "http://localhost:3001/api/remove-from-cart",
            {
              userId: localStorage.getItem("id"),
              sneakerId: id,
            }
          );
          if (this.cartCounter > 0) {
            this.cartCounter -= 1;
            localStorage.setItem("cartCounter", this.cartCounter.toString());
          }

          if (this.totalPrice > 0) {
            this.totalPrice -= price;
            localStorage.setItem("totalPrice", this.totalPrice.toString());
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
        const dataCart = await axios.post(
          "http://localhost:3001/api/get-cart-items",
          {
            userId: localStorage.getItem("id"),
          }
        );
        this.items = dataCart.data.items;
        if (this.items !== undefined) {
          this.isAdded = this.items.length > 0;
        }

        if (this.isAdded) {
          this.items.forEach((el: any) => {
            el.isAdded = true;
          });
        }
        this.totalPrice = parseInt(
          localStorage.getItem("totalPrice") || "0",
          10
        );
        if(this.items !== undefined) this.cartCounter = this.items.length;
        
        localStorage.setItem("cartCounter", this.cartCounter.toString());
      } catch (error) {
        console.log(error);
      }
    },
  },
});

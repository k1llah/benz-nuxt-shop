import { defineStore } from "pinia";
import { nextTick } from "vue";
import axios from "axios";
interface Item {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}
export const useOrderStore = defineStore({
  id: "order",
  state: () => ({
    items: <Item[]>[],
    idParam: [0],
    amount: 0,
    methodPayment: "",
    isSelected: false,
    addressId: 2,
    firstName: "",
    lastName: "",
    surname: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    buildingNumber: "",
    postalCode: 0,
    phone: "",
    comment: "",
    warningAll: "",
    success: false,
    errorPayment: false,
    isFormCorrect: false,
    targetPage: localStorage.getItem("pageT"),
    orderNumber: "",
  }),
  actions: {
    targetPageDefine(targetName: string) {
      this.targetPage = localStorage.setItem("pageT", targetName)!;
      this.targetPage = targetName;
    },
    validateOnClick() {
      if (
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.surname !== "" &&
        this.city !== "" &&
        this.street !== "" &&
        this.phone !== "" &&
        this.postalCode !== null &&
        this.house !== "" &&
        this.apartment !== ""
      ) {
        return (this.isFormCorrect = true);
      } else if (
        this.city === "" ||
        this.street === "" ||
        this.phone === "" ||
        this.postalCode === null ||
        this.house === "" ||
        this.apartment === ""
      ) {
        setTimeout(() => {
          this.warningAll = "";
        }, 3500);
        this.warningAll =
          "*Заполните все обязательные поля или заполните их корректно";
      }
      return (this.isFormCorrect = false);
    },
    async placeAnOrder(isFormCorrect: boolean, ...args: any) {
      try {
        if (this.isSelected == true && this.methodPayment == "online") {
          const pay = await axios.post(
            "http://localhost:3001/api/sberbank/pay",
            {
              userName: "",
              password: "",
              orderNumber: "",
              amount: 125.0,
            }
          );
        } else if (
          this.methodPayment === "payWhenReceiving" &&
          this.isSelected &&
          this.idParam.length > 0
        ) {
          const pay = await axios.post(
            "http://localhost:3001/api/create-new-order",
            {
              userId: localStorage.getItem("id"),
              sneakerDataId: this.idParam,
              amount: this.amount,
              addressId: this.addressId,
              PayStatus: "whenReceived",
            }
          );
          if (pay.status === 200) {
            this.orderNumber = pay.data.orderNumber;
            this.success = true;
            document.body.style.overflow = "hidden";
            const clear = axios.post("http://localhost:3001/api/clear-cart", {
              userId: localStorage.getItem("id"),
            });
            nextTick(() => {
              const element = document.getElementById(
                "success"
              ) as HTMLDivElement;
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            });
            this.methodPayment = "";
          } else {
            console.log("Ошибка при выполнении запроса");
          }
        } else if (
          this.methodPayment === "payWhenReceiving" &&
          this.isSelected == false &&
          isFormCorrect &&
          this.idParam.length > 0
        ) {
          const newAddress = await axios.post(
            "http://localhost:3001/api/create-address",
            {
              userId: localStorage.getItem("id"),
              firstName: this.firstName,
              lastName: this.lastName,
              surname: this.surname,
              city: this.city,
              street: this.street,
              phoneNumber: this.phone,
              postalCode: this.postalCode,
              buildingNumber: this.buildingNumber,
              houseNumber: this.house,
              apartment: this.apartment,
            }
          );
          this.addressId = newAddress.data.id;

          const pay = await axios.post(
            "http://localhost:3001/api/create-new-order",
            {
              userId: localStorage.getItem("id"),
              sneakerDataId: this.idParam,
              amount: this.amount,
              addressId: this.addressId,
              PayStatus: "whenReceived",
              orderMessage: this.comment,
            }
          );
          if (pay.status === 200) {
            this.success = true;
            this.orderNumber = pay.data.orderNumber;
            const clear = axios.post("http://localhost:3001/api/clear-cart", {
              userId: localStorage.getItem("id"),
            });
            nextTick(() => {
              const element = document.getElementById(
                "success"
              ) as HTMLDivElement;
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            });
            this.methodPayment = "";
            document.body.style.overflow = "hidden";
          } else {
            console.log("Ошибка при выполнении запроса");
          }
        } else if (
          (this.isSelected && this.methodPayment === "") ||
          (this.methodPayment === "" && this.isFormCorrect)
        ) {
          this.errorPayment = true;
          document.body.style.overflow = "hidden";
          nextTick(() => {
            const element = document.getElementById("error") as HTMLDivElement;
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });
        }
        
      } catch (error) {
        console.log(error);
      }
    },
  },
});

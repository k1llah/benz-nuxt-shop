
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
    targetPage: useCookie("pageT"),
    orderNumber: "",
  }),
  actions: {
    targetPageDefine(targetName: string) {
      this.targetPage = useCookie('pageT').value
      console.log(useCookie('pageT').value)
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
          // const pay = await $fetch<any>(
          //   "http://localhost:3001/api/sberbank/pay",
          //   {
          //     userName: "",
          //     password: "",
          //     orderNumber: "",
          //     amount: 125.0,
          //   }
          // );
        } else if (
          this.methodPayment === "payWhenReceiving" &&
          this.isSelected &&
          this.idParam.length > 0
        ) {
          const pay = await $fetch<any>(
            "http://localhost:3001/api/create-new-order",
            {
              method: "POST",
              body: JSON.stringify({
                userId: useCookie("id").value,
                sneakerDataId: this.idParam,
                amount: this.amount,
                addressId: this.addressId,
                PayStatus: "whenReceived",
              })
            }
          );
          
          if (pay) {
            this.orderNumber = pay.orderNumber;
            this.success = true;
            document.body.style.overflow = "hidden";
            const clear = await $fetch("http://localhost:3001/api/clear-cart", {
              method: "POST",
              body: JSON.stringify({
                userId: useCookie("id").value,
                
              })
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
            console.log("Ошибка при выполнении запроса", pay)
          }
        } else if (
          this.methodPayment === "payWhenReceiving" &&
          this.isSelected == false &&
          isFormCorrect &&
          this.idParam.length > 0
        ) {
          const newAddress = await $fetch<any>(
            "http://localhost:3001/api/create-address",
            {
              method: "POST",
              body: JSON.stringify({
                userId: useCookie("id").value,
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
              })
            }
          );
          this.addressId = newAddress.id;

          const pay = await $fetch<any>(
            "http://localhost:3001/api/create-new-order",
            {
              method: "POST",
              body: JSON.stringify({
                userId: useCookie("id").value,
                sneakerDataId: this.idParam,
                amount: this.amount,
                addressId: this.addressId,
                PayStatus: "whenReceived",
                orderMessage: this.comment,
              })
            }
          );
          if (pay.ok) {
            this.success = true;
            this.orderNumber = pay.data.value.orderNumber;
            const clear = await $fetch("http://localhost:3001/api/clear-cart", {
              method: "POST",
              body: JSON.stringify({
                userId: useCookie("id").value,
              })
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

<script setup lang="ts">
import axios from "axios";
import md5 from "md5";
const cartStore = useCartStore();
const email = ref("");
const password = ref("");
const formReport = ref("");
const authStore = useAuthStore();
const logInFunc = async (event: any) => {
  event.preventDefault();
  const email = document.getElementById("email") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  if (email.value !== null && password.value !== null) {
    try {
      const data = await axios.post("http://localhost:3001/api/login", {
        email: email.value,
        hash: md5(password.value),
      });

      if (data.data) {
        localStorage.setItem("id", data.data.user.id);
        localStorage.setItem("uuid", data.data.user.uuid);
        localStorage.setItem("role", data.data.user.role);
        authStore.id = data.data.user.id;
        authStore.uuid = data.data.user.uuid;
        authStore.role = data.data.user.role;
        email.value = "";
        password.value = "";
        formReport.value = "";
        authStore.checkAuth();
        if (authStore.isAuthenticated == true && cartStore.items.length > 0) {
          await cartStore.cartDataGet();

          await cartStore.items.forEach((el: any) => {
            cartStore.totalPrice += el.price;
            localStorage.setItem("totalPrice", cartStore.totalPrice.toString());
          });
        }
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        formReport.value = "";
      }, 3000);
      formReport.value = "Неверный email или пароль";
    }
  }
};
</script>
<template>
  <div
    class="max-w-[330px] m-auto relative flex flex-col p-4 rounded-md text-black bg-white dark:bg-transparent dark:text-ghostWhiteText"
    v-if="authStore.isAuthenticated == false"
  >
    <div class="flex mt-[50px] flex-col justify-center items-center">
      <h3 class="text-[28px] font-light">
        Вы <span class="text-[#7747ff] dark:text-green-500">не вошли</span>
      </h3>
    </div>
    <div
      class="text-base font-normal mb-4 text-center text-[#1e0e4b] dark:text-ghostWhiteText mt-[20px]"
    >
      Войдите в аккаунт
    </div>
    <form class="flex flex-col gap-3">
      <p class="text-lg text-center text-red-700">
        {{ formReport }}
      </p>
      <div class="block relative">
        <label
          for="email"
          class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 dark:text-ghostWhiteText"
          >Email</label
        >
        <input
          type="text"
          id="email"
          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
        />
      </div>
      <div class="block relative">
        <label
          for="password"
          class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 dark:text-ghostWhiteText"
          >Password</label
        >
        <input
          type="password"
          id="password"
          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
        />
      </div>
      <div>
        <a class="text-sm text-[#7747ff] dark:text-green-500" href="#"
          >Забыли пароль?
        </a>
      </div>
      <button
        type="submit"
        class="bg-[#7747ff] dark:bg-green-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
        @click="logInFunc($event)"
      >
        Submit
      </button>
    </form>
    <div class="text-sm text-center mt-[1.6rem]">
      У вас нет аккаунта?
      <router-link to="Sign_up">
        <p class="text-sm text-[#7747ff] dark:text-green-500">
          Зарегистрируйтесь
        </p></router-link
      >
    </div>
  </div>

  <div class="p-5" v-if="authStore.isAuthenticated == true">
    <profile-data />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import { useAllStore } from "@/stores/all";
const allStore = useAllStore();

const name = ref("");
const lastName = ref("");
const surname = ref("");
const city = ref("");
const street = ref("");
const phoneNumber = ref("");
const postalCode = ref();
const buildingNumber = ref("");
const houseNumber = ref();
const apartment = ref();
let warningAll = ref("");
const correctDataInput = computed(
  () =>
   
    houseNumber.value !== null &&
    apartment.value !== null &&
    postalCode.value !== '' &&
    phoneNumber.value !== null &&
    name.value.length >= 2 &&
    lastName.value.length >= 2 &&
    surname.value.length >= 2 &&
    city.value.length >= 2 &&
    street.value.length >= 2 
    
);
const createAddress = async () => {
  try {
    if (correctDataInput.value == true) {
      const newAddress = await axios.post(
        "http://localhost:3001/api/create-address",
        {
          userId: localStorage.getItem("id"),
          firstName: name.value,
          lastName: lastName.value,
          surname: surname.value,
          city: city.value,
          street: street.value,
          phoneNumber: phoneNumber.value,
          postalCode: postalCode.value,
          buildingNumber: buildingNumber.value,
          houseNumber: houseNumber.value,
          apartment: apartment.value,
        },
        )
        location.reload()
    } else if (!correctDataInput.value) {
      setTimeout(() => {
        warningAll.value = "";
      }, 4000);
      warningAll.value = "*Заполните все обязательные поля или заполните их корректно"
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="md:mt-16 sm:mt-8">
    <form class="flex flex-col md:max-h-[450px] sm:max-h-[400px] overflow-scroll sm:p-3">
      <div class="flex flex-col gap-2 justify-center dark:border-none">
        <input
          placeholder="Фамилия *"
          class="border-2 text-gray-500 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-96 input-dark"
          type="text"
          v-model="lastName"
        />
        
        <input
          placeholder="Имя *"
          class="border-2 text-gray-500 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-96 input-dark"
          type="text"
          v-model="name"
        />
        
        
        <input
          placeholder="Отчество (при наличии)"
          class="border-2 text-gray-500 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-96 input-dark"
          type="text"
          v-model="surname"
        />
      </div>

      <div class="flex md:flex-nowrap sm:flex-wrap  md:space-x-4 sm:gap-2 mb-8 mt-3">
        <input
          placeholder="Номер телефона *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="tel"
          v-model="phoneNumber"
          minlength="10"
        />
        
        <input
          placeholder="Город *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="city"
        />
      </div>
      
      <div class="flex space-x-4 mb-8 text-sm">
        <input
          placeholder="Почтовый индекс *"
          class="border-2 text-gray-500 rounded-md p-2 w-1/2 focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="postalCode"
          minlength="6"
        />
        
        <input
          placeholder="Улица *"
          class="border-2 text-gray-500 rounded-md p-2 w-1/2 focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="street"
          minlength="2"
        />
        
      </div>
      <div class="flex space-x-4 mb-8 text-sm">
        <input
          placeholder="Дом *"
          class="border-2 text-gray-500 rounded-md p-2 w-1/2 focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="houseNumber"
        />
        <input
          placeholder="Корпус"
          class="border-2 text-gray-500 rounded-md p-2 w-1/2 focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="buildingNumber"
        
        />
      </div>
      <div class="flex space-x-4 mb-8 text-sm">
        <input
          placeholder="Квартира *"
          class="border-2 text-gray-500 rounded-md p-2 w-1/2 focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="apartment"
        
        />
      </div>
      <p class="text-red-600 text-[16px]">{{ warningAll }}</p>
    </form>

    <div class="flex gap-5 justify-center md:mt-4 sm:flex-wrap">
      <button
        class="bg-[#60d389] md:px-7 sm:px-4 py-3 rounded-lg text-white text-sm font-normal hover:bg-green-700 transition duration-250"
        @click="createAddress()"
      >
        Создать адрес
      </button>
      <button
        class="bg-[#7747ff] px-4 py-2 rounded-lg text-white text-sm font-normal hover:bg-red-600 transition duration-250"
        @click="allStore.targetPage = '', allStore.headerText = 'Мои адреса для доставки'"
      >
        Вернуться назад
      </button>
    </div>
    <div class="mt-3">
      <button
        class="cursor-pointer duration-200 hover:scale-125 active:scale-100 md:w-12 h-12 sm:w-8 sm:h-8"
        title="Go Back"
        @click="
          (allStore.targetPage = ''),
            (allStore.headerText = 'Мои адреса для доставки')
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          
          viewBox="0 0 24 24"
          class="stroke-blue-300"
        >
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M11 6L5 12M5 12L11 18M5 12H19"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.input-dark {
  @apply dark:bg-mainDark dark:border-none dark:text-ghostWhiteText dark:placeholder:text-slate-300;
} 
</style>
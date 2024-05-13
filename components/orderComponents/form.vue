<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import { useAllStore } from "@/stores/all";
import { useOrderStore } from "@/stores/order";
import { useFormStore } from '@/stores/formStore';
import order from './order.vue'
const formStore = useFormStore();
const orderStore = useOrderStore();



</script>
<template>
  <div class="md:mt-16 sm:mt-8 overflow-scroll md:max-h-[auto] sm:max-h-[650px]max-w-[350px] pl-3 ">
    <form class="flex flex-col mr-3 p-5 rounded-2xl shadow-xl dark:bg-[#58585f]" v-if="!orderStore.isSelected">
      <div class="flex gap-3 ">
        <input
          placeholder="Фамилия *"
          class="border-[1px] text-gray-400 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-52 sm:w-[80%] input-dark "
          type="text"
          v-model="orderStore.lastName"
					minlength="2"
        />

        <input
          placeholder="Имя *"
          class="border-[1px] text-gray-400 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-52 sm:w-[80%] input-dark"
          type="text"
          v-model="orderStore.firstName"
					minlength="2"
        />

      
      </div>

      <div class="flex flex-wrap md:flex-nowrap  md:gap-3 mb-3">
				<input
          placeholder="Отчество (при наличии)"
          class="border-[1px] text-gray-400 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-52 sm:w-[80%] input-dark"
          type="text"
          v-model="orderStore.surname"
        />
				<input
          placeholder="Номер телефона *"
          class="border-[1px] text-gray-400 rounded-md p-2 md:mb-4 sm:mb-0 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-52 sm:w-[80%] input-dark"
          type="tel"
          v-model="orderStore.phone"
					minlength="10"
        />
      

      
      </div>

      <div class="flex flex-wrap md:flex-nowrap md:gap-3 md:mb-8 sm:gap-3 sm:mb-3">
				<input
          placeholder="Город *"
          class="border-[1px] text-gray-400 rounded-md p-2 md:w-52 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="orderStore.city"
        />
				
        <input
          placeholder="Почтовый индекс *"
          class="border-[1px] text-gray-400 rounded-md p-2 md:w-52 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="orderStore.postalCode"
          minlength="6"
        />

      </div>
      <div class="flex flex-wrap md:flex-nowrap md:gap-3 md:mb-8 sm:gap-3 sm:mb-3">
        <input
          placeholder="Улица *"
          class="border-[1px] text-gray-400 rounded-md p-2 md:w-52 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="orderStore.street"
          minlength="2"
        />

        <input
          placeholder="Дом *"
          class="border-[1px] text-gray-400 rounded-md p-2 md:w-52 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="orderStore.house"
        />
       
      </div>
      <div class="flex flex-wrap md:flex-nowrap md:gap-3 md:mb-8 sm:gap-3 sm:mb-3">
        <input
          placeholder="Квартира *"
          class="border-[1px] text-gray-400 rounded-md p-2 md:w-52 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="orderStore.apartment"
        />
				<input
          placeholder="Корпус"
          class="border-[1px] text-gray-400 rounded-md p-2 md:w-52 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="orderStore.buildingNumber"
        />
      </div>
      <p class="text-red-600 text-[16px]">{{ orderStore.warningAll }}</p>
    </form>

    <div class="flex gap-5 sm:flex-wrap md:flex-nowrap md:mt-8">
      
      
			

    
      
    </div>
  </div>
</template>
<style scoped>
.input-dark {
  @apply dark:bg-mainDark dark:border-none dark:text-ghostWhiteText dark:placeholder:text-slate-300;
}
</style>
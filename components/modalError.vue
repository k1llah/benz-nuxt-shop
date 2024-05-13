<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useAllStore } from '@/stores/all';
const allStore = useAllStore()
const orderStore = useOrderStore();
onBeforeRouteLeave((to, from, next) => {
  orderStore.errorPayment = false
  allStore.unlock()
  next()
})
</script>
<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="notifications-container z-20 m-auto md:text-xl md:w-[450px] sm:w-[300px] h-auto flex flex-col absolute items-center justify-center" id="error">
    <div class="p-6 bg-[#f8e71c] rounded-lg">
      <div class="flex gap-4">
        <div class="flex-shrink-0">
          <svg
            aria-hidden="true"
            fill="red"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            class="dad-joke-svg"
          >
            <path
              clip-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-semibold">Не выбран способ оплаты!</p>
          
            <p>
              Для продолжения оформления заказа необходимо выбрать способ
              оплаты.
            </p>
          
          
            <button class="dad-joke-button-main p-2 max-w-fit" type="button" @click="orderStore.errorPayment = false, allStore.unlock()">
              Вернуться к оформлению
						</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dad-joke {
  padding: 1.5rem;
  border-radius: 0.375rem;
  background-color: rgb(248, 231, 28);
}

.dad-joke-svg {
  color: rgb(255, 255, 255);
  width: 1.25rem;
  height: 1.25rem;
}

.dad-joke-prompt-wrap {
  margin-left: 0.75rem;
}

.dad-joke-prompt-heading {
  font-weight: bold;
  color: rgb(57, 55, 54);
}

.dad-joke-prompt {
  margin-top: 0.5rem;
  color: rgb(57, 55, 54);
}

.dad-joke-button-container {
  display: flex;
  margin-top: 0.875rem;
  margin-bottom: -0.375rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.dad-joke-button-main {
 
  background-color: #f75404;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
  border-radius: 0.375rem;
  border: none;
	cursor: pointer;
	transition: 0.3s;
}

.dad-joke-button-main:hover {
  background-color: #d1410c;
	transition: 0.3s;
}
</style>

<script setup lang="ts">
import buttonProfile from "@/components/buttonProfile.vue";
import orderList from "./ordersInProfile/orderList.vue";
import { ref, onMounted } from "vue";
import { useMyOrderStore } from "@/stores/myOrders";
import axios from "axios";
const dataOrder = ref();
const myOrders = useMyOrderStore();
dataOrder.value = myOrders.orders;

onMounted(async () => {
  await myOrders.getDataOrder();
  dataOrder.value = myOrders.orders;
});
</script>
<template>
  <div class="flex gap-5 items-center dark:text-ghostWhiteText">
    <buttonProfile />
    <h2 class="md:text-3xl sm:text-2xl">Мои заказы</h2>
  </div>
  <div
    class="overflow-scroll md:max-h-[650px] md:min-h-[650px] md:mt-5 sm:max-h-[550px] md:bg-[#dbeafe] dark:bg-primaryDark dark:sm:bg-transparent"
  >
    <div class="flex flex-col gap-5 md:p-5 mt-2 sm:p-0">
      <div>
        <orderList />
      </div>
    </div>
  </div>
</template>
<style scoped>
*::-webkit-scrollbar {
  width: 0px;
}
</style>

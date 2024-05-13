<script setup lang="ts">
import buttonBack from "@/components/buttonBack.vue";
import order from "@/components/orderComponents/order.vue";
</script>
<template>
  <div class="flex md:ml-[50px] sm:ml-3 mt-5 gap-[15px]">
    <div class="flex gap-5 items-center">
      <buttonBack />
      <h2 class="md:text-3xl sm:text-[26px] dark:text-ghostWhiteText">Оформление заказа</h2>
    </div>
  </div>
	<div>
  <order />
	</div>
</template>

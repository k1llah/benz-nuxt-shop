<script setup lang="ts">
const props = defineProps({
  id: Number,
  orderNumber: String,
  title: String,
  imgUrl: String,
  price: Number,
  totalAmount: Number,
  status: String,
  createdAt: String,
});
</script>
<template>
  <div>
    <div
      class="flex flex-col gap-3 max-w-fit bg-white dark:bg-slate-700 p-5 rounded-xl shadow-md border-[1px] border-slate-100"
    >
      <h4 class="dark:text-ghostWhiteText">{{ props.title }}</h4>
      <img :src="props.imgUrl" alt="Sneaker Image" class="max-w-40" />
      <p class="font-light dark:text-ghostWhiteText">Стоимость: {{ props.price }}</p>
    </div>
  </div>
</template>

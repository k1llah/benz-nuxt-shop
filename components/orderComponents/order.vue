<script setup lang="ts">
const orderStore = useOrderStore();
// https://3dsec.sberbank.ru/payment/rest/register.do
// onBeforeRouteLeave(()=>{
//   orderStore.items = []
//   useCookie('sneakerId').value = ''
// })
</script>
<template>
  <div>
    <div v-if="useCookie('pageT').value == 'fast'">
      <div
        class="md:w-full sm:w-[90%] flex justify-between p-3 items-center lg:flex-row md:flex-col-reverse md:items-center md:gap-5 sm:flex-col-reverse sm:items-center"
      >
        <renderItem />
        <addresses />
      </div>
      <div
        class="w-full flex justify-center gap-10 lg:flex-row md:flex-col-reverse md:items-center sm:flex-col-reverse sm:items-center"
      >
        <placeAnOrder />
        <form-order />
      </div>
    </div>
    <div v-else-if="useCookie('pageT').value == 'classic'">
      <div
        class="md:w-full sm:w-[90%] flex justify-between p-3 items-center lg:flex-row md:flex-col-reverse md:items-center md:gap-5 sm:flex-col-reverse sm:items-center"
      >
        <itemsFromCartToOrder />
        <addresses />
      </div>
      <div
        class="w-full flex justify-center gap-10 lg:flex-row md:flex-col-reverse md:items-center sm:flex-col-reverse sm:items-center"
      >
        <placeAnOrder />
        <form-order />
      </div>
    </div>
  </div>
</template>

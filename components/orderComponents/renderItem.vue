<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import templateItem from "./templateItem.vue";
import { useOrderStore } from "@/stores/order";
const orderStore = useOrderStore();
const localStorageId = localStorage.getItem("sneakerId");
let data = ref();
let idItems = ref([] as any);
const getDateShoe = async function (params: any) {
  try {
    const dataShoe = await axios.get(`http://localhost:3001/api/sneaker`, {
      params: {
        id: params,
      },
    });
    data.value = dataShoe.data;
    idItems.value = [dataShoe.data.id];
    orderStore.idParam = idItems.value;
    orderStore.amount = dataShoe.data.price;
  } catch (error) {
    console.log(error);
  }
};
onBeforeMount(() => {
  getDateShoe(localStorageId);
});
</script>
<template>
  <div class="md:ml-10 sm:ml-5 sm:mt-5">
    <templateItem
      :id="data?.id"
      :title="data?.title"
      :image="data?.imageUrl"
      :price="data?.price"
    />
  </div>
</template>

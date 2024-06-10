<script setup lang="ts">
const orderStore = useOrderStore();
const cookieId = useCookie("sneakerId").value
let data = ref();
let idItems = ref([] as any);
const getDateShoe = async function (params: any) {
  try {
    const dataShoe = await $fetch<any>(`http://localhost:3001/api/sneaker`, {
      method: "GET",
      params: {
        id: params,
      },
    });
    console.log(dataShoe);
    data.value = dataShoe;
    idItems.value = [dataShoe.id];
    orderStore.idParam = idItems.value;
    orderStore.amount = dataShoe.price;
  } catch (error) {
    console.log(error);
  }
};
onBeforeMount(() => {
  getDateShoe(cookieId);
  console.log(cookieId)
});
</script>
<template>
  <div class="md:ml-10 sm:ml-5 sm:mt-5" v-if="data">
    <templateItem
      :id="data?.id"
      :title="data?.title"
      :image="data?.imageUrl"
      :price="data?.price"
    />
  </div>
</template>

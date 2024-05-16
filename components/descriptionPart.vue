<script setup lang="ts">
const orderStore = useOrderStore();
const authData = useAuthStore();
const router = useRouter();
const allStore = useAllStore();
const paramsId = useCookie('sneakerId').value;

// orderStore.idParam = Number(paramsId);
let itemData = ref();
const brand = ref();
let brandImageUrl = ref();
const brands = allStore.brandImages;
const getDateShoe = async function () {
  try {
    const dataShoe = await useFetch<any>(`http://localhost:3001/api/sneaker`, {
      method: "GET",
      params: {
        id: paramsId,
      },
    });
    itemData.value = dataShoe.data;
    orderStore.items = dataShoe.data.value;
    brand.value = dataShoe.data.value.brand;
    brandImageUrl.value = allStore.getBrandImageUrl(brand.value);
  } catch (error) {
    console.log(error);
  }
}
function getPathName() {
  if (authData.isAuthenticated == true) {
    router.push("/order");
  } else {
    useCookie("prevPage").value = location.pathname
    router.push("/sign-up");
  }
}
onMounted(async () => {
  if (paramsId) {
    await getDateShoe();
  }
});

</script>
<template>
  <div class="flex md:ml-[50px] sm:ml-3 mt-5 gap-[15px] dark:text-ghostWhiteText">
    <div class="flex gap-5 items-center">
      <buttonBack />
      <h2 class="text-3xl">Описание</h2>
    </div>
  </div>

  <div class="md:mt-[100px] sm:mt-10 flex justify-around sm:flex-wrap p-5">
    <div>
      <img
        :src="itemData?.imageUrl"
        class="shadow md:max-w-[410px] sm:max-w-[300px] border-slate-200 border-[1px] rounded-2xl p-5 dark:rounded-xl dark:border-none dark:brightness-75 dark:p-0"
        alt="sneaker"
      />
    </div>

    <div class="flex flex-col gap-7 max-w-[370px] sm:mt-10 md:mt-0 p-4">
      <p class="md:text-3xl sm:text-xl text-[#000000] dark:text-ghostWhiteText font-sans font-[600]">
        {{ itemData?.title }}
      </p>

      <p class="text-2xl text-[#000000] dark:text-ghostWhiteText font-sans font-[400]">
        {{ itemData?.price }} руб.
      </p>
      <div class="flex md:gap-5 sm:gap-2 mt-9 md:flex-nowrap sm:mt-2">
        <button
          class="overflow-hidden relative w-36 p-2 h-[40px] bg-black text-white border-none rounded-md text-[15px] font-[500] cursor-pointer z-10 group flex justify-center items-center"
          @click="orderStore.targetPageDefine('fast'), getPathName()"
        >
          Быстрый заказ
          <span
            class="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
          ></span>
          <span
            class="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
          ></span>
          <span
            class="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"
          ></span>
          <span
            class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute z-10 text-center"
            >Оформи!</span
          >
        </button>
      </div>

      <p class="text-xl text-slate-600 dark:text-slate-400 font-sans font-[400]">
        Цвет: {{ itemData?.color }}
      </p>
      <img
        :src="brandImageUrl"
        alt="brand name"
        class="brightness-0 max-w-20 mt-10 dark:brightness-[100]"
      />
    </div>
  </div>

  <div class="flex flex-col gap-10 mt-20 justify-center items-center sm:p-5">
    <div class="max-w-[650px]">
      <div
        class="border-b-[3px] border-[#a5b4fc] dark:border-green-500 w-[250px] m-auto p-3 text-center"
      >
        <h3 class="md:text-3xl sm:text-2xl text-700 dark:text-ghostWhiteText">О товаре</h3>
      </div>
      <div class="flex flex-col gap-5 mt-16">
        <h4 class="md:text-2xl sm:text-xl text-500 text-center dark:text-ghostWhiteText">
          Описание товара
        </h4>
        <p
          class="md:text-[20px] sm:text-[16px] text-slate-700 dark:text-slate-300 text-400 text-balance"
        >
          {{ itemData?.description }}
        </p>
      </div>
      <div
        class="flex justify-between items-end gap-10 mt-16 border-b-2 border-slate-800 pb-2 sm:flex-wrap"
      >
        <p class="max-w-[400px] leading-9 md:text-lg sm:text-base dark:text-ghostWhiteText">
          <span class="md:text-2xl text-[#7747ff] dark:text-green-500 sm:text-xl">Состав:</span>
          <br />
          {{ itemData?.materials }}
        </p>
        <p class="dark:text-ghostWhiteText">
          {{ itemData?.countryMade }}
        </p>
      </div>
    </div>
  </div>
  <div class="flex p-7 pb-16 justify-end mt-10">
    <h4 class="text-base text-slate-400 text-500 text-right max-w-[500px] dark:text-orange-500">
      Качество товара, его безопасность для жизни, здоровья потребителей,
      окружающей среды, подтверждено в соответствии с требованиями
      законодательства. Подробная информация размещена на этикетке или упаковке
      товара, либо в технической документации к нему.
    </h4>
  </div>
</template>
<style scoped>
.shadow {
  -webkit-box-shadow: 0px -1px 41px 1px rgba(34, 60, 80, 0.09);
  -moz-box-shadow: 0px -1px 41px 1px rgba(34, 60, 80, 0.09);
  box-shadow: 0px -1px 41px 1px rgba(34, 60, 80, 0.09);
}
</style>

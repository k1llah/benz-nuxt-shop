<script setup lang="ts">
import { debounce } from "lodash";
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const filters = ref({
  sortBy: "title",
  title: "",
});
cartStore.setFilters(filters.value)
let realStateOfCart = ref(cartStore.items);
let onMountedCartState = cartStore.items;
const onChangeSelect = (event: any) => {
  filters.value.sortBy = event.target.value;
};

const stateUpdate = useStateStore();
const allStore = useAllStore();

const axiosGetParams = async () => {
  try {
    const params = {
      sortBy: filters.value.sortBy,
      title: filters.value.title,
    }
    await allStore.getItemsMethod(params);
    await stateUpdate.updateCardsCart(params)
  } catch (error) {
    console.log(error);
  }
};

if (realStateOfCart.value != onMountedCartState) {
  axiosGetParams();
}

onBeforeMount(async () => {
  await favoritesStore.favorites();
});

onMounted(async () => {
  await favoritesStore.favorites();
  await axiosGetParams();
});

watch(filters,  debounce(axiosGetParams, 500),{
  deep: true 
})
</script>

<template>
  <div>
    <div class="p-10">
      <div
        class="flex justify-between gap-3 sm:flex-wrap md:flex-nowrap items-center"
      >
        <h2 class="text-3xl font-bold md:mb-0 sm:mb-8 dark:text-ghostWhiteText">
          Все кроссовки
        </h2>

        <div
          class="flex gap-4 md:flex-row md:flex-wrap md:justify-end  sm:flex-col-reverse"
        >
          <select
            class="py-2 px-3 border rounded-md outline-none dark:bg-mainDark dark:text-ghostWhiteText dark:border-none"
            @change="onChangeSelect"
          >
            <option value="name">По названию</option>
            <option value="sortByPrice">Сначала дешевые</option>
            <option value="sortBy-Price">Сначала дорогие</option>
          </select>

          <div class="relative">
            <img src="/search.svg" class="absolute left-3 top-3" alt="" />
            <input
              type="text"
              placeholder="Search..."
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 dark:bg-mainDark dark:text-ghostWhiteText dark:border-none"
              v-model="filters.title"
            />
          </div>
        </div>
      </div>
    </div>

    <CardList :items="allStore.items" />
    <div v-if="allStore.items == ''" class="flex justify-center w-full">
      <badassLoader />
    </div>
  </div>
</template>

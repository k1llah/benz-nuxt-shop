<script setup script lang="ts">
import { debounce } from "lodash";
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
let items = ref<any>([]);
const filters = reactive({
  sortBy: "title",
  searchQuery: "",
});
let realStateOfCart = ref(cartStore.items);
let onMountedCartState = cartStore.items;
// Функция для обработки изменений в инпуте поиска
const onChangeSelect = (event: any) => {
  filters.sortBy = event.target.value;
};

const axiosGetParams = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };
    if (filters.searchQuery) {
      //@ts-ignore
      params.title = filters.searchQuery;
    }
    const { data } = await useFetch(`http://localhost:3001/api`, {
      method: "GET",
      params,
    });

    items.value = data;
    cartStore.items.forEach((el: any) => {
      items.value.forEach((item: any) => {
        if (el.id == item.id) {
          item.isAdded = true;
        }
      });
    });

    favoritesStore.items.forEach((el: any) => {
      items.value.forEach((item: any) => {
        if (el.id == item.id) {
          item.isFavorite = true;
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
cartStore.axiosGetParamsStore = axiosGetParams;
if (realStateOfCart.value != onMountedCartState) {
  axiosGetParams();
}
onBeforeMount(async () => {
  await favoritesStore.favorites();
});
onMounted(() => {
  favoritesStore.favorites();
  axiosGetParams();
});
watch(filters, debounce(axiosGetParams, 350));
</script>

<template>
  <div class="p-10">
    <div
      class="flex justify-between gap-3 sm:flex-wrap md:flex-nowrap items-center"
    >
      <h2 class="text-3xl font-bold md:mb-0 sm:mb-8 dark:text-ghostWhiteText">
        Все кроссовки
      </h2>

      <div
        class="flex gap-4 md:flex-row md:flex-wrap md:justify-end sm:flex-col-reverse"
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
            v-model="filters.searchQuery"
          />
        </div>
      </div>
    </div>
  </div>
  <CardList :items="items" />
  <div v-if="items == ''" class="flex justify-center w-full">
    <badassLoader/>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const favoriteStore = useFavoritesStore();
const authStore = useAuthStore();
const items = ref<any>([]as any);
const isFav = ref<Boolean>(true);
async function favorites() {
  try {
    const data  = await $fetch<any>(
      "http://localhost:3001/api/favorites-user",
      {
        method:"POST",
        body:{
          id: useCookie("id").value,
        }
      }
    );

    items.value = data
    console.log(data)
    if(items !== undefined && items.value !== null){
      items.value.forEach((el: any) => {
        el.isFavorite = true;
      });
    }
    if(cartStore.items !== undefined){
      cartStore.items.forEach((el: any) => {
        items.value.forEach((item: any) => {
          if (el.id == item.id) {
            item.isAdded = true;
          }
        });
      });
    }
    if (items.value.length == 0) {
      isFav.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
cartStore.favorites = favorites;
onBeforeMount(() => {
  cartStore.cartDataGet();
  favorites();
});
</script>
<template>
  <div>
    <div class="min-h-[600px]">
      <div class="flex md:ml-[50px] sm:ml-[20px] mt-5 gap-[15px]">
        <div class="flex gap-5 items-center">
          <buttonBack />
          <h2 class="text-2xl font-extralight dark:text-ghostWhiteText">Избранное</h2>
        </div>
      </div>

      <div
        v-if="authStore.isAuthenticated == true && isFav == true && items"
        class="mt-[30px]"
      >
        <FavList :items="items" />
      </div>
      <div v-else-if=" authStore.isAuthenticated == true && !items">
        <badassLoader />
      </div>
      <div
        v-else-if="authStore.isAuthenticated == true && isFav == false"
        class="flex flex-col justify-center items-center h-[500px]"
      >
        <div class="md:w-[500px] sm:w-auto text-center">
          <h1 class="text-2xl dark:text-ghostWhiteText">
            К сожалению у вас нет добавленных
            <span class="text-2xl text-[#7747ff] dark:text-green-600">избранных</span> товаров
          </h1>
        </div>
        <p class="text-[70px]">👿</p>
      </div>

      <div
        v-else="authStore.isAuthenticated == false"
        class="flex flex-col justify-center items-center h-[500px]"
      >
        <div class="md:w-[500px] sm:w-auto text-center">
          <h1 class="text-2xl dark:text-ghostWhiteText">
            Зарегистрируйтесь или войдите в
            <span class="text-2xl text-[#7747ff]">аккаунт</span> для просмотра и
            добавления избранных товаров
          </h1>
        </div>
        <div class="max-w-[70px] mt-5"><img src="/emoji-1.png" alt="" /></div>
      </div>
    </div>
  </div>
</template>

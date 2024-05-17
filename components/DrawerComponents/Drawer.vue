<script setup lang="ts">
const sneakerStore = useSneaker();
const router = useRouter();
const orderStore = useOrderStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
watch(
  [() => cartStore.totalPrice, () => cartStore.items],
  ([newTotalPrice, newItems]) => {
    cartStore.localPrice = newTotalPrice;
  }
);
onMounted(() => {
  if(authStore.isAuthenticated == true){
    cartStore.cartDataGet();
  }
  cartStore.localPrice;
});

</script>

<template>
  <div v-if="sneakerStore.show" class="" :class="{ 'cartVisible transition-opacity duration-700 opacity-100': sneakerStore.show, 'cart opacity-0 transition-opacity  duration-700' : !sneakerStore.show }">
      
    <div
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    ></div>

    <div
      class="bg-white dark:bg-mainDark dark:text-ghostWhiteText md:w-96 md:h-full sm:w-72 sm:h-full fixed right-0 top-0 z-20 p-10 opacity-100" 
    >
      <Bucket />
      <CartItemList />
      <div>
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span> Итого: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <p v-if="cartStore.items">
              {{ (cartStore.localPrice * (1 + 0.05)).toFixed(2) }} RUB
            </p>
            <p v-else-if="cartStore.items == undefined">0 RUB</p>
          </div>

          <div class="flex gap-2">
            <span> Налог </span>
            <div class="flex-1 border-b border-dashed"></div>
            <p v-if="cartStore.items">
              {{ (cartStore.localPrice * 0.05).toFixed(2) }} RUB
            </p>
            <p v-if="cartStore.items == undefined">0 RUB</p>
          </div>
        </div>

        <button
          class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-700 transition disabled:bg-slate-400 cursor-pointer mt-4"
          @click="orderStore.targetPageDefine('classic'), router.push('/LazyOrder'), sneakerStore.show = false" :disabled="cartStore.localCounter <= 0"
        >
          Оформить Заказ
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cart{
  z-index: 999;
  position: relative;
}
.cartVisible{
  position: relative;
  z-index: 9999;
  opacity: 1;
  transition: all linear 400ms;
  animation: opacityOpen 0.5s ease;
}
@keyframes opacityOpen {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes opacityClose {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

</style>
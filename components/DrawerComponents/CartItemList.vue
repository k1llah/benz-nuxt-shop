<script setup lang="ts">
const sneakerStore = useSneaker()
const authStore = useAuthStore();
const cartStore = useCartStore();
onBeforeMount(() => {
  cartStore.cartDataGet();
});

</script>

<template>
  <div v-if="cartStore.isAdded" class="overflow-scroll max-h-[70%] flex flex-col gap-4" v-auto-animate>
    <div
      class="flex flex-col gap-4 flex-1"
      v-for="item in cartStore.items"
      :key="item.id"
      v-auto-animate
    >
      <CartItem
        v-if="item.isAdded == true"
        :id="item.id"
        :title="item.title"
        :img="item.imageUrl"
        :price="item.price"
        :count="cartStore.counter"
        :isAdded="item.isAdded"
        :onDelete="() => cartStore.onDeleteItem(item.id, item, item.price)"
        :onMinusCounter="cartStore.counterRemove"
        :onPlusCounter="cartStore.counterPlus"
      />
    </div>
  </div>
 
  <div
    v-if="authStore.uuidLocal !== '' &&  cartStore.localCounter <= 0 "
    class="flex flex-col gap-4 items-center md:min-h-[70%] sm:min-h-[55%] justify-center"
  >
    <img src="/package-icon.png" alt="" class=" md:max-w-[100px] sm:max-w-[80px]" />
    <h3 class="md:text-2xl sm:text-xl">Корзина пустая</h3>
    <p class="text-slate-500 dark:text-slate-400 sm:text-center md:text-left sm:text-sm md:text-lg">
      Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
    </p>
  </div>

  <div
    v-else-if="authStore.uuidLocal == ''"
    class="flex flex-col gap-4 items-center md:min-h-[70%] sm:min-h-[60%] justify-center"
  >
    <img src="/package-icon.png" alt="" class="md:max-w-[100px] sm:max-w-[80px]" />
    <h3 class="text-2xl sm:text-xl">Корзина пустая</h3>
    <p class="text-slate-500 sm:text-center md:text-left sm:text-sm md:text-lg">
     <NuxtLink to="/profileUser" @click="sneakerStore.show = !sneakerStore.show" class="text-[#7747ff]"> Войдите </NuxtLink> или <NuxtLink to="/signUp" @click="sneakerStore.show = !sneakerStore.show" class="text-[#7747ff]">зарегистрируйтесь</NuxtLink> чтобы добавлять товары в корзину
    </p>
  </div>
</template>

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
    v-if="authStore.isAuthenticated == true &&  cartStore.localCounter <= 0 "
    class="flex flex-col gap-4 items-center min-h-[70%] justify-center"
  >
    <img src="/package-icon.png" alt="" class="max-w-[100px]" />
    <h3 class="text-2xl">Корзина пустая</h3>
    <p class="text-slate-500 dark:text-slate-400">
      Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
    </p>
  </div>

  <div
    v-else-if="authStore.isAuthenticated == false"
    class="flex flex-col gap-4 items-center min-h-[70%] justify-center"
  >
    <img src="/package-icon.png" alt="" class="max-w-[100px]" />
    <h3 class="text-2xl">Корзина пустая</h3>
    <p class="text-slate-500">
     <NuxtLink to="/profile-user" @click="sneakerStore.show = !sneakerStore.show" class="text-[#7747ff]"> Войдите </NuxtLink> или <NuxtLink to="/sign-up" @click="sneakerStore.show = !sneakerStore.show" class="text-[#7747ff]">зарегистрируйтесь</NuxtLink> чтобы добавлять товары в корзину
    </p>
  </div>
</template>

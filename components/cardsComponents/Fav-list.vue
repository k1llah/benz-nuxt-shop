<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import card from '@/components/cardsComponents/card.vue';
import { useCartStore } from '@/stores/addToCart';
import { useFavoritesStore } from '@/stores/favorites';
import { useAuthStore } from '@/stores/authData';
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
let deleteFromCart = ref()
let addToCart = ref()
if(authStore.isAuthenticated == true){
  addToCart.value = cartStore.onCartAdd
  deleteFromCart.value = cartStore.onDeleteItem
}
else if(authStore.isAuthenticated == false){
  console.log('you must need to log in or register')
}
interface Item {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isAdded: boolean;
  isFavorite: boolean;
}
const props = defineProps({
  items: Array<Item>
});

const showOverlay = ref(false)
const onFavoriteRemove = async (sneakerId: number, item:Item) => {
  try {
    const postData = await axios.post(
      "http://localhost:3001/api/remove-from-favorites",
      {
        userId: localStorage.getItem("id"),
        sneakerId: sneakerId,
      }
    );
		item.isFavorite = false
    favoritesStore.items = favoritesStore.items.filter((el:any) => el.id != sneakerId)
    showOverlay.value = true;
    setTimeout(() => {
      showOverlay.value = false;
    }, 150);
    
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
<div v-if="items">
	<div class="all grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5" v-auto-animate>
  <template 
  v-for="item in items"
      :key="item.id"
      v-auto-animate >
  <card 
      v-if="item.isFavorite"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :on-click-add="() => cartStore.onCartAdd(item.id, item, item.price)"
      :on-favorite-delete=" () => onFavoriteRemove(item.id, item)"
      :onclck-delete="() => deleteFromCart(item.id, item, item.price)"
      
    />
  </template>
    </div>
</div>
</template>
<style scoped>
@media (max-width: 640px) {
  .all{
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 430px) {
  .all{
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
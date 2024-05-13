<script setup script lang="ts">
import Card from "./card.vue";
import axios from "axios";
import { ref, } from "vue";
import { useRouter } from 'vue-router'; 
import { useAllStore } from '@/stores/all';
import Overlay from '@/components/cardsComponents/overlay.vue';
import { useCartStore } from '@/stores/addToCart';
import { useAuthStore } from '@/stores/authData';
import { useFavoritesStore } from '@/stores/favorites';
import CartItem from '../DrawerComponents/CartItem.vue'
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
let addToCart = ref()
let deleteFromCart = ref()
if(authStore.isAuthenticated == true){
  addToCart.value = cartStore.onCartAdd
  deleteFromCart.value = cartStore.onDeleteItem
}
else if(authStore.isAuthenticated == false){
  console.log('you must need to log in or register')
}

const router = useRouter(); 
interface Item {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isAdded: boolean;
  isFavorite: boolean;
  
}

defineProps({
  // Указываем, что items является массивом объектов типа Item
  items: Array<Item>,
});
const allStore = useAllStore()
let paramsId;
const onClickOnCard = async (sneakerId: number) => {
  router.push(`/description`);
  paramsId = sneakerId
  localStorage.setItem('sneakerId', paramsId.toString())
};
let showOverlay = ref(false)
const onFavoriteAdd = async (sneakerId: number, item:Item) => {
  try {
    const postData = await axios.post(
      "http://localhost:3001/api/add-to-favorites",
      {
        userId: localStorage.getItem("id"),
        sneakerId: sneakerId,
      }
    );
    item.isFavorite = true
    showOverlay.value = true
    setTimeout(() => {
      showOverlay.value = false
    }, 150)
    
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div v-if="items">
    <div class="all grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5" v-auto-animate>
    <card
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image-url="item.imageUrl"
        :price="item.price"
        :is-added="item.isAdded"
        :is-favorite="item.isFavorite"
        :on-click-add="() => addToCart(item.id, item, item.price)"
        :on-favorite-add="() => onFavoriteAdd(item.id, item)"
        :on-favorite-delete=" () => favoritesStore.onFavoriteRemove(item.id, item)"
        :on-click-on-card="() => onClickOnCard(item.id)"
        :onclck-delete="() => deleteFromCart(item.id, item, item.price)"
      />
    </div>
  </div>
  <div v-else>
    <p>Загрузка данных</p>
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
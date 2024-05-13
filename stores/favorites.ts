import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
interface Item {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isAdded: boolean;
  isFavorite: boolean;
}
export const useFavoritesStore = defineStore({
  id: "favorites",
  state: () => ({
    items: [] as Array<Item>,
		isFav: true,
		
  }),
  actions: {
		async favorites(){
			try {
				const { data } = await axios.post(
					"http://localhost:3001/api/favorites-user",
					{
						id: localStorage.getItem("id"),
					}
				);
		
				this.isFav = true;
				this.items = data[0].Favorite;
				this.items.forEach((el:any) => {
					el.isFavorite = true
				})
				
				if(this.items.length == 0){
					this.isFav = false
				}
			} catch (error) {
				console.log(error);
			}
		},
		async onFavoriteRemove (sneakerId: number, item:Item) {
			try {
				const postData = await axios.post(
					"http://localhost:3001/api/remove-from-favorites",
					{
						userId: localStorage.getItem("id"),
						sneakerId: sneakerId,
					}
				);
				item.isFavorite = false
				this.items = this.items.filter((el:any) => el.id != sneakerId)
			} catch (error) {
				console.log(error);
			}
		}
		

  },
});

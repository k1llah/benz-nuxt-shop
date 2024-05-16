import { defineStore } from "pinia"
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
				const { data } = await useFetch<any>(
					"http://localhost:3001/api/favorites-user",
					{
						method: "POST",
						body: {
							id: useCookie("id"),
						}
					}
				);
		
				this.isFav = true;
				this.items = data.value[0].Favorite;
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
				const postData = await useFetch(
					"http://localhost:3001/api/remove-from-favorites",
					{
						method: "POST",
						body: {
							userId: useCookie("id").value,
							sneakerId: sneakerId,
						}
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

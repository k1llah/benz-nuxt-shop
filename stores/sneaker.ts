import { defineStore } from 'pinia'
import axios from 'axios'

interface Item {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isAdded: boolean;
  isFavorite: boolean;
}

export const useSneaker = defineStore('sneaker', {
  state: () => ({
    items: [] as Item[],
    showOverlay: false,
    show:false
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:3001/api/items')
        this.items = response.data
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    async addToFavorites(userId: string, sneakerId: number) {
      try {
        const response = await axios.post('http://localhost:3001/api/add-to-favorites', {
          userId: userId,
          sneakerId: sneakerId,
        })
        // Обновляем состояние элемента, чтобы отразить его в избранном
        const index = this.items.findIndex(item => item.id === sneakerId)
        if (index !== -1) {
          this.items[index].isFavorite = true
        }
        // Показываем оверлей
        this.showOverlay = true
        setTimeout(() => {
          this.showOverlay = false
        }, 150)
      } catch (error) {
        console.error('Error adding to favorites:', error)
      }
    }
  }
})

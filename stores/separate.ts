import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGenderStore = defineStore({
  id: 'gender',
  state: () => ({
    onClickOnGender: ref(''),
    sneakersData: ref({}),
  }),
  actions: {

  },
});

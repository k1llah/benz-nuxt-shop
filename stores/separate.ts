import { defineStore } from 'pinia';
export const useGenderStore = defineStore({
  id: 'gender',
  state: () => ({
    onClickOnGender: ref(''),
    sneakersData: ref({}),
  }),
  actions: {

  },
});

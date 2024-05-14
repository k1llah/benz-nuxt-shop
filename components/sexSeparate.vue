<script setup lang="ts">
import axios from "axios";
const items = ref([])
const genderStore = useGenderStore();
  let params = localStorage.getItem('gender');
	let genderText = ref('');
	if(localStorage.getItem('gender') == 'man'){
		genderText.value = 'Мужская обувь'
	}
	else if(localStorage.getItem('gender') == 'woman'){
		genderText.value = 'Женская обувь'
	}
  async function genderRoute() {
		try{
			if(localStorage.getItem('gender') == 'man' || localStorage.getItem('gender') == 'woman'){
				const {data} = await axios.get(`http://localhost:3001/api/${params}Sneakers`)
				items.value = data
			}

		}
		catch(error){
			console.log(error)
		}
		}

onMounted(() => {
	genderRoute();
});
</script>
<template>
  <div class="flex ml-[50px] mt-5 gap-[15px]">
    <div class="flex gap-5">
      <button
        class="h-[35px] w-[35px] border rounded-[10px] border-[#F2F2F2] flex justify-center items-center text-white hover:bg-slate-600 transition hover:scale-[1.2] disabled:bg-slate-400 cursor-pointer"
        @click="$router.go(-1)"
      >
        <img src="/arrow-right.svg" class="rotate-180" alt="close button" />
      </button>
      <h2 class="text-3xl">{{ genderText }}</h2>
    </div>
  </div>
	<div class="mt-[30px]">
		<CardList :items="items"/>
	</div>
</template>

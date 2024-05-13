<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios'
import { onBeforeMount, ref } from 'vue';
import ideasTemplate from './ideasTemplate.vue';
import { useIsAdmin } from '@/stores/isAdmin';
const isAdmin = useIsAdmin();
const dataIdeas = ref()
const role = ref()
onBeforeMount(() => {
	isAdmin.checkIsAdmin()
	getIdeas()
})

async function getIdeas(){
	try{
		const response = await axios.get('http://localhost:3001/api/get-ideas')
		dataIdeas.value = response.data
	} catch(error){
		console.log(error)
	}
}
async function deleteIdea(id: number){
	try{
		const response = await axios.post('http://localhost:3001/api/delete-idea', {
			id: id
		})
		dataIdeas.value = dataIdeas.value.filter((idea:any) => idea.id !== id);
	} catch(error){
		console.log(error)
	}
}
</script>
<template v-auto-animate>
	<div v-if="dataIdeas" class="flex flex-wrap p-5 gap-5" v-auto-animate>
		<div v-for="idea in dataIdeas" :key="idea.id" v-auto-animate>
			<ideasTemplate
			:email="idea.email"
			:name="idea.name"
			:idea="idea.ideaText"
			:delete-idea="() => deleteIdea(idea.id)"
			v-auto-animate
			/>
		</div>
			
		</div>
</template>
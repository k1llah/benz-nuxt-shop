<script setup lang="ts">
const isAdmin = useIsAdmin();
const dataIdeas = ref()
const role = ref()
onBeforeMount(() => {
	isAdmin.checkIsAdmin()
	getIdeas()
})

async function getIdeas(){
	try{
		const response = await useFetch<any>('http://localhost:3001/api/get-ideas',{method: "GET"})
		dataIdeas.value = response.data
	} catch(error){
		console.log(error)
	}
}
async function deleteIdea(id: number){
	try{
		const response = await useFetch<any>('http://localhost:3001/api/delete-idea', {
			method: "POST",
			body:{
				id: id
			}
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
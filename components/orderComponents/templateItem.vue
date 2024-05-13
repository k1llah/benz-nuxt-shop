<script setup lang="ts">
const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	image: String,
})
</script>
<template>

	<div class="flex gap-4 rounded-3xl shadow-xl p-5 sm:flex-wrap dark:bg-[#4f4f56]">
		<img :src="props.image" alt="Sneaker image" class="max-w-[170px] dark:rounded-lg dark:brightness-[.85]">
		<div class="flex flex-col gap-7">
			<h3 class="text-xl font-light dark:text-ghostWhiteText">{{ props.title }}</h3>
			<h4 class="text-lg font-normal dark:text-slate-300">{{ props.price }} руб.</h4>
		</div>
	</div>


</template>

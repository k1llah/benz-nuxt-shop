
<script setup lang="ts">
const props = defineProps({
	id: Number,
	img: String,
	title: String,
	price: Number,
	count: Number,
	isAdded: Boolean,
	onDelete: Function,
	onMinusCounter: Function,
	onPlusCounter: Function,
})

</script>
<template>
	<div class="w-100% items-center flex border border-slate-100 dark:border-slate-500 dark:bg-transparent p-4 rounded-xl gap-4 md:flex-row sm:flex-col">
		<img class="w-16 h-16 dark:rounded-lg" :src="img" alt="Sneaker">
		<div class="flex flex-col">
			<p class="">{{ title }}</p>
			<div class="flex justify-between mt-2">
				<p>{{ price }} руб.</p>
				<img class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="Close image" @click="onDelete && onDelete(id)">
			</div>
	
		</div>
	</div>
</template>
<script setup lang="ts">
	const props = defineProps({
		id: Number,
		author: String,
		image: String,
		text: String,
		rate: Number || String,
		isModerated: Boolean,
		moderateFunctionSkip: Function,
		moderateFunctionAccept: Function,
		index: Number || String,
		isModeratedFeedback: Boolean,
	})
</script>
<template>
	<div
		class="w-80 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-center gap-5 bg-[#eff6ff] mb-5 dark:bg-mainDark dark:*:text-ghostWhiteText"
	>
		<h2 class="text-xl font-semibold">{{ props.author }}</h2>
		<img
			class="w-full h-40 object-cover rounded-t-lg"
			alt="Card Image"
			v-if="props.image"
			:src="'https://sneaker-server-three.vercel.app/img/tablet/' + props.image"
		/>
		<div class="p-4 bg-[#efefef] rounded-lg dark:bg-slate-800">
			<p class="text-gray-800 text-lg pb-7 dark:text-ghostWhiteText">
				{{ props.text }}
			</p>

			<stars
				:prefix="'feedback'"
				:stats="props.rate"
				:index="props.index"
			/>
		</div>
		<div
			class="flex gap-2"
			v-if="props.isModerated == false"
		>
			<button
				class="rounded-md border-2 border-slate-200 p-2 bg-red-500"
				@click="props.moderateFunctionSkip"
			>
				да пошел он нах
			</button>
			<button
				class="rounded-md border-2 border-slate-200 p-2 bg-green-500"
				@click="props.moderateFunctionAccept"
			>
				Пропустить
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	titleCover: String,
	coverImage: String,
	shortDescription: String,
	hashtags: {
    type: Array,
    required: true
  }
})

</script>
<template>
	<div class="flex flex-col justify-between p-4 cursor-pointer md:min-w-[100%] sm: min-w-full md:max-w-[450px] bg-cover min-h-[350px]"
	:style="{ 'background-image': `url('http://localhost:1337${props.coverImage}')` }"
	>
		<div class="flex max-w-fit gap-3 flex-row flex-wrap">
      <p v-for="(hashtag, index) in hashtags" :key="index" class="text-black text-xs font-medium bg-[#10b981] p-2 rounded-lg hover:bg-[#eab308] transition-all duration-200 hover:transition-all hover:duration-200 dark:text-ghostWhiteText">{{ hashtag }}</p>
    </div>
		<div class="text-white">
		<h1 class="md:text-3xl font-bold sm:text-2xl">{{ props.titleCover }}</h1>
		<p class="md:text-lg font-light sm:text-base">{{ props.shortDescription }}</p>
	</div>
	</div>
</template>
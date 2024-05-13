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
	<div class="flex flex-col gap-2 cursor-pointer min-w-[260px] md:max-w-[320px] sm:max-w-[320px]">
		<img v-if="props.coverImage" :src="'http://localhost:1337' + $props.coverImage" class="w-full h-[100px] sm:max-w-[400px] md:max-w-none min-h-[160px] object-cover" alt="cover post image"> 
		<div class="flex gap-3 flex-row">
      <p v-for="(hashtag, index) in hashtags" :key="index" class="text-[#20bbed] text-[13px] hover:text-red-500 transition-all duration-100 md:pl-0 sm:pl-1 ">{{ hashtag }}</p>
    </div>
		<h1 class="md:text-2xl sm:text-xl font-bold md:pl-0 sm:pl-1 dark:text-ghostWhiteText">{{ props.titleCover }}</h1>
		<p class="md:text-sm font-light md:pl-0 sm:pl-1 sm:text-xs pb-5 dark:text-ghostWhiteText">{{ props.shortDescription }}</p>
	</div>
</template>
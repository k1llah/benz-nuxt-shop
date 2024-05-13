<script setup lang="ts">
const props = defineProps({
	id: Number,
  email: String,
  name: String,
  idea: String,
	deleteIdea: Function,
});
</script>
<template>

  <div class="flex flex-col gap-5 max-w-[310px] p-5 rounded-xl bg-green-100">
    <p class="font-bold text-xs">Email: {{ props.email }}</p>
    <p class="font-light text-base">Имя: {{ props.name }}</p>
    <p class="font-medium text-lg">Идея: {{ props.idea }}</p>
    <button
      class="text-[#914dff] p-2 rounded-lg border-slate-400 border-[1px] max-w-fit md:text-sm sm:text-xs cursor-pointer bg-white bg-opacity-80"
			@click="props.deleteIdea && props.deleteIdea(props.id)"
    >
      Удалить
    </button>
  </div>
</template>

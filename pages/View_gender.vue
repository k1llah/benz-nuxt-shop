	<script setup lang="ts">
	import sexSeparate from '@/components/sexSeparate.vue';
	import { useGenderStore }from '@/stores/separate'
	let genderStore = useGenderStore()
	</script>
<template>
	<sexSeparate/>
</template>
<script setup lang="ts">
import { useOrderStore } from '@/stores/order';
	import addresses from './addresses.vue';
	import formVue from './form.vue';
	import placeAnOrder from './placeAnOrder.vue';
	import renderItem from './renderItem.vue';
	import { watch } from 'vue';
	import itemsFromCartToOrder from './itemsFromCartToOrder.vue';
	const orderStore = useOrderStore();
	// https://3dsec.sberbank.ru/payment/rest/register.do
</script>
<template>
	<div v-if="orderStore.targetPage == 'fast'">
		<div class="md:w-full sm:w-[90%] flex justify-between p-3 items-center lg:flex-row md:flex-col-reverse md:items-center md:gap-5 sm:flex-col-reverse sm:items-center">
	<renderItem/>
	<addresses/>
		</div>
	<div class="w-full flex justify-center gap-10 lg:flex-row md:flex-col-reverse md:items-center sm:flex-col-reverse sm:items-center ">
		<placeAnOrder/>
		<formVue/>
	</div>
</div>
<div v-else-if="orderStore.targetPage == 'classic'">

	<div class="md:w-full sm:w-[90%] flex justify-between p-3 items-center lg:flex-row md:flex-col-reverse md:items-center md:gap-5 sm:flex-col-reverse sm:items-center">
	<itemsFromCartToOrder/>
	<addresses/>
		</div>
	<div class="w-full flex justify-center gap-10 lg:flex-row md:flex-col-reverse md:items-center sm:flex-col-reverse sm:items-center ">
		<placeAnOrder/>
		<formVue/>
	</div>
</div>
</template>
<script setup lang="ts">
	let isAddress = ref(false)
	let address = ref()

	const dataAddress = async () => {
		try {
			const data = await $fetch<any>('http://localhost:3001/api/get-addresses', {
				method: 'POST',
				body: {
					userId: useCookie('id').value,
				},
			})
			address.value = data
			isAddress.value = address.value.length > 0
		} catch (error) {
			console.log(error)
		}
	}

	onBeforeMount(() => {
		dataAddress()
	})
</script>
<template>
	<div class="flex flex-col overflow-scroll">
		<div>
			<h2
				class="md:text-3xl ml-20 mt-8 text-end md:pr-5 sm:pr-0 sm:text-2xl dark:text-ghostWhiteText"
			>
				Мои адреса
			</h2>
		</div>

		<div
			v-if="isAddress"
			class="flex gap-10 ml-20 sm:ml-5 overflow-scroll lg:max-w-[600px] md:max-w-[400px] sm:max-w-[300px] max-h-fit mt-5"
		>
			<addressTemplate
				v-for="item in address"
				:key="item.id"
				:id="item.id"
				:firstName="item.firstName"
				:city="item.city"
				:street="item.street"
				:phoneNumber="item.phoneNumber"
				class="md:min-w-[320px] sm:min-w-[300px]"
			/>
		</div>

		<div
			v-else
			class="max-w-[500px] mt-10 ml-20 sm:ml-10"
		>
			<p class="text-xl dark:text-white">
				К сожалению, у вас нет добавленных адресов, но вы можете добавить свой адрес на странице
				профиля
				<NuxtLink
					to="/profileUser"
					class="text-[#7747ff] dark:text-green-500 cursor-pointer"
					>во вкладке мои адреса
				</NuxtLink>
			</p>
		</div>
	</div>
</template>

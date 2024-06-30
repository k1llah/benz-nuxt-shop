<script setup lang="ts">
	const cartStore = useCartStore()
	const router = useRouter()
	const sneakerStore = useSneaker()
	const authStore = useAuthStore()
	const localRole = ref(useCookie('role').value)
	const colorMode = useColorMode()
	let counter = cartStore.localCounter

	function middleware() {
		if (useCookie('uuid').value) {
			router.push('/profileUser')
		} else {
			router.push('/signIn')
		}
	}
	const reloadPage = () => {
		router.push({
			path: router.currentRoute.value.fullPath,
			force: true,
		})
	}
	const role = ref()
	let timer = ref(false)
	onBeforeMount(() => {
		cartStore.cartDataGet()
		cartStore.localCounter = cartStore.items.length
	})
	async function checkIsAdmin() {
		try {
			const data = await $fetch<any>('http://localhost:3001/api/get-data', {
				method: 'POST',
				body: {
					uuid: useCookie('uuid').value,
					id: useCookie('id').value,
				},
			})
			role.value = data.user.role
			useCookie('role').value = role.value
		} catch (error) {
			console.log(error)
		}
		setTimeout(() => {
			if (role.value === 'ADMIN') {
				router.push('/admin')
			} else {
				reloadPage()
				alert('Еще че придумал? сегодня не твой день салага')
			}
			timer.value = false
		}, 3000)
		timer.value = true
	}

	watch(
		() => counter,
		(newValue: any) => {
			counter = newValue
		},
	)
	watch(
		() => authStore.role,
		(newValue) => {
			localRole.value = newValue
		},
	)
	let toggleShow = () => {
		sneakerStore.show = !sneakerStore.show
	}
	onBeforeMount(() => {
		if (authStore.uuidLocal !== '') {
			cartStore.cartDataGet()
		}
	})
</script>
<template>
	<div>
		<header
			class="hidden justify-between border-b border-slate-200 p-5 responsive"
			id="header"
		>
			<burger />
		</header>

		<header
			class="hidden justify-between border-b border-slate-200 px-8 py-8 dark:text-ghostWhiteText head"
			id="header"
		>
			<div
				class=""
				id="header"
			>
				<div class="flex items-center md:gap-5 lg:gap-4">
					<NuxtLink to="/">
						<img
							v-if="$colorMode.preference == 'light'"
							src="/logo_3.jpeg"
							alt="Logo"
							class="w-16"
						/>
						<img
							v-else-if="$colorMode.preference == 'dark'"
							src="/footer-logo.jpeg"
							alt="Logo"
							class="w-16 rounded-[50%]"
						/>
					</NuxtLink>
					<h2 class="font-medium uppercase lg:text-xl md:text-base hidden sm:text-base">
						Benz Shöp
					</h2>
					<NuxtLink to="/sneakers-page">
						<p
							class="text-slate-700 hover:scale-[1.05] transition-all 1.3s lg:text-lg md:text-lg sm:text-sm dark:text-ghostWhiteText"
						>
							Все кроссовки
						</p>
					</NuxtLink>
					<div>
						<switchModeButton />
					</div>
				</div>
			</div>
			<ul class="flex items-center gap-10 md:gap-5">
				<li
					class="flex items-center gap-3 text-grey-500 hover:text-black dark:hover:text-yellow-500 cursor-pointer hover:scale-[1.05] transition-all 1.3s"
					@click="toggleShow()"
					v-if="localRole !== 'ADMIN'"
				>
					<img
						src="/cart.svg"
						alt="Cart"
					/>
					<p
						class="text-[13px] font-[500] mt-[-22px] ml-[-13px] rounded-[50%] bg-gray-300 block w-[20px] h-[20px] text-center dark:text-black"
						v-html="cartStore.localCounter"
					></p>
				</li>
				<li
					class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s dark:hover:text-[#ff0]"
					@click="$router.push('/favorites')"
				>
					<img
						src="/heart.svg"
						alt="Cart"
					/>
					<span class="text-[19px] font-light md:text-[14px]">Закладки</span>
				</li>
				<li
					class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s dark:hover:text-[#ff0]"
					@click="$router.push('/all-posts')"
				>
					<img
						src="/newspaper.png"
						alt="Cart"
						class="max-w-[25px]"
					/>
					<span class="text-[19px] font-light md:text-[14px]">Блог</span>
				</li>
				<li
					class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s dark:hover:text-[#ff0]"
					@click="middleware()"
				>
					<img
						src="/profile.svg"
						alt="Cart"
					/>
					<span class="text-[19px] font-light md:text-[14px]">Профиль</span>
				</li>
				<li
					v-if="localRole === 'ADMIN'"
					class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s dark:hover:text-[#ff0]"
					@click="checkIsAdmin()"
				>
					<span class="text-[19px] font-light md:text-[14px]">Админка</span>

					<svg
						viewBox="25 25 50 50"
						v-if="timer"
					>
						<circle
							r="20"
							cy="50"
							cx="50"
						></circle>
					</svg>
				</li>
			</ul>
		</header>
	</div>
</template>
<style scoped>
	svg {
		width: 1.7em;
		transform-origin: center;
		animation: rotate4 2s linear infinite;
	}

	circle {
		fill: none;
		stroke: hsl(214, 97%, 59%);
		stroke-width: 2;
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: dash4 1.5s ease-in-out infinite;
	}

	@keyframes rotate4 {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash4 {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}

		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35px;
		}

		100% {
			stroke-dashoffset: -125px;
		}
	}
	@media (min-width: 815px) {
		.head {
			display: flex;
		}
	}
	@media (max-width: 815px) {
		.responsive {
			display: flex;
		}
	}
</style>

<script setup lang="ts">
	const blog = useBlog()
	let email = ref('')
	let ideaText = ref('')
	let name = ref('')
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/
	let warningIdea = ref('')
	let warningEmail = ref('')
	let warningName = ref('')
	let warningAll = ref('')
	async function submit() {
		event?.preventDefault()
		try {
			const isEmailValid = emailRegex.test(email.value)
			if (
				email.value.length > 2 &&
				isEmailValid &&
				ideaText.value.length > 5 &&
				ideaText.value.length < 700 &&
				name.value.length >= 2
			) {
				const submit = await $fetch<any>('https://sneaker-server-three.vercel.app/api/post-idea', {
					method: 'POST',
					body: {
						name: name.value,
						email: email.value,
						ideaText: ideaText.value,
					},
				})

				blog.isOpenedModalFeedback = true
			} else if (!isEmailValid && ideaText.value.length < 5 && name.value.length < 2) {
				setTimeout(() => {
					warningAll.value = ''
				}, 2500)

				warningAll.value = 'Заполните все обязательные поля* или заполните их корректно'
			} else if (!isEmailValid) {
				setTimeout(() => {
					warningEmail.value = ''
				}, 1500)

				warningEmail.value = 'Введите корректный email'
			} else if (name.value.length < 2 || name.value == '') {
				setTimeout(() => {
					warningName.value = ''
				}, 3000)
				warningName.value = 'Имя должно содержать минимум два символа'
			} else if (ideaText.value.length < 5 || ideaText.value == '') {
				setTimeout(() => {
					warningIdea.value = ''
				}, 3000)
				warningIdea.value = 'Текст идеи должен быть больше 5 символов'
			} else if (ideaText.value.length > 700) {
				setTimeout(() => {
					warningIdea.value = ''
				}, 3000)
				warningIdea.value = 'Текст идеи должен быть меньше 700 символов'
			}
		} catch (error) {
			console.log(error)
		}
	}
	onBeforeRouteLeave((to: any, from: any, next: any) => {
		blog.isOpenedModal = false
		blog.isOpenedModalFeedback = false
		blog.unlock()
		next()
	})
</script>
<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
	<div
		class="mx-auto max-w-lg px-4 pb-14 pt-5 sm:px-6 lg:px-8 z-20 relative bg-slate-100 rounded-xl bottom-[600px] dark:bg-mainDark"
		id="modal"
	>
		<div
			class="flex justify-end w-full cursor-pointer"
			@click=";(blog.isOpenedModal = false), blog.unlock()"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="max-w-6 dark:fill-white"
				viewBox="0 0 384 512"
			>
				<path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/>
			</svg>
		</div>
		<div class="mx-auto max-w-lg text-center mt-10">
			<h1 class="text-2xl font-bold sm:text-3xl dark:text-ghostWhiteText">Напишите свою идею</h1>
			<p class="mt-4 text-gray-600 dark:text-gray-300">
				мы обязательно рассмотрим ваше предложение и постараемся сделать статью на эту тему!!
			</p>
		</div>

		<form class="mx-auto mb-0 mt-8 max-w-md space-y-4">
			<div class="flex flex-col gap-1">
				<label
					class="sr-only"
					for="email"
					>Email
				</label>
				<div class="relative">
					<input
						placeholder="Введите свой email *"
						class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:bg-transparent dark:border-[1px] dark:border-green-600 dark:text-ghostWhiteText"
						id="email"
						type="email"
						v-model="email"
					/>
					<span class="absolute inset-y-0 end-0 grid place-content-center px-4">
						<svg
							stroke="currentColor"
							viewBox="0 0 24 24"
							fill="none"
							class="h-6 w-6 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
								stroke-width="2"
								stroke-linejoin="round"
								stroke-linecap="round"
							></path>
						</svg>
					</span>
				</div>
				<transition name="fade">
					<p
						v-if="warningEmail"
						class="text-red-500 text-xs p-[1px] ml-2"
						:class="{ 'fade-in': warningEmail }"
					>
						{{ warningEmail }}
					</p>
				</transition>
			</div>

			<div class="flex flex-col gap-1">
				<label
					class="sr-only"
					for="name"
					>Имя</label
				>
				<div class="relative">
					<input
						placeholder="Введите свое имя *"
						class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:bg-transparent dark:border-[1px] dark:border-green-600 dark:text-ghostWhiteText"
						id="name"
						type="text"
						v-model="name"
					/>
				</div>

				<p
					class="text-red-500 text-xs p-[1px] ml-2"
					:class="{ 'fade-in': warningName }"
				>
					{{ warningName }}
				</p>
			</div>
			<div class="flex flex-col gap-1">
				<label
					class="sr-only"
					for="message"
					>Message</label
				>
				<div class="relative">
					<input
						placeholder="Введите сообщение *"
						class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent dark:bg-transparent dark:border-[1px] dark:border-green-600 dark:text-ghostWhiteText"
						id="message"
						type="text"
						v-model="ideaText"
					/>
				</div>

				<p
					class="text-red-500 text-xs p-[1px] ml-2"
					:class="{ 'fade-in': warningIdea }"
				>
					{{ warningIdea }}
				</p>

				<button
					class="inline-block rounded-lg max-w-28 bg-purple-600 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5"
					@click="submit()"
				>
					Отправить
				</button>

				<p
					class="text-red-500 text-xs p-[3px]"
					:class="{ 'fade-in': warningAll }"
				>
					{{ warningAll }}
				</p>
			</div>
		</form>
	</div>
	<createdModal v-if="blog.isOpenedModalFeedback" />
</template>
<style scoped>
	.fade-in {
		animation: fadeIn 3s ease forwards;
		transition: all 1.4s linear;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>

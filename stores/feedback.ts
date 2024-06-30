import { defineStore } from 'pinia'
export const useFeedbackStore = defineStore({
	id: 'feedback',
	state: () => ({
		starRating: 0,
		userId: useCookie('id').value,
		message: '',
		imageFeedback: ref(),
		tempFileURL: ref(),
		textWarning: '',
		warningShow: '',
		modalFeedback: false,
		authorName: '',
		feedBackData: [] as any[],
		isModeratedFeedback: false,
	}),
	actions: {
		handleFileUpload(event: Event) {
			const target = event.target as HTMLInputElement
			const files = target.files
			if (files && files.length > 0) {
				let file = files[0]
				this.imageFeedback = file
				const reader = new FileReader()
				reader.onload = () => {
					this.tempFileURL = reader.result
				}
				reader.readAsDataURL(file)
			}
		},
		async createFeedback() {
			event?.preventDefault()
			try {
				const data = await $fetch<any>('http://localhost:3001/api/get-data', {
					method: 'POST',
					body: {
						uuid: useCookie('uuid').value,
						id: useCookie('id').value,
					},
				})

				this.authorName = data.user.first_name
				if (
					this.starRating !== 0 &&
					this.message.length >= 5 &&
					this.userId !== null &&
					this.authorName !== ''
				) {
					const formData = new FormData()
					formData.append('imageFeedback', this.imageFeedback)
					formData.append('userId', this.userId!)
					formData.append('starRating', this.starRating.toString())
					formData.append('messageFeedback', this.message)
					formData.append('authorName', this.authorName)
					formData.append('rating', this.starRating.toString())
					const createFeedback = await $fetch('http://localhost:3001/api/create-feedback', {
						method: 'POST',
						body: formData,
					})
					this.modalFeedback = true
					this.message = ''
					this.imageFeedback = undefined
					this.starRating = 0
					if (this.modalFeedback == true) {
						document.body.style.overflow = 'hidden'
					}
				} else if (this.message == '' && this.starRating == 0) {
					setTimeout(() => {
						this.warningShow = ''
					}, 3000)
					this.warningShow = 'bothEmpty'
					this.textWarning = 'Укажите рейтинг и текст отзыва'
				} else if (this.message.length < 5 && this.starRating !== 0) {
					setTimeout(() => {
						this.warningShow = ''
					}, 3000)
					this.warningShow = 'messageEmpty'
					this.textWarning = 'Оставьте отзыв состоящий минимум из 5 символов'
				} else if (this.starRating == 0 && this.message.length > 5) {
					setTimeout(() => {
						this.warningShow = ''
					}, 3000)
					this.warningShow = 'ratingEmpty'
					this.textWarning = 'Укажите минимум одну звезду'
				}
			} catch (error) {
				console.log(error)
				throw new Error()
			}
		},
		scrollBlock() {
			document.body.style.overflow = 'visible'
		},
		async getFeedbacksToModerate() {
			try {
				const dataFeedback = await $fetch<any>('http://localhost:3001/api/get-feedback-to-moderate')
				{
					method: 'GET'
				}
				this.feedBackData = dataFeedback
				if (this.isModeratedFeedback == false) {
					this.feedBackData.forEach((el: any) => {
						el.isModeratedFeedback = false
					})
				}
			} catch (error) {
				console.log(error)
			}
		},
		async getFeedbacks() {
			try {
				const dataFeedback = await $fetch<any>('http://localhost:3001/api/get-feedback', {
					method: 'GET',
				})
				this.feedBackData = dataFeedback
			} catch (error) {
				console.log(error)
			}
		},
		async moderateFeedback(id: number) {
			try {
				const dataFeedback = await $fetch('http://localhost:3001/api/moderate-feedback', {
					method: 'POST',
					body: {
						id: id,
					},
				})
				this.isModeratedFeedback = true
				this.feedBackData = this.feedBackData.filter((feedback) => feedback.id !== id)
			} catch (error) {
				console.log(error)
			}
		},
		async feedbackDelete(id: number) {
			try {
				const dataFeedback = await $fetch('http://localhost:3001/api/delete-feedback', {
					method: 'POST',
					body: {
						id: id,
					},
				})
				this.isModeratedFeedback = true
				this.feedBackData = this.feedBackData.filter((feedback) => feedback.id !== id)
			} catch (error) {
				console.log(error)
			}
		},
	},
})

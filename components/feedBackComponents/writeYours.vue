<script setup lang="ts">
import stars from "./stars.vue";
import { useFeedbackStore } from "@/stores/feedback";
const feedbackStore = useFeedbackStore();
</script>
<template>
  <div class="flex justify-center md:mt-16 sm:mt-2 pb-4">
    <div class="form-container md:w-[400px] sm:w-full">
      <form class="form">
        <div class="flex gap-5">
          <p class="md:text-lg sm:text-base">Загрузить фото для отзыва</p>
          <label for="upload-button" class="cursor-pointer">
            <div
              class="bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
            >
              <svg
                class="md:w-4 md:h-4 sm:w-3 sm:h-3"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </div>
            <input
              id="upload-button"
              type="file"
              class="hidden"
              accept="image/*"
              @change="feedbackStore.handleFileUpload"
            />
          </label>
        </div>

        <div class="form-group">
          <label for="textarea">Комментарий</label>
          <textarea
            cols="50"
            rows="10"
            id="textarea"
            v-model="feedbackStore.message"
            name="textarea"
          >
          </textarea>
          <div v-if="feedbackStore.warningShow == 'messageEmpty'">
            <h4 class="text-red-500 text-sm font-extralight p-1">
              {{ feedbackStore.textWarning }}
            </h4>
          </div>
        </div>

        <stars :prefix="'rating'"/>
        <div v-if="feedbackStore.warningShow == 'ratingEmpty'">
          <h4 class="text-red-500 text-sm font-extralight p-[1px] text-end">
            {{ feedbackStore.textWarning }}
          </h4>
        </div>
        <div v-if="feedbackStore.warningShow == 'bothEmpty'">
          <h4 class="text-red-500 text-sm font-extralight p-1">
            {{ feedbackStore.textWarning }}
          </h4>
        </div>
        <button class="form-submit-btn" @click="feedbackStore.createFeedback">
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.form-container {
  background:
    linear-gradient(#212121, #212121) padding-box,
    linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  background-size: 200% 100%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.form-container button:active {
  scale: 0.95;
}

.form-container .form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
  color: #717171;
  font-weight: 600;
  font-size: 12px;
}

.form-container .form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid #414141;
}

.form-container .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  color: #fff;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-group textarea:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-submit-btn {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;
}

.form-container .form-submit-btn:hover {
  background-color: #fff;
  border-color: #fff;
}
</style>

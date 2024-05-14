<script setup lang="ts">
let allStore = useAllStore();
const feedbackStore = useFeedbackStore();
onBeforeMount(() => {
  feedbackStore.getFeedbacks();
});
</script>
<template>
  <div
    class="flex md:mt-0 md:p-0 flex-wrap md:pr-10 justify-between items-baseline gap-5 p-3 sm:p-5 sm:mt-5"
  >
    <div class="flex md:ml-[50px] sm:ml-[20px] gap-[15px]">
      <div
        class="flex gap-5 items-center mt-5 bg-white bg-opacity-90 dark:bg-opacity-20 p-3 rounded-2xl"
      >
        <buttonBack />
        <h2 class="text-3xl">Отзывы</h2>
      </div>
    </div>

    <button
      class="cssbuttons-io-button"
      @click="(allStore.isOpenedFeedBack = true), allStore.block()"
    >
      Оставить отзыв
      <div class="icon">
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  </div>
  <div class="flex md:mt-12 container-bg md:p-10 sm:p-0 sm:mt-2 h-full">
    <div
      v-if="feedbackStore.feedBackData"
      class="flex flex-wrap gap-5 justify-center items-center"
    >
      <div v-for="feedback in feedbackStore.feedBackData" :key="feedback.id">
        <templateFeedBack
          v-if="feedback.rating != 0"
          :author="feedback.authorName"
          :image="feedback.imageFeedback"
          :text="feedback.messageFeedback"
          :rate="feedback.rating"
          :is-moderated="feedback.isModerated"
          :index="feedback.id"
        />
      </div>
    </div>
  </div>
  <div v-if="allStore.isOpenedFeedBack == true">
    <modalFeedback />
    <successCreatedModal v-if="feedbackStore.modalFeedback" />
  </div>
</template>

<style scoped>
.cssbuttons-io-button {
  background: black;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #714da6;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  right: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: black;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.95);
}
</style>

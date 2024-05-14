<script setup lang="ts">
const isAdmin = useIsAdmin();
const feedbackStore = useFeedbackStore();
onMounted(() => {
  isAdmin.checkIsAdmin();
  feedbackStore.getFeedbacksToModerate();
});
</script>

<template>
  <div class="text-2xl m-5 ml-10 flex items-center gap-5">
    <buttonBack />
    <h1>Модерация отзывов</h1>
  </div>
  <div
    v-if="feedbackStore.feedBackData"
    class="flex flex-wrap gap-10 justify-center mt-14"
  >
    <div v-for="feedback in feedbackStore.feedBackData" :key="feedback.id">
      <templateFeedback
        v-if="
          feedback.rating != 0 ||
          (feedback.rating != null && feedback.isModeratedFeedback !== true)
        "
        :author="feedback.authorName"
        :image="feedback.imageFeedback"
        :text="feedback.messageFeedback"
        :rate="feedback.rating"
        :is-moderated="feedback.isModerated"
        :index="feedback.id"
        :is-moderated-feedback="feedback.isModeratedFeedback"
        :moderate-function-accept="
          () => feedbackStore.moderateFeedback(feedback.id)
        "
        :moderate-function-skip="
          () => feedbackStore.feedbackDelete(feedback.id)
        "
      />
    </div>
  </div>
</template>

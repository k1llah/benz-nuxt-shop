<script setup lang="ts">
import gsap from "gsap";
const content = ref();
const isVisible = ref(false);
const { title, paragraph1, paragraph2, subtitle } = {
  title: ref(null),
  paragraph1: ref(null),
  paragraph2: ref(null),
  subtitle: ref(null),
};
onMounted(() => {
  watchEffect(() => {
    if (isVisible.value) {
      animateText();
    }
  });

  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const contentPosition = content.value.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.8;

  if (contentPosition < screenPosition) {
    isVisible.value = true;
    window.removeEventListener("scroll", handleScroll);
  }
};

const animateText = () => {
  gsap.from(title.value, {
    opacity: 0,
    y: -400,
    duration: 1.2,
    ease: "expo.out",
  });

  gsap.from(paragraph1.value, {
    opacity: 0,
    x: -400,
    duration: 1.2,
    ease: "expo.out",
  });

  gsap.from(paragraph2.value, {
    opacity: 0,
    x: 400,
    duration: 1.2,
    ease: "expo.out",
  });

  gsap.from(subtitle.value, {
    opacity: 0,
    y: 700,
    duration: 1.2,
    ease: "expo.out",
  });
};
onUnmounted(() => {
  removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div
    class="text-center mt-28 p-10 pb-28 dark:bg-[#3f3f46] dark:text-ghostWhiteText"
    ref="content"
  >
    <h2
      ref="title"
      class="md:text-4xl sm:text-xl dark:text-ghostWhiteText"
      :class="{ 'hidden-text': !isVisible }"
    >
      Добро пожаловать в мир стильных и комфортных кроссовок!
    </h2>
    <p
      ref="paragraph1"
      class="text-left font-[500] md:text-2xl md:leading-[40px] md:mt-24 sm:text-base sm:leading-[33px] sm:mt-12"
      :class="{ 'hidden-text': !isVisible }"
    >
      Исследуйте мир кроссовок вместе с нами! Мы предлагаем широкий выбор
      моделей от ведущих брендов, обеспечивая высочайшее качество и комфорт
    </p>
    <p
      ref="paragraph2"
      class="text-right md:text-2xl font-[300] md:leading-[40px] md:mt-24 sm:text-base sm:leading-[33px] sm:mt-12"
      :class="{ 'hidden-text': !isVisible }"
    >
      Опыт покупки, которому вы можете доверять! Наша цель — не просто продать
      кроссовки, а еще и создать для вас незабываемый опыт покупок. Наш дружелюбный и
      профессиональный персонал всегда готов помочь вам выбрать идеальную пару
      кроссовок и ответить на все ваши вопросы.
    </p>
    <h3
      ref="subtitle"
      class="text-2xl mt-10"
      :class="{ 'hidden-text': !isVisible }"
    >
      Погрузитесь в
      <NuxtLink to="/sneakers-page" class="cursor-pointer">
        <span class="text-[#7747ff] dark:text-[#10b981]">мир кроссовок </span>
      </NuxtLink>
      с нами!
    </h3>
  </div>

  <img
    src="/4-Collins-x-Air-Max.gif"
    class="sm:h-[250px] sm:m-auto md:h-[unset]"
    alt="AirMax 95"
  />

  <scrollComponent />
</template>

<style>
.hidden-text {
  opacity: 0;
}
</style>

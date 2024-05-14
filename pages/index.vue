<script setup lang="ts">
import Swiper from "swiper";
import "swiper/css";
let mySwiper;
const swiperContainer = ref<HTMLElement | null>(null);
onMounted(() => {
  if (swiperContainer.value) {
    mySwiper = new Swiper(swiperContainer.value, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      autoplay: {
        delay: 3000,
      },
    });
  }
});
</script>
<template>
  <div class="">
    <div class="flex md:ml-[50px] sm:ml-[20px] mt-5 gap-[15px] justify-between items-center">
      <div class="flex md:gap-5 sm:gap-2 items-center">
      <buttonBack/>
        <h2 class="md:text-3xl sm:text-2xl font-extralight dark:text-ghostWhiteText">Главная</h2>
      </div>
    </div>
    <h1 class=" md:text-3xl sm:text-xl text-[#000000] text-center font-sans font-[600] mt-10 dark:text-ghostWhiteText">
      Приветствуем вас в BENZ SHÖP
    </h1>
    <sliderMain />
    <div class="bg-[#f8f8ff]">
    <scrollText />
    <MainVerticalSlider />
    <brands/>
    <genderSeparation/>
    <sneakerBlog/>
    <shipping/>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
const items = ref([
  { id: 1, imageUrl: "/verticalSlides/converse-img.jpeg" },
  { id: 2, imageUrl: "/verticalSlides/jordan-5-img.jpeg" },
  { id: 3, imageUrl: "/verticalSlides/off-w-img.jpeg" },
  { id: 4, imageUrl: "/verticalSlides/Vans Knu Skool illustration history.jpeg" },
  { id: 5, imageUrl: "/verticalSlides/jordan1.jpg" },
  { id: 6, imageUrl: "/verticalSlides/force.jpg" },
  { id: 7, imageUrl: "/verticalSlides/POSTERS DESIGN.jpeg" },
  { id: 8, imageUrl: "/verticalSlides/high1J.jpg" },
  // Добавьте свои изображения и другой контент слайдера
]);
const modules = [Pagination, Navigation, EffectFade, Autoplay];
const colorTheme = useColorMode();
</script>


<template>
  <div class="bg min-h-[600px] flex justify-around flex-wrap" :class="{'darkBg': $colorMode.preference === 'dark'}">
    <div class="bg-white mt-14 w-96 h-[400px] rounded-lg md:ml-0 lg:ml-20 sm:h-[450px] dark:bg-[#15001f]">
      <div class="flex p-3 gap-1">
        <div class="">
      <span class="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
    </div>
    <div class="circle">
      <span class="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
    </div>
    <div class="circle">
      <span class="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
    </div>
  </div>
  <div class="card__content p-6 pt-0">
		<p class=" sm:text-[15px] leading-[23px] md:leading-[26px] dark:text-ghostWhiteText">Почувствуй легкость и комфорт на каждом шагу. С нашей обувью ты готов к новым приключениям, новым достижениям, новым высотам. Давай сделаем каждый день запоминающимся, каждый момент активным и ярким. Доверь свои шаги нам, и мы сделаем их незабываемыми. <br> <span class="text-[#7747ff] font-[600]  pt-2 sm:text-[16px] md:text-[19px]">Приглашаем вас </span> исследовать наш ассортимент и открыть для себя свои новые любимые пары обуви. Наша цель - помочь вам шагать вперед с уверенностью и стилем, подчеркивая вашу индивидуальность на каждом шагу.</p>
  </div>
</div>
<div class="slider_wrapper md:mt-20 lg:mt-40 sm:mt-20 sm:pb-10">
	<swiper
        class="w-full max-h-[600px] sm:w-[90%] sm:max-h-[450px] md:w-full md:max-h-[600px]"
        :modules="modules"
        direction="vertical"
        :loop="true"
        :space-between="30"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide class="h-full" v-for="item in items" :key="item.id">
          <img :src="item.imageUrl" alt="Slide Image" class="object-center w-[350px] rounded-2xl m-auto cursor-pointer sm:h-[450px] md:h-[550px]" />
        </swiper-slide>
      </swiper>
</div>
</div>
</template>
<style scoped>

.bg {
  width: 100%;
  height: 100%;
  /* Add your background pattern here */
  --sz: 15px;
  --c0: #000;
  --c1: #c71175;
  --ts: 50% / calc(var(--sz) * 8) calc(var(--sz) * 16);
  overflow: hidden;
  --dot: var(--c1) 0 calc(var(--sz) * 0.78),
    #fff0 calc(calc(var(--sz) * 0.78) + 1px) 100%;
  --dot2: radial-gradient(circle at 90% 0%, var(--dot)) var(--ts),
    radial-gradient(circle at 65% 0%, var(--dot)) var(--ts),
    radial-gradient(circle at 40% 0%, var(--dot)) var(--ts),
    radial-gradient(circle at 15% 0%, var(--dot)) var(--ts);
  --cg1: conic-gradient(from -90deg at 5% 51%, var(--c0) 0 90deg, #fff0 0 100%)
    var(--ts);
  --cg2: conic-gradient(from -90deg at 25% 50%, var(--c1) 0 90deg, #fff0 0 100%)
    var(--ts);
  --cg3: conic-gradient(
      from -90deg at 30% 38.5%,
      var(--c0) 0 90deg,
      #fff0 0 100%
    )
    var(--ts);
  --cg4: conic-gradient(
      from -90deg at 50% 37.5%,
      var(--c1) 0 90deg,
      #fff0 0 100%
    )
    var(--ts);
  --cg5: conic-gradient(from -90deg at 55% 26%, var(--c0) 0 90deg, #fff0 0 100%)
    var(--ts);
  --cg6: conic-gradient(from -90deg at 75% 25%, var(--c1) 0 90deg, #fff0 0 100%)
    var(--ts);
  --cg7: conic-gradient(
      from -90deg at 80% 13.5%,
      var(--c0) 0 90deg,
      #fff0 0 100%
    )
    var(--ts);
  --cg8: conic-gradient(
      from -90deg at 100% 12.5%,
      var(--c1) 0 90deg,
      #fff0 0 100%
    )
    var(--ts);

  background: var(--dot2), var(--dot2),
    radial-gradient(circle at 90% 100%, var(--dot)) var(--ts),
    radial-gradient(circle at 65% 100%, var(--dot)) var(--ts),
    radial-gradient(circle at 40% 100%, var(--dot)) var(--ts),
    radial-gradient(circle at 15% 100%, var(--dot)) var(--ts),
    radial-gradient(circle at 90% 12.5%, var(--dot)) var(--ts),
    radial-gradient(circle at 65% 25%, var(--dot)) var(--ts),
    radial-gradient(circle at 40% 37.5%, var(--dot)) var(--ts),
    radial-gradient(circle at 15% 50%, var(--dot)) var(--ts), var(--cg1),
    var(--cg1), var(--cg2), var(--cg2), var(--cg3), var(--cg3), var(--cg4),
    var(--cg4), var(--cg5), var(--cg5), var(--cg6), var(--cg6), var(--cg7),
    var(--cg7), var(--cg8), var(--cg8),
    linear-gradient(-45deg, #fff0 0 32.25%, #0002 50%, #000 77.5%) var(--ts),
    linear-gradient(-45deg, #fff0 0 32.25%, #000 60%) var(--ts),
    repeating-linear-gradient(90deg, var(--c0) 0 5%, var(--c1) 0 25%) var(--ts);

}
.darkBg {
  /* Basic dimensions and centering */
  width: 100%;
  height: 100%;
  display: flex;
  
  

  /* Dark mode colors and gradient */
  background: #121212; /* Fallback for browsers that don't support gradients */
  background: linear-gradient(
    135deg,
    #121212 25%,
    #1a1a1a 25%,
    #1a1a1a 50%,
    #121212 50%,
    #121212 75%,
    #1a1a1a 75%,
    #1a1a1a
  );
  background-size: 40px 40px;

  /* Animation */
  animation: move 4s linear infinite;
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

</style>

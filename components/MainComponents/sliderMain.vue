<script lang="ts">
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default defineComponent({
  name: "swiper-example-fade-effect",
  title: "Fade effect",
  url: import.meta.url,

  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const items = ref([
      { id: 1, imageUrl: "/slides/lakeSH.png" },
      { id: 2, imageUrl: "/slides/slider.JPEG" },
      { id: 3, imageUrl: "/slides/off-w-jordan.png" },
      { id: 4, imageUrl: "/Screenshot 2024-05-13 at 8.07.07 PM.png" },
      { id: 5, imageUrl: "/slides/jordan-sl.png" },
      { id: 6, imageUrl: "/slides/off-w-sl.png" },
      { id: 7, imageUrl: "/slides/nike-sl.png" },
      // Добавьте свои изображения и другой контент слайдера
    ]);
    return {
			items,
      modules: [Pagination, Navigation, EffectFade, Autoplay],
    };
  },
});
</script>

<template>
  <swiper
    class="w-full mt-12 z-0"
    :modules="modules"
    :space-between="30"
    :effect="'fade'"
    :navigation="true"
    :pagination="{ clickable: true }"
    :autoplay="{
			delay: 2500,
			disableOnInteraction: false,
		}"
  >
    <swiper-slide class="w-full z-0" v-for="item in items" :key="item.id">
      <img :src="item.imageUrl" alt="Slide Image" class="object-center md:w-[750px] md:h-[380px] sm:w-[350px] sm:h-[200px] z-0 rounded-2xl m-auto" />
    </swiper-slide>
  </swiper>
</template>

<style scoped>
@media screen and (max-width: 645px) {
  .swiper-button-next, .swiper-button-prev{
    display: none;
  }
}
</style>
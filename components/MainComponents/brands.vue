<script setup lang="ts">
import { Pagination, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import gsap from "gsap";
const modules = ref([Pagination, Autoplay, FreeMode]);
const items = ref([
  {
    id: 1,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/d0c/d0cce4e2fba49304d25a39de2a9ef5d6.svg",
			brandName: 'Vans',
  },
  {
    id: 2,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/4f7/4f773befa3ff5485a4e6c2d98c9ef00d.svg",
			brandName: 'TheNorthFace',
  },
  {
    id: 3,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/be7/be79be54f63add76b08e75dc6eedbfa7.svg",
			brandName: 'Nike',
  },
  {
    id: 4,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/3b4/3b4fe7d256fd066693ce400192ab81cc.svg",
			brandName: 'Puma',
  },
  {
    id: 5,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/ea2/ea28052b0d88d010a96b1bc1bc27f3e0.svg",
			brandName: 'Converse',
  },
  {
    id: 6,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/8b0/8b0db0a7d3c2bffa7e7df0c8843aa7f0.svg",
			brandName: 'Reebok',
  },
  {
    id: 7,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/d24/d24e44f9f5ce894b5cfb1289271318c9.svg",
			brandName: 'Adidas',
  },
  {
    id: 8,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/0d9/0d9a80d8726234ca418ef6cde0c523d1.svg",
			brandName: 'Jordan',
  },
  {
    id: 9,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/809/809d5927ce5cca568d98a0b053bf4f79.svg",
			brandName: 'Helly Hansen',
  },
  {
    id: 10,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/3f7/3f7fe697e8a65cdae39c543150e251d8.svg",
			brandName: 'Timberland',
  },
  {
    id: 11,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/189/189b04d3c24a105f24003e9f13ee53db.svg",
			brandName: 'Columbia',
  },
  {
    id: 12,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/a3c/a3cfae237440a133b540ad67792b67eb.svg",
			brandName: 'New balance',
  },
  {
    id: 13,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/b23/b233da50b4b147d98a6dec186f18dda0.svg",
			brandName: 'Dr martens',
  },
  {
    id: 14,
    imageUrl:
      "https://static.street-beat.ru/upload/iblock/a47/a473eb406a0b7e775e27cfbf0ea84865.svg",
			brandName: 'Asics',
  },
]);




const content = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  watchEffect(() => {
    if (isVisible.value) {
      animateText();
    }
  });

  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const contentPosition = content.value?.getBoundingClientRect().top || 0;
  const screenPosition = window.innerHeight / 1.5;

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
    ease: 'expo.out',
  });
};
</script>

<template>
	<div class="w-full dark:bg-mainDark" ref="content">
		<h3 class="text-center sm:text-2xl sm:pt-20 md:text-5xl md:pt-28 dark:text-ghostWhiteText"
		ref="title"
      :class="{ 'hidden-text': !isVisible }"
		>Бренды</h3>
	</div>
  <div class="md:pt-28 sm:pt-12 dark:bg-mainDark">
  <swiper
    class="swiper md:w-[95%] sm:w-full"
    :modules="modules"
    :space-between="10"
    :slides-per-view="4"
		:free-mode="true"
		:autoplay="{
			delay: 2000,
			disableOnInteraction: false,
		}"
  >
    <swiper-slide class="slide  flex flex-col items-center text-center w-[100px] dark:p-5 sm:p-0 dark:pb-28" v-for="item in items" key="item.id">
			<img :src="item.imageUrl" alt="" class="m-auto brightness-0 dark:brightness-[100] md:w-[unset] sm:w-[50px]">
			<p class="brandName pt-5 sm:text-xs dark:text-ghostWhiteText">{{ item.brandName }}</p>
		</swiper-slide>
   
  </swiper>
</div>
</template>

<style  >
.swiper-wrapper{
  align-items: center;
}
</style>
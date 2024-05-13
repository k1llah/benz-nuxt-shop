<script setup lang="ts">
import {
  ref,
  onMounted,
  watchEffect,
  onBeforeUnmount,
  onBeforeMount,
} from "vue";
import gsap from "gsap";
import { marked } from "marked";
import { useAllStore } from "@/stores/all";
import { useBlog } from "@/stores/sneakerBlog";
import { onBeforeRouteUpdate } from "vue-router";
import scrollComponent from "./scrollComponent.vue";
import coverTemplate from "../blogComponents/cover-template.vue";
import firstPostComponent from "../blogComponents/firstPostComponent.vue";
const blogStore = useBlog();
const content = ref();
const allStore = useAllStore();
const isVisible = ref(false);
const { title, span } = {
  title: ref(null),
  span: ref(null),
};
const idPostStorage = parseInt(localStorage.getItem("idPost") || "0", 10);
const handleScroll = () => {
  const contentPosition = content.value.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.6;

  if (contentPosition < screenPosition) {
    isVisible.value = true;
    window.removeEventListener("scroll", handleScroll);
  }
};

const animateText = () => {
  gsap.from(title.value, {
    opacity: 0,
    x: 600,
    duration: 1.1,
    ease: "back.inOut",
  });

  gsap.from(span.value, {
    opacity: 0,
    x: -600,
    duration: 1.1,
    ease: "back.inOut",
  });
};
let idPost = ref();
async function handleGetId(id: number | string) {
  idPost.value = id;
  localStorage.setItem("idPost", idPost.value);
}

onMounted(() => {
  watchEffect(() => {
    if (isVisible.value) {
      animateText();
    }
  });
  blogStore.getStrapiData();
  blogStore.getPostById(idPostStorage);
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="md:pt-40 md:pl-32 sm:pl-20 sm:pt-20 flex items-center border-b-2 border-slate-300 dark:bg-primaryDark"
    ref="content"
  >
    <h2
      class="md:text-[45px] sm:text-[30px] text-center font-[400] text-gradient text-gradient-to-r from-purple-600 via-cyan-400 to-red-500 lol dark:bg-none dark:bg-ghostWhiteText"
      :class="{ 'hidden-text': !isVisible }"
      ref="title"
    >
      Sneaker
    </h2>
    <span
      class="md:text-[45px] sm:text-[30px] text-center font-[400] lol dark:bg-none dark:bg-ghostWhiteText"
      :class="{ 'hidden-text': !isVisible }"
      ref="span"
      >Blog</span
    >
  </div>

  <div class="md:p-5 sm:p-0 dark:bg-primaryDark">
    <div class="flex gap-3 flex-row flex-wrap p-2 pt-5">
      <div
        v-for="(post, index) in blogStore.posts"
        :key="index"
        class="flex gap-2 flex-row flex-wrap"
      >
        <div
          v-for="(hashtag, index) in post.attributes.hashtags.data.slice(0, 10)"
          :key="index"
        >
          <p
            class="text-black text-sm font-medium bg-[#fde68a] p-2 rounded-lg hover:bg-[#eab308] cursor-pointer transition-all duration-200 hover:transition-all hover:duration-200"
          >
            {{ hashtag.attributes.hashtagName }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="blogStore.posts && blogStore.posts.length > 0"
      class="flex w-full flex-row gap-5 flex-wrap md:justify-start sm:justify-center md:mt-5 m-auto dark:bg-primaryDark"
    >
      <div v-for="(post, index) in blogStore.posts" :key="index">
        <router-link
          to="/post_page"
          @click="handleGetId(post.id), blogStore.getPostById(post.id)"
        >
          <firstPostComponent
            v-if="index == 0"
            :titleCover="post.attributes.titleToCover"
            :coverImage="post.attributes.coverImage.data.attributes.url"
            :shortDescription="post.attributes.shortDescriptionCover"
            :hashtags="
              post.attributes.hashtags.data.map(
                (hashtag: any) => hashtag.attributes.hashtagName
              )
            "
            @click.native="handleGetId(post.id)"
          />

          <coverTemplate
            v-else
            :titleCover="post.attributes.titleToCover"
            :coverImage="post.attributes.coverImage.data.attributes.url"
            :shortDescription="post.attributes.shortDescriptionCover"
            :hashtags="
              post.attributes.hashtags.data.map(
                (hashtag: any) => hashtag.attributes.hashtagName
              )
            "
            @click.native="handleGetId(post.id)"
          />
        </router-link>
      </div>
    </div>
    <div v-if="blogStore.posts.length == 0" class="flex justify-center w-full md:p-10 sm:p-7">
    <p class="text-center text-red-500 md:text-3xl sm:text-xl">Произошла ошибка, мы исправимся!</p>
    </div>
  </div>
</template>
<style>
.lol {
  background: #6c6c6c;
  background: linear-gradient(to left, #6c6c6c 10%, #000000 67%, #72736d 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

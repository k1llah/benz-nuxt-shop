<script setup lang="ts">
import { useBlog } from "@/stores/sneakerBlog";
import { onBeforeMount } from "vue";
import { useRouter, onBeforeRouteLeave } from 'vue-router';
const router = useRouter();
import renderData from "../blogComponents/renderData.vue";
import modalPostFeedback from './modalPostFeedback.vue';

const blog = useBlog();
const idPost = parseInt(localStorage.getItem("idPost") || "0", 10);
onBeforeMount(async () => {
  await blog.getPostById(idPost);
});
onBeforeRouteLeave ((to:any, from:any, next:any) => {
  blog.isOpenedModal = false
	blog.isOpenedModalFeedback = false
	blog.unlock()
  next()
})
</script>
<template>
  <div
    class="p-4 overflow-scroll flex justify-between items-center sm:flex-wrap sm:gap-5 md:gap-1"
  >
    <div class="overflow-scroll max-w-[500px]">
      <div
        v-if="blog.infoPost.attributes"
        class="flex gap-1 drop-shadow-md shadow-black max-w-fit p-2"
      >
        <template
          v-for="(hashtag, index) in blog.infoPost.attributes.hashtags.data"
          :key="index"
        >
          <p
            v-if="hashtag.attributes.hashtagName"
            class="text-black text-sm font-medium bg-[#b6d1ffe3] p-[10px] rounded-lg cursor-pointer"
          >
            {{ hashtag.attributes.hashtagName }}
          </p>
        </template>
      </div>
    </div>
    <div>
      <button class="learn-more w-52 h-auto" @click="router.push('/all_posts')">
        <span class="circle" aria-hidden="true">
          <span class="icon arrow"></span>
        </span>
        <span class="button-text dark:text-ghostWhiteText">Поиск постов</span>
      </button>
    </div>
  </div>
  <div
    class="flex gap-10 justify-center p-5 md:flex-nowrap sm:flex-wrap-reverse"
  >
    <div>
      <img
        :src="`http://localhost:1337${blog.infoPost.attributes.coverImage.data.attributes.url}`"
        alt=""
        v-if="blog.infoPost.attributes"
        class="md:max-w-[400px] sm:max-w-[320px]"
      />
    </div>
    <div class="max-w-fit">
      <ul
        v-if="blog.infoPost.attributes"
        class="flex flex-col justify-between border-l-2 border-slate-400 pl-3 text-[#4DD4F5] dark:text-green-500 font-extralight"
      >
        <li
          v-for="(item, index) in blog.infoPost.attributes.postTemplate"
          :key="index"
          class="cursor-pointer pb-[5px]"
        >
          <template v-if="item.__component === 'content.title-of-content'">
            <a :href="`#title-${item.id.toString()}`">
              {{ item.title }}
            </a>
          </template>
        </li>
      </ul>
    </div>
  </div>

  <div v-if="blog.infoPost.attributes">
    <div
      v-for="(item, index) in blog.infoPost.attributes.postTemplate"
      :key="index"
    >
      <renderData
        :title="item.title"
        :div-scroll-id="`title-${item.id.toString()}`"
        :mark-down="item.content"
      />
    </div>
  </div>

  <div class="flex justify-center p-5 border-[6px] border-[#f8f32a] items-center gap-14 flex-wrap sm:flex-col md:flex-row dark:text-ghostWhiteText dark:bg-mainDark">
    <div><img src="/feedbackPost.jpg" class="sm:max-w-[285px] md:max-w-[320px]" alt="" /></div>
    <div class="max-w-[300px] flex flex-col gap-3">
      <h3 class="text-xl font-bold">Не нашел, что искал?</h3>
      <p class="text-base font-light">
        Напиши нам, что было бы интересно узнать, и мы продолжим пополнять нашу
        энциклопедию сникер знаний
      </p>
     <button class="text-[#914dff] p-2 rounded-lg border-slate-400 border-[1px] max-w-fit md:text-sm sm:text-xs cursor-pointer" @click="blog.isOpenedModal = true, blog.block()" >
      <a href="#modal">
        Написать
      </a>
     </button>
    </div>
    <div class="max-w-[300px]">
      <h4>Напишем историю вместе?</h4>
      <p class="text-base font-light">
        Ты любишь кроссовки так же как мы? Присоединяйся к нашей команде и
        вместе мы соберем самую полную энциклопедию развития того, что в наших
        сердцах.
      </p>
    </div>
  </div>
  
    <div class="flex items-center p-5 m-auto justify-end cursor-pointer" @click="router.push('/')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 448 512"
        class="dark:fill-white"
      >
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
      <p class="btn-shine text-lg">Назад на главную</p>
    </div>
  
  <modalPostFeedback v-if="blog.isOpenedModal"/>
</template>
<style scoped>
button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}
button.learn-more .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: #3b82f680;
  border-radius: 1.625rem;
}

button.learn-more .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

button.learn-more .circle .icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625rem;
  width: 1.125rem;
  height: 0.125rem;
  background: none;
}

button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: "";
  top: -0.25rem;
  right: 0.0625rem;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
}

button.learn-more .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.85rem;
  
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}

button:hover .circle {
  width: 100%;
}

button:hover .circle .icon.arrow {
  background: #fff;
  transform: translate(1rem, 0);
}

button:hover .button-text {
  color: #fff;
}

.btn-shine {
  color: #fff;
  background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
  background-position: 0;
  padding: 12px 18px;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  font-family: "Poppins", sans-serif;
}
@-moz-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
@-webkit-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
@-o-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
@keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}

</style>

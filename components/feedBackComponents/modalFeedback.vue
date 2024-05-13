<script setup lang="ts">
import { useAllStore } from "@/stores/all";
import { useRouter } from 'vue-router';
import writeYours from "./writeYours.vue";
import { all } from 'axios'
const allStore = useAllStore();
const router = useRouter()
const beforeRouteLeave = (to:any, from:any, next:any) => {
  allStore.isOpenedFeedBack = false
  allStore.unlock()
  next()
}
router.beforeEach(beforeRouteLeave)
</script>
<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="w-full flex justify-center rounded-lg">
    <div
      class="bg-[#212121] md:w-[600px] md:h-[800px] sm:w-[300px] sm:h-fit fixed  z-20 md:p-10 sm:p-5 md:pb-10 sm:pb-0 m-auto rounded-2xl sm:top-36 md:top-10"
    >
      <div class="flex md:gap-5 items-center md:p-2 sm:gap-1 sm:p-0 rounded-lg">
        <button class="button" @click="allStore.isOpenedFeedBack = false, allStore.unlock()">
          <div class="button-box">
            <span class="button-elem">
              <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
            <span class="button-elem">
              <svg viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
          </div>
        </button>
        <h2 class="md:text-3xl sm:text-lg text-white sm:font-extralight md:font-none md:text-left sm:text-right p-3">Оставить свой отзыв</h2>
      </div>
      <writeYours />
  
    </div>
  </div>
</template>

<style scoped>
	.button {
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0;
  overflow: hidden;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  border: 0;
}

.button:before,
.button:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 5px;
}

.button:before {
  border: 4px solid grey;
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button:after {
  border: 4px solid #60d389;
  transform: scale(1.3);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.button:hover:before,
.button:focus:before {
  opacity: 0;
  transform: scale(0.3);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button:hover:after,
.button:focus:after {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.button-elem {
  display: block;
  width: 18px;
  height: 18px;
  margin: 15px 18px 0 18px;
  transform: rotate(180deg);
  fill: white;
}

.button:hover .button-box,
.button:focus .button-box {
  transition: 0.4s;
  transform: translateX(-56px);
}
@media screen and (max-width: 645px) {
  .button{
    width: 50px;
    height: 50px;
  }
  .button-elem{
    width: 15px;

    margin: 14px 18px 0 17px;
  }
}
</style>
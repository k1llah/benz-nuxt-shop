<script setup script lang="ts">
import { useDark } from "@vueuse/core";
const isDark = useDark();
const props = defineProps({
  id: Number || String,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onFavoriteAdd: Function,
  onFavoriteDelete: Function,
  onClickOnCard: Function,
  onclckDelete: Function,
});
const onFav = props.onFavoriteAdd as (payload: MouseEvent) => void;
const onCard = props.onClickOnCard as (payload: MouseEvent) => void;
const onclck = props.onClickAdd as (payload: MouseEvent) => void;
const onclckDelete = props.onclckDelete as (payload: MouseEvent) => void;
</script>
<template>
  <div
    class="card relative sm:flex sm:flex-col sm:items-center sm:gap-5 md:block bg-white dark:bg-mainDark rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition sm:m-auto pt-5"
    @click="onClickOnCard && onClickOnCard(id)"
  >
    <img
      v-if="!isFavorite && !isDark"
      src="/like-1.svg"
      class="absolute top-8 left-8"
      @click.stop="onFavoriteAdd && onFavoriteAdd(id)"
    />
    <img
      v-if="isFavorite && !isDark"
      src="/like-2.svg"
      class="absolute top-8 left-8"
      @click.stop="onFavoriteDelete && onFavoriteDelete(id)"
    />
    <svg
      v-if="!isFavorite && isDark"
      width="42"
      height="42"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute top-[8%] left-[18%] z-10"
      @click.stop="onFavoriteAdd && onFavoriteAdd(id)"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        fill="none"
        stroke="none"
      />
      <path
        d="M21.8609 11.0746C21.5204 10.7339 21.1161 10.4636 20.6711 10.2793C20.2261 10.0949 19.7492 10 19.2675 10C18.7859 10 18.3089 10.0949 17.864 10.2793C17.419 10.4636 17.0147 10.7339 16.6742 11.0746L15.9675 11.7812L15.2609 11.0746C14.5731 10.3868 13.6402 10.0004 12.6675 10.0004C11.6948 10.0004 10.762 10.3868 10.0742 11.0746C9.3864 11.7623 9 12.6952 9 13.6679C9 14.6406 9.3864 15.5734 10.0742 16.2612L10.7809 16.9679L15.9675 22.1546L21.1542 16.9679L21.8609 16.2612C22.2015 15.9207 22.4718 15.5164 22.6561 15.0715C22.8405 14.6265 22.9354 14.1495 22.9354 13.6679C22.9354 13.1862 22.8405 12.7093 22.6561 12.2643C22.4718 11.8193 22.2015 11.4151 21.8609 11.0746Z"
        stroke="black"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-if="isFavorite && isDark"
      width="42"
      height="42"
      viewBox="0 0 32 32"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute top-[8%] left-[18%] z-10"
      @click.stop="onFavoriteDelete && onFavoriteDelete(id)"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        fill="none"
        stroke="none"
      />
      <path
        d="M21.8609 11.0746C21.5204 10.7339 21.1161 10.4636 20.6711 10.2793C20.2261 10.0949 19.7492 10 19.2675 10C18.7859 10 18.3089 10.0949 17.864 10.2793C17.419 10.4636 17.0147 10.7339 16.6742 11.0746L15.9675 11.7812L15.2609 11.0746C14.5731 10.3868 13.6402 10.0004 12.6675 10.0004C11.6948 10.0004 10.762 10.3868 10.0742 11.0746C9.3864 11.7623 9 12.6952 9 13.6679C9 14.6406 9.3864 15.5734 10.0742 16.2612L10.7809 16.9679L15.9675 22.1546L21.1542 16.9679L21.8609 16.2612C22.2015 15.9207 22.4718 15.5164 22.6561 15.0715C22.8405 14.6265 22.9354 14.1495 22.9354 13.6679C22.9354 13.1862 22.8405 12.7093 22.6561 12.2643C22.4718 11.8193 22.2015 11.4151 21.8609 11.0746Z"
        stroke="none"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <img
      :src="imageUrl"
      class="dark:mt-3 sm:max-w-[80%] md:max-w-[100%] dark:brightness-[.80] dark:rounded-xl"
      alt="Sneaker image"
    />
    <p class="mt-2 dark:text-ghostWhiteText">
      {{ title }}
    </p>
    <div class="flex justify-between mt-5 md:w-full sm:w-[80%]">
      <div class="flex flex-col sm:text-sm">
        <span class="text-slate-400 dark:text-slate-300">Стоимость</span>
        <span class="dark:text-ghostWhiteText">{{ price }} Руб</span>
      </div>

      <svg
        v-if="!isAdded"
        class="w-[28px]"
        @click.stop="onclck"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        fill="gray"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            sketch:type="MSPage"
          >
            <g
              id="Icon-Set-Filled"
              sketch:type="MSLayerGroup"
              transform="translate(-466.000000, -1089.000000)"
              fill="gray"
            >
              <path
                d="M488,1106 L483,1106 L483,1111 C483,1111.55 482.553,1112 482,1112 C481.447,1112 481,1111.55 481,1111 L481,1106 L476,1106 C475.447,1106 475,1105.55 475,1105 C475,1104.45 475.447,1104 476,1104 L481,1104 L481,1099 C481,1098.45 481.447,1098 482,1098 C482.553,1098 483,1098.45 483,1099 L483,1104 L488,1104 C488.553,1104 489,1104.45 489,1105 C489,1105.55 488.553,1106 488,1106 L488,1106 Z M482,1089 C473.163,1089 466,1096.16 466,1105 C466,1113.84 473.163,1121 482,1121 C490.837,1121 498,1113.84 498,1105 C498,1096.16 490.837,1089 482,1089 L482,1089 Z"
                id="plus-circle"
                sketch:type="MSShapeGroup"
              ></path>
            </g>
          </g>
        </g>
      </svg>

      <svg
        viewBox="0 0 64 64"
        v-else-if="isAdded"
        class="w-[38px]"
        @click.stop="onclckDelete"
        xmlns="http://www.w3.org/2000/svg"
        fill="green"
        stroke="white"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <circle cx="32" cy="32" r="24"></circle>
          <polyline points="44 24 28 40 20 32"></polyline>
        </g>
      </svg>

      
    </div>
  </div>
</template>

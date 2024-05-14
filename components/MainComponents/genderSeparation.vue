<script setup lang="ts">
let genderStore = useGenderStore();
let clickValue = ref("");
genderStore.onClickOnGender = clickValue.value;

const setGender = (gender: string) => {
  clickValue.value = gender;
  localStorage.setItem("gender", gender);
};

watch(clickValue, () => {
  genderStore.onClickOnGender = clickValue.value;
  setGender(clickValue.value);
});
</script>
<template>
  <div
    class="flex md:gap-20 sm:gap-0 justify-center md:pt-36 sm:pt-24 flex-wrap dark:bg-primaryDark"
  >
    <router-link to="Gender">
      <div
        class="relative hover:scale-[1.05] transition-all 1.3s"
        @click="setGender('man')"
      >
        <div
          class="absolute inset-0 bg-black opacity-50 z-10 hover:opacity-0 transition-all 1.1s cursor-pointer"
        ></div>
        <div
          class="md:w-[350px] md:h-[450px] sm:w-[320px] sm:h-[370px] flex justify-center bg-cover items-end"
          style="background-image: url(&quot;/Nike.jpeg&quot;)"
        >
          <p
            class="text-center md:text-2xl sm:text-xl font-xl mb-10 text-white z-20"
          >
            Мужская обувь
          </p>
        </div>
      </div>
    </router-link>

    <router-link to="Gender">
      <div
        class="relative hover:scale-[1.05] transition-all 1.3s"
        @click="setGender('woman')"
      >
        <div
          class="absolute inset-0 bg-black opacity-50 z-10 hover:opacity-0 transition-all 1.1s"
        ></div>
        <div
          class="md:w-[350px] md:h-[450px] sm:w-[320px] sm:h-[370px] flex justify-center bg-cover items-end"
          style="background-image: url(&quot;/womansPart.jpeg&quot;)"
        >
          <p
            class="text-center md:text-2xl sm:text-xl font-xl mb-10 text-white z-20"
          >
            Женская обувь
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

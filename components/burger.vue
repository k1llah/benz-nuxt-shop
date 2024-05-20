<script setup lang="ts">
import gsap from "gsap";
import { useDark, useToggle } from '@vueuse/core';
const cartStore = useCartStore();
const localRole = ref(useCookie("role").value);
const isDark = useDark();
const toggleDark = useToggle(isDark);
const role = ref();
let timer = ref(false);
const router = useRouter();
async function checkIsAdmin() {
  try {
    const data = await $fetch<any>("http://localhost:3001/api/get-data", {
      method: "POST",
      body:{
        uuid: useCookie("uuid").value,
        id: useCookie("id").value,
      }
    });
    role.value = data.user.role;
    useCookie("role").value = role.value
  } catch (error) {
    console.log(error);
  }
  setTimeout(() => {
    if (role.value === "ADMIN") {
      router.push("/admin");
    } else {
      location.reload();
      alert("Еще че придумал? сегодня не твой день салага");
    }
    timer.value = false;
  }, 3000);
  timer.value = true;
}
onBeforeMount(() => {
  cartStore.cartDataGet();
  cartStore.localCounter = cartStore.items.length;
});

watch(
  () => cartStore.cartCounter,
  (newValue: any) => {
    cartStore.localCounter = newValue;
  }
);

const sneakerStore = useSneaker();
let toggleShow = () => {
  sneakerStore.show = !sneakerStore.show;
};
const dropdowns = ref<boolean[]>([false]);
const toggleDropdown = (index: number) => {
  dropdowns.value[index] = !dropdowns.value[index];
  const dropdownContent = document.querySelector(".burger") as HTMLDivElement;

  if (dropdownContent) {
    if (dropdowns.value[index]) {
      gsap.to(dropdownContent, {
        maxHeight: "400px",

        duration: 0.7,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownContent, {
        maxHeight: "0px",

        duration: 0.7,
        ease: "power2.out",
      });
    }
  }
};
</script>
<template>
  <div class="w-full overflow-hidden">
    <div class="flex justify-between w-full items-center">
      <div class="flex gap-3">
      <NuxtLink to="/">
        <img v-if="!isDark" src="/logo_3.jpeg" alt="Logo" class="w-16" />
        <img v-else-if="isDark" src="/footer-logo.jpeg" alt="Logo" class="w-16 rounded-[50%]" />
      </NuxtLink>
      <switchModeButton :isDark="!isDark" :changeTheme="toggleDark"/>
    </div>
      <input type="checkbox" id="checkbox" v-model="dropdowns[0]" @click="toggleDropdown(0)" />
      <label for="checkbox" class="toggle">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
      </label>
    </div>

    <div
      class="burger flex justify-center bg-white dark:bg-transparent dark:text-ghostWhiteText"
      :class="{ closed: !dropdowns[0] }"
      style="max-height: 400px; max-height: 0px"
    >
      <ul class="flex items-center gap-10 flex-col w-full md:gap-5 mt-12 ">
        <li class="border-b-2 border-slate-300 dark:border-black w-full flex justify-center pb-2">
          <NuxtLink to="/sneakers-page" @click="toggleDropdown(0)">
            <span class="text-[19px] font-light md:text-[14px]"> Все кроссовки</span>
          </NuxtLink>
        </li>
        <li v-if="localRole != 'ADMIN'"
          class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s border-b-2 w-full justify-center pb-2 dark:border-black"
          @click="toggleShow(), toggleDropdown(0)"
        >
        <img src="/cart.svg" alt="Cart" />
        <p class="text-[13px] font-[500] mt-[-22px] ml-[-13px] rounded-[50%] bg-gray-100 block dark:text-black  w-[20px] h-[20px] text-center" >{{ cartStore.localCounter }}</p>
        <span class="text-[19px] font-light md:text-[14px]">Корзина</span>
      </li>
        <li
          class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s border-b-2 w-full justify-center pb-2 dark:border-black"
          @click="$router.push('/favorites'), toggleDropdown(0)"
        >
          <img src="/heart.svg" alt="Cart" />
          <span class="text-[19px] font-light md:text-[14px]">Закладки</span>
        </li>
        
        <li
          class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s pb-5 border-b-2 dark:border-black w-full justify-center"
          @click="$router.push('/LazyProfileUser'), toggleDropdown(0)"
        >
          <img src="/profile.svg" alt="Cart" />
          <span class="text-[19px] font-light md:text-[14px]">Профиль</span>
        </li>
        <li
        class="flex items-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s dark:border-black"
        @click="$router.push('/all-posts'), toggleDropdown(0)"
      >
        <img src="/newspaper.png" alt="Cart" class="max-w-[25px]"  />
        <span class="text-[19px] font-light md:text-[14px]">Блог</span>
      </li>
        <li
        v-if="localRole === 'ADMIN'"
        class="w-full flex items-center justify-center gap-3 text-grey-500 hover:text-black cursor-pointer hover:scale-[1.05] transition-all 1.3s pb-5 border-b-2 dark:border-black"
        @click="checkIsAdmin()"
      >
        <span class="text-[19px] font-light md:text-[14px]">Админка</span>

        <svg viewBox="25 25 50 50" v-if="timer">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: 0.3s;
}

.bars {
  width: 100%;
  height: 4px;
  background-color: #abcfff;
  border-radius: 5px;
  transition-duration: 0.3s;
}

#checkbox:checked + .toggle .bars {
  margin-left: 13px;
}

#checkbox:checked + .toggle #bar2 {
  transform: rotate(135deg);
  margin-left: 0;
  transform-origin: center;
  transition-duration: 0.3s;
}

#checkbox:checked + .toggle #bar1 {
  transform: rotate(45deg);
  transition-duration: 0.3s;
  transform-origin: left center;
}

#checkbox:checked + .toggle #bar3 {
  transform: rotate(-45deg);
  transition-duration: 0.3s;
  transform-origin: left center;
}
svg {
 width: 1.7em;
 transform-origin: center;
 animation: rotate4 2s linear infinite;
}

circle {
 fill: none;
 stroke: hsl(214, 97%, 59%);
 stroke-width: 2;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}

</style>
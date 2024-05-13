<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import gsap from "gsap";
import { useDark } from "@vueuse/core";
const isDark = useDark();
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
  const screenPosition = window.innerHeight / 1.8;

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
    ease: "bounce.out",
  });
};

const dropdowns = ref<boolean[]>([true, false, false]);

const toggleDropdown = (index: number) => {
  dropdowns.value[index] = !dropdowns.value[index];
  const dropdownContent = document.querySelector(
    `.textBlock${index}`
  ) as HTMLDivElement;

  if (dropdownContent) {
    const storedHeight = dropdownContent.dataset.storedHeight;
    const contentHeight = storedHeight
      ? parseInt(storedHeight)
      : dropdownContent.scrollHeight;

    if (dropdowns.value[index]) {
      if (!storedHeight) {
        dropdownContent.dataset.storedHeight = `${contentHeight}`;
      }
      gsap.to(dropdownContent, {
        maxHeight: "1000px",

        duration: 1.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownContent, {
        maxHeight: "0px",

        duration: 1.4,
        ease: "power2.out",
      });
    }
  }
};
</script>
<template>
  <div
    class="md:pt-36 sm:pt-20 dark:bg-primaryDark dark:text-ghostWhiteText"
    ref="content"
  >
    <h3
      class="text-center sm:text-3xl md:text-5xl"
      ref="title"
      :class="{ 'hidden-text': !isVisible }"
    >
      <span class="text-[#7747ff] dark:text-[#10b981]">Почему</span> мы?🤔
    </h3>
    <div class="wrapper w-full pb-36 sm:pt-20 md:pt-36">
      <div class="dropDownMenus flex justify-center flex-col items-center">
        <div class="sm:w-[320px] md:w-[470px] lg:w-[600px]">
          <div
            class="flex justify-between items-center gap-8 bg-[#e3e3e3] p-2 rounded-t-xl dark:bg-mainDark"
            @click="toggleDropdown(0)"
          >
            <h2 class="sm:text-[18px] sm:ml-2 md:text-[20px] md:ml-5">
              Достоинства низкой стоимости 💸
            </h2>
            <img
            v-if="!isDark"
              class="mr-2 w-8"
              src="/down.png"
              :class="{
                'rotate-[-180deg] transition-all duration-500': dropdowns[0],
                'rotate-0 transition-all duration-500': !dropdowns[0],
              }"
              alt=""
            />
            <svg
            v-if="isDark"
              class="mr-2 w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
              :class="{
                'rotate-[-180deg] transition-all duration-500': dropdowns[0],
                'rotate-0 transition-all duration-500': !dropdowns[0],
              }"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </div>

          <div
            class="textBlock0 flex justify-center bg-white dark:bg-[#171717]"
            :class="{ closed: !dropdowns[0] }"
            style="max-height: 1000px"
          >
            <p
              class="sm:text-[18px] sm:ml-2 md:text-[20px] font-[300] leading-[30px] p-[20px]"
            >
              <span class="font-[700] text-[18px]"
                >Доступность для широкого круга клиентов:</span
              >
              Мы гордимся тем, что предлагаем широкий ассортимент товаров по
              выгодным ценам, чтобы каждая ваша покупка стала не только
              удовольствием, но и разумным решением для вашего бюджета. <br />
              <span class="font-[700]">Экономия денег для клиентов:</span>
              Мы ценим каждого нашего клиента и стремимся делать ваше
              покупательское опыт максимально удобным и приятным. Приходите к
              нам и убедитесь сами в наших выгодных предложениях и дружественном
              сервисе! Экономьте с нами, не жертвуя качеством! Приглашаем вас в
              магазин, где каждая покупка - это шаг к экономии и удовлетворению
              вашего вкуса и потребностей."
            </p>
          </div>
        </div>

        <div class="sm:w-[320px] md:w-[470px] lg:w-[600px]">
          <div
            class="flex justify-between items-center gap-8 bg-[#e3e3e3] p-2 dark:bg-mainDark"
            @click="toggleDropdown(1)"
          >
            <h2 class="sm:text-[18px] sm:ml-2 md:text-[20px] md:ml-5">
              Достоинства быстрой доставки 🏎️
            </h2>
            <img
              v-if="!isDark"
              class="mr-2 w-8"
              src="/down.png"
              :class="{
                'rotate-[-180deg] transition-all duration-500': dropdowns[1],
                'rotate-0 transition-all duration-500': !dropdowns[1],
              }"
              alt=""
            />
            <svg
            v-if="isDark"
              class="mr-2 w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
              :class="{
                'rotate-[-180deg] transition-all duration-500': dropdowns[1],
                'rotate-0 transition-all duration-500': !dropdowns[1],
              }"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </div>

          <div
            class="textBlock1 flex justify-center bg-white dark:bg-[#171717]"
            :class="{ closed: !dropdowns[1] }"
          >
            <p class="text-[18px] font-[300] leading-[30px] p-[20px]">
              <span class="font-[700]">Удовлетворение ожиданий клиентов:</span>
              Быстрая доставка отвечает потребностям клиентов в получении
              товаров в кратчайшие сроки. Это способствует повышению
              удовлетворенности клиентов и созданию положительного опыта
              покупок.
              <span class="font-[700]">Повышение лояльности клиентов:</span>
              Быстрая доставка может стать фактором, который заставит клиентов
              возвращаться к вашему магазину снова и снова. Клиенты ценят
              эффективное обслуживание и готовы остаться верными бренду, который
              предлагает быструю доставку. Конкурентное преимущество: В мире
              электронной торговли быстрая доставка является ключевым
              конкурентным преимуществом.
            </p>
          </div>
        </div>

        <div class="sm:w-[320px] md:w-[470px] lg:w-[600px]">
          <div
            class="flex justify-between items-center gap-8 bg-[#e3e3e3] p-2 dark:bg-mainDark"
            @click="toggleDropdown(2)"
          >
            <h2 class="sm:text-[18px] sm:ml-2 md:text-[20px] md:ml-5">
              Безопасность и надежность всех покупок 🔐
            </h2>
            <img
            v-if="!isDark"
              class="mr-2 w-8"
              src="/down.png"
              :class="{
                'rotate-[-180deg] transition-all duration-500': dropdowns[2],
                'rotate-0 transition-all duration-500': !dropdowns[2],
              }"
              alt=""
            />
            <svg
            v-if="isDark"
              class="mr-2 w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
              :class="{
                'rotate-[-180deg] transition-all duration-500': dropdowns[2],
                'rotate-0 transition-all duration-500': !dropdowns[2],
              }"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </div>

          <div
            class="textBlock2 flex justify-center bg-white dark:bg-[#171717]"
            :class="{ closed: !dropdowns[2] }"
          >
            <p class="text-[18px] font-[300] leading-[30px] p-[20px]">
              <span class="font-[700]">Безопасные Транзакции:</span> Мы
              используем надежные платежные системы, обеспечивая безопасность
              ваших финансов при совершении покупок в нашем магазине. Ваши
              данные защищены передовыми технологиями шифрования.
              Гарантированная Конфиденциальность: Мы уважаем вашу
              конфиденциальность.
              <span class="font-[700]">Возврат и Обмен без Забот:</span> Наша
              гибкая политика возврата и обмена обеспечивает вашу уверенность в
              том, что вы получите именно то, что ожидали.
              <span class="font-[700]">
                Сертифицированные Безопасные Товары:</span
              >
              Мы тщательно выбираем обувь у проверенных производителей,
              гарантируя, что каждая пара соответствует стандартам безопасности
              и качества. Ваши ноги в надежных руках.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.closed {
  overflow: hidden;
  max-height: 0px;
}
</style>

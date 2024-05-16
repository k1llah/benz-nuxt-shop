<template>
  <div class="flex flex-wrap justify-center gap-10 p-10 border-t-2 border-slate-500 pb-24 dark:bg-primaryDark dark:border-white dark:text-ghostWhiteText">
    <div class="flex justify-center flex-col gap-5">
      <h3 class="md:text-2xl sm:text-lg font-[600]">Доставка по Сочи</h3>
      <p class="text-slate-600 md:text-xl sm:text-base dark:text-slate-300">
        Стандартная доставка от 2 дней - от 500 руб. Самовывоз из ближайшего
        магазина - бесплатно, если товар представлен в магазинах вашего города
      </p>
    </div>
    <div class="flex justify-center flex-col gap-5">
      <h3 class="md:text-2xl sm:text-lg font-[700]">Бесплатная примерка</h3>
      <p class="text-slate-600 md:text-xl sm:text-base  dark:text-slate-300">
        При заказе доставки по Сочи и самовывозе, ты можешь заказать два размера одного товара для примерки и выбрать тот, что подошёл.
      </p>
    </div>
    <div class="mt-10 flex justify-center items-center flex-wrap md:gap-10 sm:gap-10">
       <h2 class="md:text-2xl sm:text-xl md:max-w-[50%] sm:max-w-none   md:pl-0 sm:pl-2"><span class="text-[#7747ff] dark:text-[#10b981]">Оставьте отзыв о нашем магазине</span> или посмотрите что пишут о нас другие покупатели</h2>
       <div>

        <NuxtLink to="/feedback">
    <div class="relative hover:scale-[1.05] transition-all 1.3s">
      <div class="absolute inset-0 bg-black opacity-50 z-10 hover:opacity-0 transition-all 1.1s cursor-pointer"></div>
      <div class="md:w-[350px] md:h-[150px] sm:min-w-[320px] sm:h-[200px] flex justify-center bg-cover bg-center top-[-300px] items-end bg-[url('/feedBack2.avif')]"   >
        <p class="text-center md:text-2xl sm:text-xl font-xl mb-3 text-white z-20">Отзывы</p>
      </div>
    </div>
	</NuxtLink>
      </div>
    </div>
  </div>



</template>

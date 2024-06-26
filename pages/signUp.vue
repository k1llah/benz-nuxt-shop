<script setup lang="ts">
import LazySignUp from '~/components/profileComponents/LazySignUp.vue';
</script>
<template>
		<div class="min-h-[600px]">
    <div class="flex md:ml-[50px] sm:ml-[20px] mt-5 gap-[15px] items-center">
      <buttonBack/>
      <h2 class="text-3xl dark:text-ghostWhiteText">Регистрация</h2>
    </div>
    <LazySignUp/>
  </div>
</template>


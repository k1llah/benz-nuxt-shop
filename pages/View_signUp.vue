<script setup lang="ts">
	import SignUp_View from '@/components/profileComponents/Sign_up.vue';
  import buttonBack from '@/components/buttonBack.vue';
</script>

<template>
	
		<div class="min-h-[600px]">
    <div class="flex md:ml-[50px] sm:ml-[20px] mt-5 gap-[15px] items-center">
      <buttonBack/>
      <h2 class="text-3xl">Регистрация</h2>
    </div>
		
    <SignUp_View/>
  </div>
</template>


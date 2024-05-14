<script setup lang="ts">
const target = ref("");
target.value = localStorage.getItem('page')!;
</script>
<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="w-full flex justify-center">
    

      <div v-if="target == 'orders'"  class="bg-white md:w-[600px] md:h-[800px] sm:w-full sm:h-[85%] fixed top-10 z-20 md:p-10 sm:p-5 m-auto dark:bg-black" >
				<myOrders/>
				
			</div>
      <div v-else-if="target == 'editProfile'" class="bg-white md:w-[600px] md:h-[800px] sm:w-[85%] sm:h-[85%] fixed top-10 z-20 md:p-10 sm:p-5 m-auto dark:bg-black">
				<EditProfile/>
			</div>
			

      <div v-else-if="target == 'address'" class="bg-white md:w-[600px] md:h-[800px] sm:w-full sm:h-[85%] fixed top-10 z-20 md:p-10 sm:p-0 m-auto dark:bg-black">
			<myAddress/>
			</div>
    
   
  </div>
</template>

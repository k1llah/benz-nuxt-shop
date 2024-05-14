<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'
const orderStore = useOrderStore();
const blog = useBlog()
const allStore = useAllStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const route = useRouter();
const authStore = useAuthStore();
const sneakerStore = useSneaker();
onMounted(() => {
  authStore.getRole();
  authStore.checkAuth();
});
const page = ref(window.location.pathname);
watch(() => route.currentRoute.value.path, (newPath: any) => {
  page.value = newPath;
});
if(process.client == false){
  console.log('sadly')
}
</script>
<template>
  <div class="md:w-[85%] sm:w-full m-auto bg-white rounded-xl shadow-xl mt-14 dark:bg-[#3f3f46]">
    <Header/>
    <section>
      <div class="w-full min-h-[800px] m-auto">
        <NuxtPage />
        <backToTop v-if="page != '/profile' && !allStore.isOpenedFeedBack && !blog.isOpenedModal && !blog.isOpenedModalFeedback && !orderStore.errorPayment && !orderStore.success"/>
      </div>
    </section>
    <Footer v-if="page != '/profile' && page != '/description'" />
  </div>

  
  <transition name="fade">
    <Drawer />
  </transition>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
  







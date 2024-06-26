<script setup lang="ts">
const orderStore = useOrderStore();
const blog = useBlog()
const allStore = useAllStore()
const route = useRouter();
const authStore = useAuthStore();
onBeforeMount(() => {
  authStore.checkAuth();
  authStore.getRole();
  useColorMode()
})
onMounted(() => {
  authStore.checkAuth();
  authStore.getRole();
  
})
const router = useRoute()
const page = ref(router.path);
if(page.value !== '/order' && page.value !== '/sneakerDescription'){
  orderStore.items = []
  useCookie('pageT').value = ''
  useCookie('sneakerId').value = ''
}
watch(() => route.currentRoute.value.path, (newPath: any) => {
  page.value = newPath;
})
const colorMode = useColorMode()
</script>
<template>
  <div class="md:w-[85%] sm:w-full m-auto bg-white rounded-xl shadow-xl mt-14 content dark:bg-[#3f3f46]">
    <Header/>
    <section>
      <div class="w-full m-auto">
        <NuxtPage />
        <backToTop v-if="page != '/profileUser' && !allStore.isOpenedFeedBack && !blog.isOpenedModal && !blog.isOpenedModalFeedback && !orderStore.errorPayment && !orderStore.success"/>
      </div>
    </section>
    <Footer v-if="page != '/profileUser' && page != '/description'" />
  </div>

  
  <transition name="fade">
    <Drawer/>
  </transition>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.35s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.6rem);
}
</style>
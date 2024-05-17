<script setup lang="ts">
const isAdmin = useIsAdmin();
const localRole = ref(useCookie("role").value);
onBeforeMount(() => {
  isAdmin.checkIsAdmin()
})
</script>
<template>
  <allLinks/>
</template>


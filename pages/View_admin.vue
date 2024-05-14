<script setup lang="ts">
const isAdmin = useIsAdmin();
const localRole = ref(localStorage.getItem("role"));
onBeforeMount(() => {
  isAdmin.checkIsAdmin()
})
</script>
<template>
  <allLinks/>
</template>


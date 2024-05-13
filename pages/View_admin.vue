<script setup lang="ts">
import axios from 'axios';
import { ref,onBeforeMount } from 'vue';
import allLinks from '../components/adminComponents/allLinks.vue'
import { useIsAdmin } from '@/stores/isAdmin';
const isAdmin = useIsAdmin();
const localRole = ref(localStorage.getItem("role"));
onBeforeMount(() => {
  isAdmin.checkIsAdmin()
})
</script>
<template>
  <allLinks/>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import postInfo from '@/components/blogComponents/post-info.vue';
import { useBlog } from '@/stores/sneakerBlog';
import { useRouter } from 'vue-router';
const router = useRouter()
const blog = useBlog();
</script>
<template>
<div>
	<postInfo/>
</div>
</template>
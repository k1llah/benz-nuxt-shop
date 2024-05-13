<script setup lang="ts">
import { ref, computed } from "vue";
import  { marked }  from 'marked';
// Define props
const props = defineProps({
  title: String,
  markDown: String,
  divScrollId: String,

})
const html = computed(() => {
  if (props.markDown !== undefined) {
    return marked(props.markDown);
  }
  return "";
});
</script>
<template>
 <div  class="p-5 pt-0" :id="props.divScrollId">
  <h1 class="md:text-4xl pt-10 font-extralight sm:text-[28px] dark:text-ghostWhiteText" >{{ props.title }}</h1>
  <div v-if="props.markDown !== undefined" class="dark:text-ghostWhiteText" v-html="html">
  
  </div>
 </div>
</template>


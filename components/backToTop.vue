<script setup lang="ts">

const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" }); //scrollUp
let buttonToTopVisible = ref(false);
const scrollPositionY = ref(0);

const handleScroll = () => {  
  if (scrollPositionY.value > 500) {
    buttonToTopVisible.value = true;
  } else {
    buttonToTopVisible.value = false;
  }
  scrollPositionY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <button
    class="buttonToTop"
    :class="{ 'flex': buttonToTopVisible == true, 'hidden': buttonToTopVisible == false }"
    @click="scrollUp(), (buttonToTopVisible = false)"
  >
    <svg viewBox="0 0 384 512" class="svgIcon">
      <path
        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
      ></path>
    </svg>
  </button>
</template>
<style scoped>
.buttonToTop {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: fixed;
  z-index: 99;
  top: 90%;
  right: 10%;
}

.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.svgIcon path {
  fill: white;
}

.buttonToTop:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(181, 160, 255);
  align-items: center;
}

.buttonToTop:hover .svgIcon {
  /* width: 20px; */
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.buttonToTop::before {
  position: absolute;
  bottom: -20px;
  content: "Back to Top";
  color: white;
  /* transition-duration: .3s; */
  font-size: 0px;
}

.buttonToTop:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  /* transform: translateY(-30px); */
  transition-duration: 0.3s;
}
@media (max-width: 645px) {
  
  .buttonToTop:hover {
  width: 50px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(20, 20, 20);
  align-items: center;
}

.buttonToTop::before {
  position: unset;
  bottom: -20px;
  content: "";
  color: white;
  /* transition-duration: .3s; */
  font-size: 0px;
}

.buttonToTop:hover .svgIcon {
  /* width: 20px; */
  transition-duration: 0.3s;
  transform: translateY(0%);
}

.buttonToTop:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  /* transform: translateY(-30px); */
  transition-duration: 0.3s;
}
}
</style>

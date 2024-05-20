<script setup lang="ts">
import { useDark } from '@vueuse/core';
const isDark = useDark();
</script>
<template>
  <div class="container-bg"  :class="{'container-dark': isDark}">
	
  <div>
    <feedBack />
  </div>
</div>
</template>




<style scoped>
.container-bg {
  width: 100%;
  height: 100%;
  --s: 60px;
  --c1: #180a22;
  --c2: #5b42f3;
  --_g: radial-gradient(
    25% 25% at 25% 25%,
    var(--c1) 99%,
    rgba(0, 0, 0, 0) 101%
  );
  background:
    var(--_g) var(--s) var(--s) / calc(2 * var(--s)) calc(2 * var(--s)),
    var(--_g) 0 0 / calc(2 * var(--s)) calc(2 * var(--s)),
    radial-gradient(50% 50%, var(--c2) 98%, rgba(0, 0, 0, 0)) 0 0 / var(--s)
      var(--s),
    repeating-conic-gradient(var(--c2) 0 50%, var(--c1) 0 100%)
      calc(0.5 * var(--s)) 0 / calc(2 * var(--s)) var(--s);
}
.container-dark {
  width: 100%;
  height: 100%;
  --s: 200px; /* control the size */
  --c1: #1d1d1d;
  --c2: #4e4f51;
  --c3: #3c3c3c;

  background: repeating-conic-gradient(
        from 30deg,
        #0000 0 120deg,
        var(--c3) 0 180deg
      )
      calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
    repeating-conic-gradient(
      from 30deg,
      var(--c1) 0 60deg,
      var(--c2) 0 120deg,
      var(--c3) 0 180deg
    );
  background-size: var(--s) calc(var(--s) * 0.577);
}

</style>
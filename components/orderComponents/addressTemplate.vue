<script setup lang="ts">
import { useOrderStore } from "@/stores/order";
const orderStore = useOrderStore();
const props = defineProps({
  id: Number,
  firstName: String,
  city: String,
  street: String,
  phoneNumber: String,
});
</script>
<template>
  <div
    class="flex gap-5 flex-wrap border-[3px] rounded-xl border-slate-200 max-w-[350px] p-7 text-base font-light dark:text-ghostWhiteText dark:border-mainDark"
  >
    <ul class="flex flex-col gap-3 list-disc">
      <li>Имя: {{ props.firstName }}</li>
      <li>Город: {{ props.city }}</li>
    </ul>
    <ul class="flex flex-col gap-3 list-disc">
      <li>Номер телефона: {{ props.phoneNumber }}</li>
      <li>Улица: {{ props.street }}</li>
    </ul>
    <div class="checkbox-wrapper-46">
      <input
        type="radio"
        name="address"
        :id="`cbx-${props.id}`"
        class="inp-cbx hidden"
      />
      <label
        :for="`cbx-${props.id}`"
        class="cbx"
        @click="orderStore.addressId = props.id!, orderStore.isSelected = true"
      >
        <span>
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
        ><span>Выбрать этот адрес</span>
      </label>
    </div>
  </div>
</template>
<style scoped>
.checkbox-wrapper-46 input[type="checkbox"] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-46 .cbx {
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}
.checkbox-wrapper-46 .cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.checkbox-wrapper-46 .cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #9098a9;
  transition: all 0.2s ease;
}
.checkbox-wrapper-46 .cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.checkbox-wrapper-46 .cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #506eec;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
}
.checkbox-wrapper-46 .cbx span:last-child {
  padding-left: 8px;
}
.checkbox-wrapper-46 .cbx:hover span:first-child {
  border-color: #506eec;
}

.checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child {
  background: #506eec;
  border-color: #506eec;
  animation: wave-46 0.4s ease;
}
.checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(3.5);
  opacity: 0;
  transition: all 0.6s ease;
}

@keyframes wave-46 {
  50% {
    transform: scale(0.9);
  }
}
</style>

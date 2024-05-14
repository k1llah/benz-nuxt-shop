<script setup lang="ts">
const addressStore = useAddressStore()
const props = defineProps({
  id: Number,
  firstName: String,
  lastName: String,
  surname: String,
  phoneNumber: String,
  city: String,
  postalCode: Number,
  street: String,
  buildingNumber: String,
  houseNumber: Number,
  apartment: Number,
  editAddress: Function,
  deleteAddress: Function,
});
const allStore = useAllStore()

</script>
<template>
  <div class="bg-[#f4f4f5] dark:bg-mainDark md:max-w-[350px] rounded-xl p-5 md:mt-5 sm:mt-2 shadow">
    <div class="flex flex-col md:text-[18px] sm:text-[14px]">
      <div class="flex flex-col gap-2 justify-around dark:text-ghostWhiteText">
        <p>
          Фамилия:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            lastName
          }}</span>
        </p>
        <p>
          Имя:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            firstName
          }}</span>
        </p>
        <p>
          Отчество:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{ surname }}</span>
        </p>
        <p>
          Номер телефона:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            phoneNumber
          }}</span>
        </p>

        <p>
          Город:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{ city }}</span>
        </p>
        <p>
          Почтовый индекс:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            postalCode
          }}</span>
        </p>
        <p>
          Улица:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{ street }}</span>
        </p>
        <p>
          Номер дома:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            houseNumber
          }}</span>
        </p>

        <p>
          Номер квартиры:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            apartment
          }}</span>
        </p>
        <p>
          Корпус:
          <span class="font-[600] md:text-base sm:text-xs text-slate-500 dark:text-gray-400">{{
            buildingNumber
          }}</span>
        </p>
      </div>
      <div class="flex justify-end md:gap-3 sm:gap-0">
        <button
          class="w-[54px] h-[54px] hover:transition-all duration-200 hover:bg-blue-400 md:text-3xl sm:text-xl rounded-xl"
          @click="allStore.targetPage = 'editAddress', allStore.idAddress = props.id!, allStore.headerText = 'Редактирование адреса'"
        >
          ⚙️
        </button>
        <button
          class="w-[54px] h-[54px] hover:transition-all duration-200 hover:bg-red-600 md:text-2xl sm:text-xl rounded-xl"
          @click="addressStore.deleteAddress(props.id!)"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.shadow {
  -webkit-box-shadow: 15px 4px 40px 7px rgba(34, 60, 80, 0.22);
  -moz-box-shadow: 15px 4px 40px 7px rgba(34, 60, 80, 0.22);
  box-shadow: 15px 4px 40px 7px rgba(34, 60, 80, 0.22);
}
</style>

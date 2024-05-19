<script setup lang="ts">
import EditAddresses from './editAddresses.vue'

const addressStore = useAddressStore();
const allStore = useAllStore();
onBeforeMount(() => {
  addressStore.dataAddress();
});
</script>
<template>
  <div>
  <div class="flex md:gap-5 items-center sm:gap-2 md:p-3 sm:p-3">
    <div>
      <buttonProfile
        @click="
          (allStore.targetPage = ''),
            (allStore.headerText = 'Мои адреса для доставки')
        "
      />
    </div>
    <h2 class="md:text-3xl sm:text-xl sm:text-right md:text-left dark:text-ghostWhiteText">
      {{ allStore.headerText }}
    </h2>
  </div>

  <div v-if="allStore.targetPage == 'editAddress'">
    <EditAddresses />
  </div>
  <div v-else-if="allStore.targetPage == 'addressAdd'">
    <addressAdd />
  </div>
  <div
    class="flex justify-between flex-col items-center md:mt-12 sm:mt-5"
    v-else 
  >
    <div class="flex flex-col w-full" v-auto-animate>
      <h2 class="md:text-2xl sm:text-lg dark:text-white md:pl-5 sm:pl-3">Мои адреса</h2>

      <div
        class="border-2 border-slate-500 w-full mt-5 min-h-80 overflow-scroll md:max-h-[500px] sm:max-h-[400px] md:p-5 sm:p-2 bg-primaryDark"
        v-if="addressStore.isAddress == true" v-auto-animate
      >
        <addressComp
          v-for="addressData in addressStore.addressData"
          v-auto-animate
          :key="addressData.id"
          :id="addressData.id"
          :first-name="addressData.firstName"
          :last-name="addressData.lastName"
          :surname="addressData.surname"
          :phone-number="addressData.phoneNumber"
          :city="addressData.city"
          :street="addressData.street"
          :postal-code="addressData.postalCode"
          :house-number="addressData.houseNumber"
          :building-number="addressData.buildingNumber"
          :apartment="addressData.apartment"
        />
      </div>

      <div
        class="w-full flex justify-center flex-col items-center md:min-h-[500px] sm:min-h-[400px]"
        v-if="!addressStore.isAddress"
      >
        <p class="md:text-[20px] sm:text-[18px] text-center dark:text-ghostWhiteText">
          У вас нет добавленных адресов
        </p>
        <p class="text-[60px]">🥱</p>
      </div>
    </div>
    <div>
      <button
        class="md:w-[150px] sm:w-[160px] md:h-[50px] mt-4 sm:h-[40px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        @click="
          (allStore.targetPage = 'addressAdd'),
            (allStore.headerText = 'Добавить адрес')
        "
      >
        Добавить адрес
      </button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const allStore = useAllStore();
const name = ref("");
const lastName = ref("");
const surname = ref("");
const city = ref("");
const street = ref("");
const phoneNumber = ref("");
const postalCode = ref();
const buildingNumber = ref("");
const houseNumber = ref();
const apartment = ref();
const prevName = ref("");
const prevLastName = ref("");
const prevSurname = ref("");
const prevCity = ref("");
const prevStreet = ref("");
const prevPhoneNumber = ref("");
const prevPostalCode = ref();
const prevBuildingNumber = ref("");
const prevHouseNumber = ref();
const prevApartment = ref();
let warningAll = ref("");
let dataAddress = ref();
const router = useRouter()
const reloadPage = () => {
  location.reload()
}
const correctDataInput = computed(
  () =>
    houseNumber.value !== null &&
    apartment.value !== null &&
    postalCode.value !== null &&
    phoneNumber.value !== null &&
    name.value.length >= 2 &&
    lastName.value.length >= 2 &&
    surname.value.length >= 2 &&
    city.value.length >= 2 &&
    street.value.length >= 2
);
const isChanged = computed(
  () =>
    name.value !== prevName.value ||
    lastName.value !== prevLastName.value ||
    surname.value !== prevSurname.value ||
    city.value !== prevCity.value ||
    street.value !== prevStreet.value ||
    phoneNumber.value !== prevPhoneNumber.value ||
    postalCode.value !== prevPostalCode.value ||
    buildingNumber.value !== prevBuildingNumber.value ||
    houseNumber.value !== prevHouseNumber.value ||
    apartment.value !== prevApartment.value
);
const ChangeBack = () => {
  name.value = prevName.value;
  lastName.value = prevLastName.value;
  surname.value = prevSurname.value;
  city.value = prevCity.value;
  street.value = prevStreet.value;
  phoneNumber.value = prevPhoneNumber.value;
  postalCode.value = prevPostalCode.value;
  buildingNumber.value = prevBuildingNumber.value;
  houseNumber.value = prevHouseNumber.value;
  apartment.value = prevApartment.value;
};
const editAddress = async () => {
  try {
    const data = await $fetch<any>("http://localhost:3001/api/get-address", {
      method: "POST",
      body:{
        addressId: allStore.idAddress,
        userId: useCookie("id").value,
      }
    });
    dataAddress.value = data;
    name.value = dataAddress.value.firstName;
    lastName.value = dataAddress.value.lastName;
    surname.value = dataAddress.value.surname;
    city.value = dataAddress.value.city;
    street.value = dataAddress.value.street;
    phoneNumber.value = dataAddress.value.phoneNumber;
    postalCode.value = dataAddress.value.postalCode;
    buildingNumber.value = dataAddress.value.buildingNumber;
    houseNumber.value = dataAddress.value.houseNumber;
    apartment.value = dataAddress.value.apartment;

    prevName.value = dataAddress.value.firstName;
    prevLastName.value = dataAddress.value.lastName;
    prevSurname.value = dataAddress.value.surname;
    prevCity.value = dataAddress.value.city;
    prevStreet.value = dataAddress.value.street;
    prevPhoneNumber.value = dataAddress.value.phoneNumber;
    prevPostalCode.value = dataAddress.value.postalCode;
    prevBuildingNumber.value = dataAddress.value.buildingNumber;
    prevHouseNumber.value = dataAddress.value.houseNumber;
    prevApartment.value = dataAddress.value.apartment;
  } catch (error) {
    console.log(error);
  }
};
editAddress();

const updateAddress = async () => {
  try {
    const data = await $fetch<any>("http://localhost:3001/api/update-address", {
      method: 'POST',
      body:{
        id: allStore.idAddress,
        userId: useCookie("id").value,
        firstName: name.value,
        lastName: lastName.value,
        surname: surname.value,
        city: city.value,
        street: street.value,
        phoneNumber: phoneNumber.value,
        postalCode: postalCode.value,
        buildingNumber: buildingNumber.value,
        houseNumber: houseNumber.value,
        apartment: apartment.value,
      }
    });
    reloadPage()
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div
    class="md:mt-16 sm:mt-8 overflow-scroll md:max-h-[auto] sm:max-h-[450px]"
  >
    <form class="flex flex-col">
      <div
        class="flex flex-col gap-2 justify-center md:items-start sm:items-center"
      >
        <input
          placeholder="Фамилия *"
          class="border-2 text-gray-500 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-96 sm:w-[80%] input-dark"
          type="text"
          v-model="lastName"
        />

        <input
          placeholder="Имя *"
          class="border-2 text-gray-500 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-96 sm:w-[80%] input-dark"
          type="text"
          v-model="name"
        />

        <input
          placeholder="Отчество (при наличии)"
          class="border-2 text-gray-500 rounded-md p-2 mb-4 focus:bg-gray-60 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 md:w-96 sm:w-[80%] input-dark"
          type="text"
          v-model="surname"
        />
      </div>

      <div
        class="flex flex-wrap md:flex-nowrap md:space-x-4 sm:space-x-0 md:gap-0 sm:gap-3 mb-8 sm:items-center sm:justify-center"
      >
        <input
          placeholder="Номер телефона *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="tel"
          v-model="phoneNumber"
          minlength="10"
        />

        <input
          placeholder="Город *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="city"
        />
      </div>

      <div
        class="flex flex-wrap md:flex-nowrap md:space-x-4 sm:space-x-0 md:gap-0 sm:gap-3 mb-8 sm:justify-center"
      >
        <input
          placeholder="Почтовый индекс *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="postalCode"
          minlength="6"
        />

        <input
          placeholder="Улица *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="street"
          minlength="2"
        />
      </div>
      <div
        class="flex flex-wrap md:flex-nowrap md:space-x-4 sm:space-x-0 md:gap-0 sm:gap-3 mb-8 sm:justify-center"
      >
        <input
          placeholder="Дом *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="houseNumber"
        />
        <input
          placeholder="Корпус"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="text"
          v-model="buildingNumber"
        />
      </div>
      <div
        class="flex flex-wrap md:flex-nowrap md:space-x-4 sm:space-x-0 md:gap-0 sm:gap-3 mb-8 sm:justify-center"
      >
        <input
          placeholder="Квартира *"
          class="border-2 text-gray-500 rounded-md p-2 md:w-1/2 sm:w-[80%] focus:bg-gray600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 input-dark"
          type="number"
          v-model="apartment"
        />
      </div>
      <p class="text-red-600 text-[16px]">{{ warningAll }}</p>
    </form>
  </div>
  <div class="flex gap-5 sm:flex-wrap md:flex-nowrap md:mt-8 p-2 sm:gap-1">
    <button
      class="cursor-pointer duration-200 hover:scale-125 active:scale-100 md:w-12 h-12 sm:w-8 sm:h-8"
      title="Go Back"
      @click="
        (allStore.targetPage = ''),
          (allStore.headerText = 'Мои адреса для доставки')
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="stroke-blue-300"
      >
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="1.5"
          d="M11 6L5 12M5 12L11 18M5 12H19"
        ></path>
      </svg>
    </button>

    <button
      class="bg-[#22c55e] px-4 py-2 rounded-lg text-white md:text-base font-normal sm:text-xs hover:bg-green-600 transition duration-250"
      :class="{
        'cursor-not-allowed bg-slate-800 hover:cursor-not-allowed hover:bg-slate-800':
          !isChanged,
      }"
      @click="updateAddress()"
    >
      Сохранить изменения
    </button>

    <button
      class="bg-[#7747ff] px-4 py-2 rounded-lg text-white md:text-base font-normal sm:text-xs hover:bg-red-600 transition duration-250 sm:hidden md:block"
      :class="{
        'cursor-not-allowed bg-slate-800 hover:cursor-not-allowed hover:bg-slate-800':
          !isChanged,
      }"
      @click="ChangeBack()"
    >
      Отменить изменения
    </button>
    <button
      class="bg-[#7747ff] px-4 py-2 rounded-lg text-white md:text-base font-normal sm:text-xs hover:bg-red-600 transition duration-250 sm:block md:hidden"
      :class="{
        'cursor-not-allowed bg-slate-800 hover:cursor-not-allowed hover:bg-slate-800':
          !isChanged,
      }"
      @click="ChangeBack()"
    >
      Отменить
    </button>
  </div>
</template>
<style scoped>
.input-dark {
  @apply dark:bg-mainDark dark:border-none dark:text-ghostWhiteText dark:placeholder:text-slate-300;
}
</style>

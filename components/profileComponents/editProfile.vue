<script setup lang="ts">
const uuid = useCookie("uuid").value;
const id = useCookie("id").value;
const email = ref("");
const first_name = ref("");
const lastName = ref("");
const newProfileImg = ref();
const newProfileFile = ref();
const tempFileURL = ref();
const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
const prevEmail = ref("");
const prevFirst_name = ref("");
const prevLastName = ref("");
const prevProfileImg = ref("");
const isChanged = ref(false);
const nameWarning = ref("");
const emailWarning = ref("");
const lastNameWarning = ref("");
const router = useRouter()
const allStore = useAllStore()
const reloadPage = () => {
  allStore.isOpened = false
  location.reload()
}
const correctDataInput = computed(
  () =>
    email.value !== "" &&
    first_name.value !== "" &&
    lastName.value !== "" &&
    newProfileImg.value !== "" &&
    email.value.includes("@") &&
    email.value.length >= 2 &&
    lastName.value.length >= 2 &&
    first_name.value.length >= 2
);
const isFormChanged = computed(
  () =>
    email.value !== prevEmail.value ||
    first_name.value !== prevFirst_name.value ||
    lastName.value !== prevLastName.value ||
    newProfileImg.value !== prevProfileImg.value
);
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    let file = files[0];
    newProfileFile.value = file;
    newProfileImg.value = file.name;
    prevProfileImg.value = "";
    const reader = new FileReader();
    reader.onload = function () {
      tempFileURL.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
const getData = async function () {
  try {
    let infoUser = await $fetch<any>("http://localhost:3001/api/get-data", {
      method: "POST",
      body:{
        uuid,
        id,
      }
    });
    let data = infoUser
    email.value = data.user.email;
    first_name.value = data.user.first_name;
    lastName.value = data.user.last_name;
    newProfileImg.value = data.user.profileImg;

    prevEmail.value = data.user.email;
    prevFirst_name.value = data.user.first_name;
    prevLastName.value = data.user.last_name;
    prevProfileImg.value = data.user.profileImg;
  } catch (error) {
    console.log(error);
  }
};

const submitForm = async (event: Event) => {
  event.preventDefault();
  try {
    if (isFormChanged.value == true && correctDataInput.value == true) {
      isChanged.value = true;
      const formData = new FormData();
      formData.append("file", newProfileFile.value);
      formData.append(
        "data",
        JSON.stringify({
          id: id,
          uuid: uuid,
          email: email.value,
          first_name: first_name.value,
          last_name: lastName.value,
          profileImg: newProfileImg.value,
        })
      );
      if(formData){
      const changedData = $fetch<any>(
        "http://localhost:3001/api/edit-profile",{
        method: "POST",
        body: formData
      }
      );
      reloadPage()
    }
    } else if (lastName.value.includes(" ") || lastName.value.length < 2) {
      setTimeout(() => {
        lastNameWarning.value = "";
      }, 3000);
      lastNameWarning.value = "Фамилия содержит пробел или меньше 2 символов";
    } else if (
      first_name.value.includes(" ") ||
      first_name.value.length < 2 ||
      specialChars.test(first_name.value) == true
    ) {
      setTimeout(() => {
        nameWarning.value = "";
      }, 3000);

      nameWarning.value =
        "Имя содержит пробел, спецсимвол или оно меньше 2 символов";
    } else if (
      email.value.includes(" ") ||
      email.value.length < 2 ||
      !email.value.includes("@")
    ) {
      setTimeout(() => {
        emailWarning.value = "";
      }, 3000);
      emailWarning.value =
        "email содержит пробел, меньше 2 символов или не содержит @";
    } else {
      isChanged.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};
const resetForm = async (event: Event) => {
  event.preventDefault();
  if (
    email.value !== prevEmail.value ||
    first_name.value !== prevFirst_name.value ||
    lastName.value !== prevLastName.value ||
    (newProfileImg.value !== prevProfileImg.value && isChanged.value === true)
  ) {
    email.value = prevEmail.value;
    first_name.value = prevFirst_name.value;
    lastName.value = prevLastName.value;
    newProfileImg.value = prevProfileImg.value;
  }
};

onMounted(() => {
  submitForm;
  getData();
});
watch([email, first_name, lastName, newProfileImg], () => {
  isChanged.value =
    email.value !== prevEmail.value ||
    first_name.value !== prevFirst_name.value ||
    lastName.value !== prevLastName.value ||
    newProfileImg.value !== prevProfileImg.value;
});
</script>

<template>
  <div class="flex gap-5 items-center">
    <div>
      <buttonProfile />
    </div>
    <h2
      class="md:text-3xl md:text-[unset] sm:text-xl sm:text-right dark:text-ghostWhiteText"
    >
      Редактирование профиля
    </h2>
  </div>

  <div class="m-auto flex flex-col items-center mt-10 gap-9">
    <div>
      <img
        :src="
          prevProfileImg
            ? 'http://localhost:3001/img/tablet/' + prevProfileImg
            : tempFileURL
        "
        alt="profile image"
        class="md:w-[150px] sm:w-[110px] rounded-[50%]"
      />
    </div>
    <div class="flex gap-5">
      <p class="md:text-lg sm:text-base dark:text-ghostWhiteText">
        Загрузить свое фото
      </p>
      <label for="upload-button" class="cursor-pointer">
        <div
          class="bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
        >
          <svg
            class="md:w-4 md:h-4 sm:w-3 sm:h-3"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </div>
        <input
          id="upload-button"
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload"
        />
      </label>
    </div>
    <form
      class="flex flex-col md:gap-5 sm:gap-3"
      @submit="submitForm"
      @reset="resetForm"
    >
      <div>
        <label
          for="inputname"
          class="block text-gray-800 font-semibold text-sm dark:text-slate-400"
          >Фамилия</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="block w-56 rounded-md py-1.5 px-2 ring-1 ring-gray-400 focus:text-gray-800 dark:bg-mainDark dark:text-ghostWhiteText"
            v-model="lastName"
          />
        </div>
        <label
          class="pt-1 block text-red-700 text-sm max-w-52 transition-all duration-500"
          >{{ lastNameWarning }}</label
        >
      </div>
      <div>
        <label
          for="inputname"
          class="block text-gray-800 font-semibold text-sm dark:text-slate-400"
          >Имя</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="inputname"
            id="name"
            class="block w-56 rounded-md py-1.5 px-2 ring-1 ring-gray-400 focus:text-gray-800 dark:bg-mainDark dark:text-ghostWhiteText"
            v-model="first_name"
          />
        </div>
        <label class="pt-1 block text-red-700 text-sm max-w-52">{{
          nameWarning
        }}</label>
      </div>
      <div>
        <label
          for="inputEmail"
          class="block text-gray-800 font-semibold text-sm dark:text-slate-400"
          >Email</label
        >
        <div class="mt-2">
          <input
            type="email"
            name="inputEmail"
            id="email"
            class="block w-56 rounded-md py-1.5 px-2 ring-1 ring-gray-400 focus:text-gray-800 dark:bg-mainDark dark:text-ghostWhiteText"
            v-model="email"
          />
        </div>
        <label class="pt-1 block text-red-700 text-sm max-w-52">{{
          emailWarning
        }}</label>
      </div>
      <div class="flex gap-5 mt-3">
        <button
          type="submit"
          class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
          @click="submitForm($event)"
          :class="{ 'cursor-not-allowed bg-slate-800': !isChanged }"
        >
          Submit
        </button>
        <button
          class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
          :class="{ 'cursor-not-allowed bg-slate-800': !isChanged }"
          type="reset"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

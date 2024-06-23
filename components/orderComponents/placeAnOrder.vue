<script setup lang="ts">
// https://3dsec.sberbank.ru/payment/rest/register.do
const allStore = useAllStore();
const orderStore = useOrderStore();
const cartStore = useCartStore();
</script>
<template>
  <div>
  <div class="lg:max-w-full md:max-w-[90%]">
    <div>
      <h3 class="text-2xl font-medium p-3 dark:text-ghostWhiteText">
        Выбрать способ оплаты
      </h3>
      <div>
        <div class="radio-inputs md:flex-nowrap sm:flex-wrap">
          <label>
            <input
              class="radio-input"
              type="radio"
              name="payment"
              @click="orderStore.methodPayment = 'online'"
            />
            <span class="radio-tile bg-white dark:bg-mainDark">
              <span class="radio-icon m-auto">
                <img src="/sbp.svg" alt="" class="h-[100px]" v-if="$colorMode.preference == 'light'" />
                <img
                  src="/sbpLight.svg"
                  alt=""
                  class="h-[100px]"
                  v-if="$colorMode.preference == 'dark'"
                />
              </span>
              <span class="radio-label dark:text-ghostWhiteText text-[#707070]"
                >Онлайн оплата</span
              >
            </span>
          </label>

          <label>
            <input
              class="radio-input"
              type="radio"
              name="payment"
              @click="orderStore.methodPayment = 'payWhenReceiving'"
            />
            <span class="radio-tile dark:bg-mainDark dark:text-ghostWhiteText">
              <span class="radio-icon">
                <img src="/paymentImage.png" alt="" class="h-[100px]" />
              </span>
              <span class="radio-label dark:text-ghostWhiteText text-[#707070]"
                >Оплата при получении</span
              >
            </span>
          </label>
        </div>
      </div>
      <div>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          class="resize-none outline-none mt-5 border-[1px] border-slate-300 rounded-xl p-3 max-h-[120px] ml-2 dark:bg-mainDark dark:text-ghostWhiteText"
          placeholder="Сообщение к заказу"
          v-model="orderStore.comment"
          maxlength="150"
        ></textarea>
      </div>
    </div>

    <div
      class="container1 bg-white dark:bg-mainDark"
      @click="orderStore.placeAnOrder(orderStore.validateOnClick())"
    >
      <div class="left-side">
        <div class="card">
          <div class="card-line"></div>
          <div class="buttons"></div>
        </div>
        <div class="post">
          <div class="post-line"></div>
          <div class="screen">
            <div class="dollar">$</div>
          </div>
          <div class="numbers"></div>
          <div class="numbers-line2"></div>
        </div>
      </div>
      <div class="right-side dark:bg-mainDark">
        <div class="new dark:text-ghostWhiteText">Заказать</div>
      </div>
    </div>
    <div class="ml-3 mb-10">
      <h3 class="text-2xl font-light dark:text-ghostWhiteText">
        К оплате: {{ (orderStore.amount * (1 + 0.05)).toFixed(2) }} RUB
      </h3>
    </div>
  </div>
  <modalWindow v-if="orderStore.success" />
  <modalError v-if="orderStore.errorPayment" />
</div>
</template>
<style scoped>
.radio-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.radio-inputs > * {
  margin: 6px;
}

.radio-input:checked + .radio-tile {
  border-color: #22c55e;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.radio-input:checked + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
  background-color: #22c55e;
  border-color: #22c55e;
}

.radio-input:checked + .radio-tile .radio-icon svg {
  fill: #22c55e;
}

.radio-input:checked + .radio-tile .radio-label {
  color: #166534;
}

.radio-input:focus + .radio-tile {
  border-color: #22c55e;
  box-shadow:
    0 5px 10px rgba(0, 0, 0, 0.1),
    0 0 0 4px #86efac;
}

.radio-input:focus + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
}

.radio-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 170px;
  min-height: 120px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

.radio-tile:before {
  content: "";
  position: absolute;
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
}

.radio-tile:hover {
  border-color: #22c55e;
}

.radio-tile:hover:before {
  transform: scale(1);
  opacity: 1;
}

.radio-icon {
  max-width: 80%;
  height: auto;
  fill: #494949;
}

.radio-label {
  transition: 0.375s ease;
  text-align: center;
  font-size: 13px;
  padding-bottom: 5px;
}

.radio-input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.container1 {
  margin-top: 30px;
  margin-left: 12px;
  display: flex;
  width: 270px;
  height: 120px;
  position: relative;
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  margin-bottom: 25px;
}

.container1:hover {
  transform: scale(1.03);
}

.container1:hover .left-side {
  width: 100%;
}

.left-side {
  background-color: #5de2a3;
  width: 130px;
  height: 120px;
  border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  flex-shrink: 0;
  overflow: hidden;
}

.right-side {
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  justify-content: space-between;
  white-space: nowrap;
  transition: 0.3s;
}

.right-side:hover {
  background-color: #f9f7f9;
}

.arrow {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}

.new {
  font-size: 23px;
  font-family: "Lexend Deca", sans-serif;
  margin-left: 20px;
}

.card {
  width: 70px;
  height: 46px;
  background-color: #c7ffbc;
  border-radius: 6px;
  position: absolute;
  display: flex;
  z-index: 10;
  flex-direction: column;
  align-items: center;
  -webkit-box-shadow: 9px 9px 9px -2px rgba(77, 200, 143, 0.72);
  -moz-box-shadow: 9px 9px 9px -2px rgba(77, 200, 143, 0.72);
  box-shadow: 9px 9px 9px -2px rgba(77, 200, 143, 0.72);
}

.card-line {
  width: 65px;
  height: 13px;
  background-color: #80ea69;
  border-radius: 2px;
  margin-top: 7px;
}

@media only screen and (max-width: 480px) {
  .container1 {
    transform: scale(0.7);
  }

  .container:hover {
    transform: scale(0.74);
  }

  .new {
    font-size: 18px;
  }
}

.buttons {
  width: 8px;
  height: 8px;
  background-color: #379e1f;
  box-shadow:
    0 -10px 0 0 #26850e,
    0 10px 0 0 #56be3e;
  border-radius: 50%;
  margin-top: 5px;
  transform: rotate(90deg);
  margin: 10px 0 0 -30px;
}

.container1:hover .card {
  animation: slide-top 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}

.container1:hover .post {
  animation: slide-post 1s cubic-bezier(0.165, 0.84, 0.44, 1) both;
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  50% {
    -webkit-transform: translateY(-70px) rotate(90deg);
    transform: translateY(-70px) rotate(90deg);
  }

  60% {
    -webkit-transform: translateY(-70px) rotate(90deg);
    transform: translateY(-70px) rotate(90deg);
  }

  100% {
    -webkit-transform: translateY(-8px) rotate(90deg);
    transform: translateY(-8px) rotate(90deg);
  }
}

.post {
  width: 63px;
  height: 75px;
  background-color: #dddde0;
  position: absolute;
  z-index: 11;
  bottom: 10px;
  top: 120px;
  border-radius: 6px;
  overflow: hidden;
}

.post-line {
  width: 47px;
  height: 9px;
  background-color: #545354;
  position: absolute;
  border-radius: 0px 0px 3px 3px;
  right: 8px;
  top: 8px;
}

.post-line:before {
  content: "";
  position: absolute;
  width: 47px;
  height: 9px;
  background-color: #757375;
  top: -8px;
}

.screen {
  width: 47px;
  height: 23px;
  background-color: #ffffff;
  position: absolute;
  top: 22px;
  right: 8px;
  border-radius: 3px;
}

.numbers {
  width: 12px;
  height: 12px;
  background-color: #838183;
  box-shadow:
    0 -18px 0 0 #838183,
    0 18px 0 0 #838183;
  border-radius: 2px;
  position: absolute;
  transform: rotate(90deg);
  left: 25px;
  top: 52px;
}

.numbers-line2 {
  width: 12px;
  height: 12px;
  background-color: #aaa9ab;
  box-shadow:
    0 -18px 0 0 #aaa9ab,
    0 18px 0 0 #aaa9ab;
  border-radius: 2px;
  position: absolute;
  transform: rotate(90deg);
  left: 25px;
  top: 68px;
}

@keyframes slide-post {
  50% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    -webkit-transform: translateY(-70px);
    transform: translateY(-70px);
  }
}

.dollar {
  position: absolute;
  font-size: 16px;
  font-family: "Lexend Deca", sans-serif;
  width: 100%;
  left: 0;
  top: 0;
  color: #4b953b;
  text-align: center;
}

.container:hover .dollar {
  animation: fade-in-fwd 0.3s 1s backwards;
}

@keyframes fade-in-fwd {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script>
import { useAuthStore } from "@/stores/auth.js";
import {useDark, useToggle} from "@vueuse/core";

const emailCheckRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  setup() {
    const authStore = useAuthStore();
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { authStore, isDark, toggleDark };
  },
  data() {
    return {
      isLoading: false,
      email: "",
      isEmailTouched: false,

      password: "",
      isPasswordTouched: false,
      passwordRetry: "",

      passwordShow: false,
    };
  },
  computed: {
    isEmailValid() {
      return emailCheckRegex.test(this.email);
    },
    isPasswordValid() {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(this.password);
    },
    isPasswordRetryValid() {
      return this.passwordRetry === this.password;
    },
    isDisabled() {
      return (
        !this.isPasswordValid ||
        !this.isPasswordRetryValid ||
        !this.isEmailValid ||
        this.isLoading
      );
    },
  },
  methods: {
    sendRequestRegistration() {
      this.isLoading = true;
      this.authStore.register({
        email: this.email,
        password: this.password,
        password_retry: this.passwordRetry,
      })
        .then(() => {
          this.$router.push({ path: "/login", replace: true });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <div class="h-full">
    <div class="h-full bg-black dark:bg-white">
      <form
        @submit.prevent="sendRequestRegistration"
        class="container px-4 sm:px-6 md:px-8 m-auto flex justify-center flex-col pt-10"
        action=""
      >
        <div class="text-white dark:text-black font-bold text-4xl opacity-87 mt-11">
          {{ $t('auth.register.base') }}
        </div>

        <label
          class="text-white dark:text-black text-base font-normal opacity-87 mt-12"
          for="email"
          >{{ $t('auth.login.label') }}</label
        >
        <input
          :class="{ error: !isEmailValid && isEmailTouched }"
          @blur="isEmailTouched = true"
          v-model="email"
          class="text-white dark:text-black font-normal p-3 rounded user-name mt-2"
          id="email"
          type="email"
          :placeholder="$t('auth.login.placeholder')"
        />
        <div class="text-base text-red-700 font-bold" v-if="!isEmailValid && isEmailTouched">
          {{ $t('auth.login.error.message') }}
        </div>

        <div class="flex flex-col relative">
          <label
            class="text-white text-base font-normal opacity-87 mt-6"
            for="password"
            >{{ $t('auth.password.base') }}</label
          >
          <input
            :class="{ error: !isPasswordValid && isPasswordTouched }"
            @blur="isPasswordTouched = true"
            v-model="password"
            class="text-white font-normal p-3 rounded password mt-2"
            id="password"
            :type="passwordShow ? 'text' : 'password'"
            placeholder="* * * * * *"
          />
          <div class="text-base text-red-700 font-bold" v-if="!isPasswordValid && isPasswordTouched">
            {{ $t('auth.password.error.message') }}
          </div>
          <font-awesome-icon
            @click="passwordShow = !passwordShow"
            :icon="passwordShow ? 'fa-eye' : 'fa-eye-slash'"
            class="absolute right-3 top-17.5 text-2xl text-white dark:text-black opacity-70 transition duration-300 ease-in cursor-pointer hover:scale-103"
            icon="fa-solid"
          />
        </div>

        <div class="flex flex-col relative">
          <label
            class="text-white dark:text-black text-base font-normal opacity-87 mt-6"
            for="passwordRetry"
            >{{ $t('auth.password.label') }}</label
          >
          <input
            :class="{ error: !isPasswordRetryValid }"
            v-model="passwordRetry"
            class="text-white dark:text-black font-normal p-3 rounded password mt-2"
            id="passwordRetry"
            :type="passwordShow ? 'text' : 'password'"
            placeholder="* * * * * *"
          />
          <div
            class="text-base text-red-700 font-bold"
            v-if="!isPasswordRetryValid"
          >
            {{ $t('auth.password.error.retry.message') }}
          </div>
          <font-awesome-icon
            @click="passwordShow = !passwordShow"
            :icon="passwordShow ? 'fa-eye' : 'fa-eye-slash'"
            class="absolute right-3 top-17.5 text-2xl text-white dark:text-black opacity-70 transition duration-300 ease-in cursor-pointer hover:scale-103"
            icon="fa-solid"
          />
        </div>

        <button
          :class="
            isDisabled ? 'opacity-45 cursor-default' : 'transition duration-300 ease-in cursor-pointer hover:scale-101'
          "
          :disabled="isDisabled"
          class="flex items-center justify-center text-white dark:text-black bg-sky-700 p-3 mt-14 text-base font-normal rounded"
          type="submit"
        >
          <svg
            v-if="isLoading"
            class="mr-3 size-5 animate-spin"
            viewBox="0 0 24 24"
          >
            <font-awesome-icon icon="fa-solid fa-circle-notch" /></svg
          >{{ $t('auth.register.button') }}
        </button>

        <div class="flex gap-2">
          <div class="text-white dark:text-black mt-12 opacity-87 text-xs font-normal">
            {{ $t('auth.register.message') }}
          </div>
          <router-link
            class="text-white dark:text-black mt-12 text-xs font-normal transition duration-300 ease-in cursor-pointer hover:scale-101"
            :to="'login'"
            >{{ $t('auth.login.base') }}</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.user-name {
  background-color: #1d1d1d;
  border: 0.8px solid #979797;
}

.user-name.error {
  border: 1px solid red;
}

.dark .user-name {
  background-color: #d2d4b2;
}

.user-name::placeholder {
  color: #535353;
}

.password {
  background-color: #1d1d1d;
  border: 0.8px solid #979797;
}

.password.error {
  border: 1px solid red;
}

.dark .password {
  background-color: #d2d4b2;
}

.password::placeholder {
  color: #535353;
}
</style>

<script>
import { useTodosStore } from "@/stores/todos.js";
import { useAuthStore } from "@/stores/auth.js";
import {useDark, useToggle} from "@vueuse/core";

export default{
  setup() {
    const todosStore = useTodosStore();
    const authStore = useAuthStore();
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { todosStore, authStore, isDark, toggleDark };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    sendRequestLogout() {
      this.isLoading = true;
      this.authStore
        .logout({})
        .then(() => {
          this.$router.push({ path: "/login", replace: true });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.todosStore.params.complete = 'all'
    this.todosStore.getTodos();
  },
};
</script>

<template>
  <main class="bg-black dark:bg-white">
    <div class=" container px-8 sm:px-6 md:px-8 mx-auto">


      <div class="text-white dark:text-black text-2xl font-bold p-2 max-w-6xl mx-auto">
        {{ $t('profile.email') }} {{ authStore.tokenExist.email }}
      </div>

      <div class="text-white dark:text-black text-2xl font-bold p-2 max-w-6xl mx-auto">
        {{ $t('profile.role.title') }} {{ $t('profile.role.'+authStore.tokenExist.role) }}
      </div>

      <button
        @click="sendRequestLogout"
        :disabled="isLoading"
        :class="isLoading? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer'"
        class="text-white dark:text-black text-3xl font-bold text-center bg-gray-800 dark:bg-gray-400 w-full rounded p-3"
      >
        <svg
          v-if="isLoading"
          class="mr-3 size-5 animate-spin"
          viewBox="0 0 24 24"
        >
          <font-awesome-icon icon="fa-solid fa-circle-notch" />
        </svg>
        {{ $t('profile.button') }}
      </button>
    </div>
  </main>
</template>

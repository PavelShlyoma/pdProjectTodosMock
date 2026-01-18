<script>
import { useDark, useToggle } from "@vueuse/core";
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return { isDark, toggleDark };
  },
  components: {
    LanguageSwitcher,
  }
};
</script>
<template>
  <header class="bg-gray-600 dark:bg-gray-800 sticky top-0 left-0 w-full">
    <div
        class="container px-8 sm:px-6 md:px-8 h-24 content-center pb-1 m-auto"
    >
      <div class="flex items-center justify-between">
        <router-link
            to="/home"
            class="flex flex-col items-center gap-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
        >
          <font-awesome-icon
              class="text-white font-bold text-xl"
              icon="fa-solid fa-house"
          />
          <div class="text-white text-base font-medium">{{ $t('header.router.index') }}</div>
        </router-link>
        <div class="flex items-center gap-2">
          <div>
            <language-switcher />
          </div>
          <div>
            <button @click="toggleDark()">
              <font-awesome-icon
                  class="text-4xl text-white transition duration-300 ease-in cursor-pointer hover:scale-120"
                  v-if="!isDark"
                  icon="fa-solid fa-moon"
              />
              <font-awesome-icon
                  class="text-4xl text-white transition duration-300 ease-in cursor-pointer hover:scale-120"
                  v-else
                  icon="fa-solid fa-sun"
              />
            </button>
          </div>
          <router-link
              :to="'profile'"
              class="flex flex-col items-center gap-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
          >
            <font-awesome-icon
                class="text-white font-bold text-xl"
                icon="fa-solid fa-id-card-clip"
            />
            <div
                class="text-white font-bold text-xl"
            >{{ $t('header.router.profile') }}</div
            >
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
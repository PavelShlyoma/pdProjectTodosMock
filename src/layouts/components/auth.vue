<script>
import LanguageSwitcher from '../../components/LanguageSwitcher.vue'
import { useDark, useToggle } from "@vueuse/core";

export default {
  name: "authLayout",
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return { isDark, toggleDark };
  },
  components: {
    LanguageSwitcher
  }
}
</script>

<template>
  <main class="h-full overflow-y-hidden">
    <header class="bg-gray-600 dark:bg-gray-800 sticky top-0 left-0 w-full p-4">
      <div class="container mx-auto flex flex-row-reverse gap-3">
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
        <language-switcher />
      </div>
    </header>
    <router-view />
  </main>
</template>

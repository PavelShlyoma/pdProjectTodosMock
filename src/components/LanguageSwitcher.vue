<template>
  <div class="text-white">
    <select
        @change="changeLanguage(currentLocale)"
        class="text-white bg-gray-600 dark:bg-gray-800 p-1 rounded m-2 transition duration-300 ease-in cursor-pointer hover:scale-120"
        v-model="currentLocale"
    >
      <option value="en">🇺🇸 English</option>
      <option value="ru">🇷🇺 Русский</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',

  data() {
    return {
      currentLocale: this.$i18n.locale
    }
  },

  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentLocale = lang;
      localStorage.setItem('user-language', lang)
    }
  },

  mounted() {
    // Восстанавливаем язык при загрузке компонента
    const savedLang = localStorage.getItem('user-language')
    if (savedLang && savedLang !== this.currentLocale) {
      this.changeLanguage(savedLang)
    }
  }
}
</script>
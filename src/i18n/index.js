import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

const messages = {
    en,
    ru
}

const getInitialLocale = () => {
    const saved = localStorage.getItem('user-language')
    if (saved) return saved

    const browserLang = navigator.language.split('-')[0]
    return ['en', 'ru'].includes(browserLang) ? browserLang : 'ru'
}

const i18n = createI18n({
    locale: getInitialLocale(),
    fallbackLocale: 'en',
    messages
})

export default i18n
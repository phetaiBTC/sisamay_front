import { createI18n } from "vue-i18n"
import en from '../localization/en.json'
import la from '../localization/la.json'

const savedLocale = localStorage.getItem('app-locale') || 'la'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'la',
  messages: {   
    en,
    la,
  },
})

// /plugins/toastification.client.ts

import { defineNuxtPlugin } from '#app'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    const options = {
        // optional default options
    }
    nuxtApp.vueApp.use(Toast, options)
})

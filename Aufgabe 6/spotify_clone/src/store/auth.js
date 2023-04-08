import { defineStore } from "pinia";
import {useLocalStorage} from "@vueuse/core"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        refresh_token: useLocalStorage('refresh_token', null),
        access_token: useLocalStorage('access_token', null),
        expiresIn: useLocalStorage('expiresIn', null),
        code: useLocalStorage('code', null)
    }),
    actions: {
        reset() {
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            localStorage.removeItem('expiresIn')
            localStorage.removeItem('code')
            
            this.refresh_token = null
            this.access_token = null
            this.expiresIn = null
            this.code = null
        }
    }
})
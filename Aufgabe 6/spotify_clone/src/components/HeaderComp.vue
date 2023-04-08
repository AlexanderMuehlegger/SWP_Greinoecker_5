<template>
    <section v-if="authStore.code != null" class="h-12 w-full grid bg-black mb-2">
        <div class="place-self-end self-center py-1 px-4 mr-6 bg-green-300 rounded-lg">
            <button @click="logout">Logout</button>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '@/store/auth';
export default {
    data() {
        return {
            authStore: new useAuthStore()
        }
    },
    methods: {
        logout() {
            console.log(this.authStore)
            this.authStore.reset()

            window.location.reload()
        }
    }
}
</script>
<template>
  <section class="h-full flex flex-col bg-zinc-800">
    <div class="h-full flex flex-col">
      <div v-if="authStore.code != null">
        <HeaderVue/>
      </div>
      
      <div class="h-full shrink" v-if="authStore.code != null">
        <DashboardVue/>
      </div>
    </div>
    <div class="h-screen flex justify-center items-center" v-if="authStore.code==null">
      <LoginComp/>
    </div>
  </section>
</template>


<script>
/* eslint-disable */
import LoginComp from './components/LoginComp.vue';
import DashboardVue from './components/DashboardComp.vue'
import HeaderVue from './components/HeaderComp.vue'
//eslint-disable-next-line
import {auth, refresh} from '@/assets/js/useAuth'

import {useAuthStore} from '@/store/auth'

import {watch} from 'vue'

export default {
  name: 'SpotifyClone',
  components: {
    LoginComp, 
    DashboardVue,
    HeaderVue
  },
  setup(){
    const storeAuth = useAuthStore()

    watch(() => storeAuth.expiresIn, (newValue, oldValue) => {

      if (storeAuth.refresh_token || storeAuth.expiresIn){
        return
      }
      console.log("öaldkjföalkdföalkjfdöajf")

      storeAuth.interval = setInterval(() => {
        refresh(storeAuth.refresh_token)
      }, (this.expiresIn-60)*1000)
    })
    watch(() => storeAuth.refresh_token, (newValue, oldValue) => {
      if (storeAuth.refresh_token || storeAuth.expiresIn)
        return;

      storeAuth.interval = setInterval(() => {
        refresh(storeAuth.refresh_token)
      }, (this.expiresIn-60)*1000)
    })
    return {storeAuth}
  },
  data(){
    return {
      code: null,
      authStore: useAuthStore()
    }
  },
  methods: {
    handleURLChange(){
      let temp = new URLSearchParams(window.location.search).get('code')

      if(temp == null)
      return;
      
      console.log(temp)
      this.code = temp
      this.storeAuth.code = temp
    }
  },
  watch: {
    async code() {
        
      if(this.code == null)
        return null
      
      let result = await auth(this.code)
      console.log(result)

      if(!result)
        return;

      this.storeAuth.refresh_token = result.refreshToken 
      this.storeAuth.expiresIn = result.expiresIn
      this.storeAuth.access_token = result.accessToken
      return result
      
    }
  },
  mounted() {
    let temp = this.storeAuth.code
    if (['', null, undefined].includes(temp))
      this.code = null

    this.code = temp    
    this.handleURLChange()

    window.onhashchange = this.handleURLChange

  },
  beforeUnmount(){
    window.onhashchange = null
  }
}
</script>


<style>

#app {
  overflow: hidden;
}

</style>
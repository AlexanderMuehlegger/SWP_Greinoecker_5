<template>
  <div id="search-wrapper">
    <input type="text" v-model="search_word">
    <button @click="search">Search</button>
    <div class="result-container">
        <div class="result" v-for="result in results" :key="result.id">
          <img :src="result.thumb">
          <p>{{result.description}}</p>
          <button @click="edit(result.id)">Edit</button>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from 'axios'

export default defineComponent({
    data(){
        return {
            search_word: "",
            results: []
        }
    },
    methods: {
      search(){
        axios.get(this.$api + this.search_word)
          .then(response => this.results = response.data)
          .catch(e => console.error(e))
      },
      edit(id: number){
        console.log(id)
      }
    },
})
</script>

<style scoped>

</style>
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="search-component-container">
    <div id="search-wrapper">
    <input type="text" v-model="search_word" />
    <button @click="search">Search</button>
    <div class="result-container">
      <div class="result" v-for="result in results" :key="result.id">
        <button @click="edit(result.id)">Edit</button>
        <img
          class="image-text"
          :src="'https://webapp.uibk.ac.at/ubi/cat/' + result.thumb"
        />
        <p class="text" v-html="makeBold(result, search_word)"></p>
      </div>
    </div>
  </div>
  <div v-if="edit_mode" class="edit-article">
      <EditComponentVue @cancleEditMode="cancleEdit($event)" :id="selectedId"/>
  </div>
  </div>
</template>

<script lang="ts">
import EditComponentVue from './EditComponent.vue'
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  components: {
    EditComponentVue
  },
  data() {
    return {
      search_word: "",
      results: [],
      edit_mode: false,
      selectedId: -1
    };
  },
  methods: {
    async search() {
      await axios
        .get(this.$api + this.search_word)
        .then((response) => (this.results = response.data))
        .catch((e) => {
          if(e.code == 'ERR_NETWORK'){
            alert("Server is not reachable!");
          }
        });
    },
    edit(id: number) {
      console.log(id)
      this.selectedId = id;
      this.edit_mode = true;
    },
    makeBold(result: Array, search_word: string){
        let tryout = result.description;
        search_word = search_word.toLowerCase()
        // console.log(tryout.description.search(new RegExp(search_word, 'i  ')))
        let occurences = []
        let curIndex = -1;
        let oldIndex = -1;
        while(true){
          curIndex = tryout.toLowerCase().indexOf(search_word, oldIndex+1)

          if(curIndex <= oldIndex){
            break;
          }

          occurences.push(curIndex)
          oldIndex = curIndex
        }

        
        let boldAdded = 0
        for(let i = 0; i < occurences.length; i++){
          console.log(search_word.length)
          let index = occurences[i] + 7 * boldAdded
          tryout = tryout.replaceAt(index, '<b>')
          tryout = tryout.replaceAt(index+search_word.length+3, '</b>')
          boldAdded++
        }
      return tryout
    },
    cancleEdit(result: string){
      this.edit_mode = false
    }
  },
});
</script>

<style lang="scss">
.search-component-container {
  position: relative;
  width: 100%;
  height: 100%;
}
#search-wrapper {
  position: absolute;
}
.result {
  display: flex;
  flex-grow: 0;
  flex-direction: row;
  gap: 5rem;
  padding-inline: 2rem;
  padding-block: 1rem;
  width: 80%;

  & button {
    min-height: 20px;
    padding: 0.5rem;
    align-self: center;
    text-align: center;
    margin-block: 2rem;
  }

  & .text {
    text-align: center;
    align-self: center;
  }
}

.image-text {
  min-width: 250px;
  max-width: 400px;
  width: 40%;
  aspect-ratio: 2/1.5;
  object-fit: contain;
  padding: 0;
  margin: 0;
}

.edit-article {
  z-index: 10000000;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  border: 2px solid black;
  background-color: #fff
}
</style>

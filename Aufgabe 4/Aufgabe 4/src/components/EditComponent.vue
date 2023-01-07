<template>
  <div class="edit-wrapper">
    <div class="edit" v-show="!showHist">
      <button @click="showHist = true">Show History</button>
      <button @click="cancleEditMode">Cancle Change</button>
      <h2>Description:</h2>
      <textarea name="description" id="description_edit" v-model="article_data.description" cols="100" rows="10">
      </textarea>
      <img
      class="image-text"
      :src="'https://webapp.uibk.ac.at/ubi/cat/' + article_data.thumb" alt="">
      <button class="save-button" @click="changeDescription">Save Changes</button>
    </div>
    <div class="history-sum" v-show="showHist">
      <button @click="showHist = false">Hide History</button>
      <HistoryComponent :histories="history"/>
    </div>
  </div>
</template>

<script lang="ts">
import HistoryComponent from './HistoryComponent.vue'

import axios from 'axios';
import {disableScrollBar, enableScrollBar} from '@/assets/js/DisableScroll.js'
export default {
  components: {
    HistoryComponent
  },
  data() {
    return {
      article_data: {},
      original_article: {},
      history: {},
      showHist: false
    };
  },
  props: {
    id: {
      default: -1,
    },
  },
  methods: {
    async changeDescription(){
      if (this.article_data.description == this.original_article.description){
        alert("No changes have been made!")
        return;
      }
      await axios.patch(this.$rest + this.id, {
        params: {
          description: this.article_data.description
        }
      })
      .then(() => {
        this.cancleEditMode()
      })
      .catch(() => {
        alert("Something went wrong width Saving the changes")
      })

      
    },
    changeTextAreaDescription(){
      this.article_data = this.$parent?.$data.results.find((e) => e.id == this.id)
      this.original_article = Object.assign({}, this.article_data)
      console.log(this.article_data.description)
    },
    cancleEditMode(){
      this.$emit('cancleEditMode')
    },
    async getHistory(){
        let response = await axios.get(this.$hist + this.id)
        console.log(response.data)
        return response.data
    }

  },
  async mounted(){
    this.changeTextAreaDescription()
    disableScrollBar()
    this.history = await this.getHistory()
  },
  beforeUnmount(){
    enableScrollBar()
  },
  watch: {
    id() {
      this.changeTextAreaDescription()
    }
  }
};
</script>


<style lang="scss">
.edit {
  width: 100%;
  height: 100%;
}
.edit-wrapper {
  display: grid;
  align-content: center;
  width: fit-content;
  max-width: 80vw;
}

</style>

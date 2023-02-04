<template>
  <header>
    

  </header>

  <main class="container mt-4 overflow-hidden">
    <div class="flex text-lg p-2 border min-w-min max-w-fit">
      <Dropdown type="countries" @onInputChange="inputChangeCountry($event)"/>
      <Dropdown type="events" @onInputChange="inputChangeEvent($event)"/>
    </div>
    <div class="flex flex-none gap-5 sm:flex-col xl:flex-row">
      <DataTable v-if="currentCountry != undefined" 
        className="p-4 mt-4 mb-4 border sm:w-2/5 lg:w-full max-w-[40%]" 
        :data="medals"
        :columns="['Medaille', 'Anz']"
      />
      <PlotComp v-if="medalsGender.length != 0" type="bar" :xValue="['Gold', 'Silber', 'Bronze']" :yValues="medalsGender"/>
    </div>
  </main>
</template>

<script>
import Dropdown from './components/UI/Dropdown.vue';
import DataTable from './components/DataTable.vue';
import PlotComp from './components/PlotComp.vue';
import axios from 'axios';
export default {
  components: {
    Dropdown, 
    DataTable,
    PlotComp
  },
  data() {
    return {
      currentCountry: undefined,
      currentEvent: undefined,
      medals: [],
      medalsGender: []
    }
  },
  async mounted() {
    await this.getMedalsCountSex()
  },
  methods: {
    async inputChangeCountry(e){
      this.currentCountry = e
      let response_medals = await axios.get(this.$hostname + `medals/${e}`)
      
      this.medals = response_medals.data
      console.log(this.medalsGender)

    },
    inputChangeEvent(e){
      this.currentEvent = e
    },
    async getMedalsCountSex(){
      let response_gender_medals = await axios.get(this.$hostname + 'count_by_sex')
      
    response_gender_medals.data.forEach(element => {
        element[0] = element[0]=='M'? 'Male': 'Female'
      })
      response_gender_medals = response_gender_medals.data

      let males = response_gender_medals.filter(element => element.includes('Male'))
      let females = response_gender_medals.filter(element => element.includes('Female'))

    let male = [
      "Male",
      males.find(element => element.includes('Gold'))[2],
      males.find(element => element.includes('Silver'))[2],
      males.find(element => element.includes('Bronze'))[2],
    ]

    let female = [
      "Female",
      females.find(element => element.includes('Gold'))[2],
      females.find(element => element.includes('Silver'))[2],
      females.find(element => element.includes('Bronze'))[2],
    ]

    this.medalsGender = [male, female]
    }
  }

}
</script>

<style scoped>
[v-cloak]{
  display: none;
}
</style>

<style src="./assets/tailwind.css"></style>
<style src="./assets/bootstrap.css"></style>
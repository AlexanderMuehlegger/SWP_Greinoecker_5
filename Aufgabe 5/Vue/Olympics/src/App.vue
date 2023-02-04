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
      <PlotComp v-if="medalsGender.length != 0" type="bar" :xValue="['Gold', 'Silber', 'Bronze']" :yValues="medalsGender" title="Male Female Medal"/>
    </div>
    <div class="height-part">
      <PlotComp v-if="renderPlot == true" type="scatter" :xValue="years" :yValues="heights" type_="height" title="Age-Height-AVG"/>
    </div>
    <div class="height-part">
      <PlotComp v-if="renderPlot == true" type="bar" :xValue="['Gold', 'Silber', 'Bronze']" :yValues="medalsEvent" title="Medal per Event"/>
    </div>
    <div class="height-part">
      <PlotComp v-if="renderPlot == true" type="pie" :xValue="weight_avg.xValues" :yValues="weight_avg.yValues" title="Top 5 Weight Avg" type_="height"/>
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
      medalsGender: [],
      renderPlot: false,
      years: [],
      heights: [],
      medalsEvent: [],
      weight_avg: {
        xValues: [],
        yValues: []
      }
    }
  },
  async mounted() {
    
  },
  methods: {
    async inputChangeCountry(e){
      this.currentCountry = e
      await this.getMedalsCountSex()
      await this.getHeightData()
      await this.getWeightData()
      this.renderPlot = false
      let response_medals = await axios.get(this.$hostname + `medals/${e}`)
      
      this.medals = response_medals.data
      this.renderPlot = true
    },
    async inputChangeEvent(e){
      this.currentEvent = e

      this.renderPlot = false
      await this.getHeightData()
      await this.getMedalsEvent()
      this.renderPlot = true

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
    },
    async getHeightData(){
      let response = await axios.get(`${this.$hostname}height/${this.currentCountry}`)
      response = this.$sortByKey(response.data, 'age')
      console.log(response)

      let handler = {
        get: function(target, name){
          return target.hasOwnProperty(name) ? target[name] : 0
        }
      }

      let age_obj = {}
      let height_obj = {}
      let age_count = new Proxy(age_obj, handler)
      let height_avg = new Proxy(height_obj, handler)

      response.forEach(i => {
        age_count[i.age] += 1
        height_avg[i.age] += i.height
      })

      Object.keys(age_obj).forEach(key => {
        height_obj[key] /= age_obj[key]
        this.years.push(key)
        this.heights.push(height_obj[key])
      })

      this.years = Object.values(this.years)
      this.heights = Object.values(this.heights)
    },
    async getMedalsEvent(){
      let result = await axios.get(`${this.$hostname}event/${this.currentEvent}`)
      this.medalsEvent = result.data
      console.log(this.medalsEvent)
    },
    async getWeightData(){
      let result = await axios.get(`${this.$hostname}weight/${this.currentCountry}`)
      let results = result.data
      results = results.sort((a, b) => {
        return Object.values(a)[0] - Object.values(b)[0]
      })
      results = results.slice(-5)
      let xValues = []
      let yValues = []
      results.forEach(e => {
        xValues.push(Object.keys(e)[0])
        yValues.push(Object.values(e)[0])
      })
      this.weight_avg = {
        xValues: yValues,
        yValues: xValues
      }
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
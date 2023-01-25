<template>
  <section>
    <select class="border-2 outline-none mx-2" :ref="'dropdown-' + id" @input="inputChange">
        <option value="">Select</option>
        <option v-for="countryN in data">{{ countryN }}</option>
    </select>
  </section>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            id: Math.floor(Math.random()*10000000),
            data: []
        }
    },
    props: ['type'],
    async beforeMount(){
        if(this.type == 'countries'){
            let countries = await this.getCountries()
            countries.forEach(element => {
                this.data.push(element.noc)
            })
        
        }else if(this.type == 'events'){
            let events = await this.getEvents()
            events.forEach(element => {
                this.data.push(element.event)
            })

        }
        
    },
    methods: {
        async getCountries(){
            let response = await axios.get(this.$hostname + "regions")
            return response.data
        },
        async getEvents(){
            let response = await axios.get(this.$hostname + "events")
            return response.data
        },
        inputChange(){
            this.$emit("onInputChange", this.data[this.$refs[`dropdown-${this.id}`].selectedIndex-1])
        }
    }
}
</script>

<style>

</style>
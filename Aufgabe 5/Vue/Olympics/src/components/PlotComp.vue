<template>
    <VuePlotly :data="data" :layout="layout"/>
</template>

<script>
import { VuePlotly } from 'vue-plotly'
export default{
    component: {
        VuePlotly
    },
    props: ['xValue', 'yValues', 'type'],
    data() {
        return{
            // data: [],
            // layout: {
            //     title: 'Male Female'
            // }
            data:[{
                x: [1,2,3,4],
                y: [10,15,13,17],
                type:"scatter"
            }],
            layout:{
                title: "My graph"
            }
        }
    },
    beforeMount(){
        return;
        let data = []
        let x = 0
        for(let yValue in this.yValues){
            yValue = this.yValues[yValue]
            data.push({
                x: this.xValue,
                y: yValue,
                type: this.type
            })
        }
        console.log(data)
        this.data = data
    }
}
</script>
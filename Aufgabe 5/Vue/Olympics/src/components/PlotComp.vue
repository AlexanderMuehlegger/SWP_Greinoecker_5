<template>
    <VuePlotly className="sm:max-w-full lg:max-w-[50%]" :data="data" :layout="layout" :display-mode-bar="false"/>
</template>

<script>
import { VuePlotly } from 'vue3-plotly'
export default{
    components: {
        VuePlotly
    },
    props: ['xValue', 'yValues', 'type'],
    data() {
        return{
            data: [],
            layout: {
                title: 'Male Female'
            }
        }
    },
    beforeMount(){
        let data = []
        let x = 0
        console.log(this.yValues)
        for(let yValue in this.yValues){
            yValue = this.yValues[yValue]
            let trace_name = yValue[0]
            yValue = yValue.slice(1)
            console.log(yValue)
            data.push({
                x: this.xValue,
                y: yValue,
                type: this.type,
                name: trace_name
            })
        }
        this.data = data
    }
}
</script>
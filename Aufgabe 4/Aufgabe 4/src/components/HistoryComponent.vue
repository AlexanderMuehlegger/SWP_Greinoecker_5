<template>
  <section class="history-view">
    <div class="history-sum-container">
        <div class="history" v-for="history in histories" :key="history.id">
            <p class="date">{{ history.date }}</p>
            <p class="description" >{{ history.changed_desc }}</p>
        </div>
        <div v-if="histories.length == 0">
            No History
        </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
    data(){
        return{

        }
    },
    props: {
        histories: {
            required: true
        }
    },
    mounted(){
        console.log(this.histories)
    }

}
</script>

<style lang="scss">
.history {
    position: relative;
}
    .history-view {
        max-width: 60vw;
        height: 60vh;
        padding: 1rem;

        &::-webkit-scrollbar{
            display: none;
        }

        & .history{
            & .date{
                font-weight: bold;
            }

            & .description {
                border-bottom: 1.25px solid black;
                padding-bottom: 1rem;
            }
        }

    }

    .history-sum-container {
        overflow-y: auto;
        height: 100%;
    }

    
</style>
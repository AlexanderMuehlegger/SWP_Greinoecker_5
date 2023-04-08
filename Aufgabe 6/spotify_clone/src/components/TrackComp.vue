<template>
    <section>
        <div v-for="track in tracks" :key="track.artist + makeid(7)" 
        class="flex hover:cursor-pointer" 
        @click="chosenTrack(track)">
                <img :src="track.albumUrl" alt="">
                <div class="my-auto pl-5">
                    <p>{{track.title}}</p>
                    <p class="text-sm text-gray-500">{{track.artist}}</p>
                </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['tracks'],
    methods: {
        chosenTrack(track){
            this.$emit('playTrack', track)
        },
        makeid(length) {
            let result = ''
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            const charactersLength = characters.length
            let counter = 0

            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
                counter += 1
            }
            
            return result
        }
    }
}
</script>
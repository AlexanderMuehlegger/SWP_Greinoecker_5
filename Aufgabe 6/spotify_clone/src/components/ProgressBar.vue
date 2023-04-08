<template>
    <div class="w-full">
        <div v-if="type == 'timeline'" class="w-1/2 h-4 flex gap-2 items-center justify-center z-30" id="progress_bar_offset_y">
            <p class="p-1 text-white">{{ formatTime(currentPos) }}</p>
            <div id="progress_bar_placeholder" class="relative w-full  max-w-2xl h-1/4 overflow-hidden rounded-xl border-separate"> 
                <div id="progress_bar" style="transform: scaleX(0)" class="relative mt-auto mb-auto w-full max-w-2xl h-full bg-green-500 origin-left"></div>
            </div>
            <p class="p-1 text-white">{{ formatTime(duration) }}</p>
        </div>
        <div v-else-if="type == 'soundchooser'" class="w-3/4 h-4 max-w-[115px] flex gap-2 items-center z-30" id="progress_bar_offset_y_volume">
            <div id="progress_bar_placeholder_volume" class="relative w-full  max-w-2xl h-1/4 overflow-hidden rounded-xl border-separate"> 
                <div id="progress_bar_volume" style="transform: scaleX(0)" class="relative mt-auto mb-auto w-full max-w-2xl h-full bg-green-500 origin-left"></div>
            </div>
        </div>
        <div v-else>
            <p class="text-red-700">No Type Selected</p>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import SpotifyWebAPi from 'spotify-web-api-node'


/* eslint-disable */
export default {
    components: {

    },
    props: ['pos', 'duration', 'type', 'playing'],
    data() {
        return {
            incrementIntervals: [],
            syncingIntervals: [],
            currentPos: 0,
            toClear: false
        }
    },
    setup(){
        const spotifyApi = new SpotifyWebAPi({
                clientId: 'b284efe9d3d04f93aacbc01162f63a08'
        })
        const authStore = new useAuthStore()

        spotifyApi.setAccessToken(authStore.access_token)
        
        return {spotifyApi, authStore}
    },
    methods: {
        formatTime(milliseconds){
            const seconds = Math.floor(milliseconds/1000)
            const minutes = Math.floor(seconds/60)

            const remainingSec = seconds%60
            const remainingMin = minutes%60
            
            const timeString = `${remainingMin.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`

            return timeString
        },
        initTimeline(){
            let progress_bar = document.getElementById('progress_bar_offset_y')
            let progress_bar_ = document.getElementById('progress_bar_placeholder')
            progress_bar.addEventListener('click', (event) => {
                let target = event.target

                if(target.id != 'progress_bar_offset_y' && target.id != 'progress_bar_placeholder') return
                
                let rect = progress_bar_.getBoundingClientRect()

                let x = Math.round((event.clientX - rect.left))
                let y = Math.round((event.clientY - rect.top))
                let max_length = Math.round(rect.right - rect.left)
                x = (x < 0)? 0 : x
                x = (x > max_length)? max_length : x
                y = (y < 0)? 0 : y


                this.clear()

                this.currentPos = this.duration * (x/max_length)
                this.$emit('posChange', Math.round(this.currentPos))
                document.getElementById('progress_bar').style.transform = `scaleX(${this.currentPos/this.duration})`
            })


            this.initTimelineInterval()
            
        },
        initTimelineInterval() {
            if(this.incrementInterval) clearInterval(this.incrementInterval)
            let progress_bar = document.getElementById('progress_bar')

            let interval = setInterval(()=> {
                if(this.currentPos == 0 && this.duration == 0) return;
                if(!this.playing) return;
                
                if(this.incrementIntervals.length > 1)
                    this.clear(1)

                this.currentPos += 1000
                if(this.currentPos >= this.duration){
                    this.currentPos = this.duration
                    progress_bar.style.transform = `scaleX(${this.currentPos/this.duration})`
                    this.clear()
                }
                progress_bar.style.transform = `scaleX(${this.currentPos/this.duration})`
            }, 1000)


            if (this.syncingIntervals.length > 0) return;

            let syncInterval = setInterval(() => {
                this.spotifyApi.getMyCurrentPlaybackState()
                    .then((res) => {
                        this.currentPos = res.body.progress_ms
                    })
            }, 7500)

            this.incrementIntervals.push(interval)
            this.syncingIntervals.push(syncInterval)
        },
        initVolume(){
            let progress_bar = document.getElementById('progress_bar_offset_y_volume')
            let progress_bar_ = document.getElementById('progress_bar_placeholder_volume')
            progress_bar.addEventListener('click', (event) => {
                let target = event.target

                if(target.id != 'progress_bar_offset_y_volume' && target.id != 'progress_bar_placeholder_volume') return
                
                let rect = progress_bar_.getBoundingClientRect()

                let x = Math.round((event.clientX - rect.left))
                let y = Math.round((event.clientY - rect.top))
                let max_length = Math.round(rect.right - rect.left)
                x = (x < 0)? 0 : x
                x = (x > max_length)? max_length : x
                y = (y < 0)? 0 : y


                this.currentPos = Math.round((x/max_length)*100)/100
                x = (x > .95)? 1 : x  
                this.$emit('volumeChange', this.currentPos)
                document.getElementById('progress_bar_volume').style.transform = `scaleX(${this.currentPos})`
            })


            
        },
        changeVolume(volume) {
            volume = (volume > 1)? 1 : volume
            volume = (volume < 0)? 0 : volume

            this.currentPos = volume
            document.getElementById('progress_bar_volume').style.transform = `scaleX(${this.currentPos})`
        },
        clear(leave=0) {
            this.incrementIntervals.forEach((element, index) => {
                if(index >= leave){
                    clearInterval(element)
                }
                this.incrementIntervals.splice(index, 1)
            })
        }
    },
    watch: {
        pos(){
            this.currentPos = this.pos
            if(this.type == 'soundchooser'){
                document.getElementById('progress_bar_volume').style.transform = `scaleX(${this.currentPos})`
            }
        },
    },
    mounted() {
        switch(this.type){
            case 'timeline':
                this.initTimeline()
                break;
            case 'soundchooser':
                this.initVolume()
                break;
        }
    }
}
</script>

<style>

#progress_bar_placeholder::before,
#progress_bar_placeholder_volume::before{
    content: '';
    width: 100%;
    height: 100%;
    max-width: 42rem;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(146, 146, 146);
    transform: scaleX(1);
}

</style>
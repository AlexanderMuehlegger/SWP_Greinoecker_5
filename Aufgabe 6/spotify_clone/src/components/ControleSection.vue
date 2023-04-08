<template>
    <section class="relative bg-black w-full flex justify-center items-center p-4 z-10">
        <div v-if="activeImgSrc != null" class="flex-shrink-0 flex">
            <img v-show="activeImgSrc !=''" class="w-16 aspect-square object-contain" :src="activeImgSrc" alt="">
            <div class="flex flex-col justify-center ml-6 text-white">
                <p class="text-sm font-bold">{{ capString(currentSong, 24) }}</p>
                <p class="text-xs ">{{ currentPublisher.join(', ') }}</p>
            </div>
        </div>
        <div class="flex-grow">
            <div class=" flex gap-2 justify-center items-center">
                <button :disabled="player==null" class="btn disabled:cursor-not-allowed bg-[url(@/assets/icons/next.svg)] bg-cover bg-no-repeat bg-center scale-75 w-6 h-6 rotate-180 " @click="playPrev"/>
                <button v-if="!playing" :disabled="player==null" class="btn disabled:cursor-not-allowed bg-[url(@/assets/icons/play.svg)] bg-cover bg-no-repeat bg-center scale-75 w-6 h-6 " @click="togglePlay"/>
                <button v-else :disabled="player==null" class="btn disabled:cursor-not-allowed bg-[url(@/assets/icons/pause.svg)] bg-cover bg-no-repeat bg-center scale-75 w-6 h-6 " @click="togglePlay"/>
                <button :disabled="player==null" class="btn disabled:cursor-not-allowed bg-[url(@/assets/icons/next.svg)] bg-cover bg-no-repeat bg-center scale-75 w-6 h-6 " @click="playNext"/>
            </div>
            <div>
                <ProgressBar :playing="playing" @posChange="posChange" :pos="currentPos" :duration="currentDur" type="timeline"
                    class="flex justify-center items-center mt-3"/>
            </div>
        </div>
        <div class="flex-grow-half content-end">
            <ProgressBar :pos="currVolume" type="soundchooser"
                class="flex justify-center"
                @volumeChange="volumeChange"/>
        </div>
    </section>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import { useAuthStore } from '@/store/auth'
import SpotifyWebAPi from 'spotify-web-api-node'

export default {
    components: {
        ProgressBar
    },
    props: ['player'],
    data() {
        return {
            currentPublisher: [],
            currentSong: '',
            activeImgSrc: '',
            setEventListener: false,
            currentPos: 0,
            currentDur: 0,
            authStore: new useAuthStore(),
            currVolume: 0.5,
            playing: false
        }
    },
    methods: {
        playPrev() {
            this.player.previousTrack()
                .then(() => {
                    console.log("Skipped to Previous Track")
                })
        },
        togglePlay() {
            this.player.togglePlay()
                .then(() => {
                    console.log("Toggled Play")
                })
        },
        playNext(){
            this.player.nextTrack()
                .then(() => {
                    console.log("Skipped Track")
                })
        },
        setActiveTrackImg(imgSrc){
            this.activeImgSrc = imgSrc
        },
        capString(str, maxLength) {
            if (str.length <= maxLength) {
                return str
            } else {
                return str.slice(0, maxLength) + '...'
            }
        },
        async posChange(event) {
            const spotifyApi = new SpotifyWebAPi({
                clientId: 'b284efe9d3d04f93aacbc01162f63a08'
            })

            spotifyApi.setAccessToken(this.authStore.access_token)


            await spotifyApi.seek(event)
                .then(() => {
                    console.log("seeked position")
                })
                .catch(() => {
                    console.error("Something went wrong during seek")
                })
        },
        async volumeChange(event) {
            await this.player.setVolume(event)
                .then(() => {
                    console.log("Volume changed")
                })
        }
    },
    watch: {
        player() {
            if(this.player == null){
                console.log("player null")
                return;
            } 
            if(this.setEventListener) return
                

            this.player.addListener('player_state_changed', ( {
                position,
                duration,
                paused,
                track_window: {current_track}
            }) => {
                this.activeImgSrc = current_track.album.images[0].url

                this.currentPublisher = current_track.artists.map(a => a.name)
                this.currentSong = current_track.album.name

                this.playing = !paused
                console.log('Position in Song', position)
                console.log('Duration of Song', duration)

                this.currentPos = position
                this.currentDur = duration

            })

            console.log("Set event listener")
        }
    },
    async created() {
        if(this.player == null) return;


        await this.player.getCurrentState().then(state => {
            console.log(state)
        })
        await this.player.getVolume()
            .then(volume => {
                this.currVolume = volume
            })
    }
}
</script>

<style scoped>

.flex-grow-half {
    flex-grow: 0.125;
}

</style>

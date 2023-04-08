<template>
    <div class="h-full flex flex-col flex-grow text-white">
        <div class=" flex-grow overflow-y-auto mb-40 mx-10">
            <input type="text" name="search-box" id="search-box" 
                placeholder="Search Songs/Artists" 
                class="w-60 h-max text-sm border-solid border-2 outline-none text-black"
                v-model="search">
            <div>
                <div v-if="searchResults.length > 0">
                    <TrackComp :tracks="searchResults" @playTrack="playTrack"/>
                </div>
                <p v-else>No Songs/Artists found!</p>
            </div>
        </div>
        <div class="w-full flex-shrink-0 absolute bottom-0">
            <ControleSection ref="controleSection" class="place-self-end" :player="this.player"/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import SpotifyWebAPi from 'spotify-web-api-node'
import {useAuthStore} from '@/store/auth'

import ControleSection from './ControleSection.vue'
import TrackComp from './TrackComp.vue'
import axios from 'axios'

export default {
    components: {
        TrackComp,
        ControleSection
    },
    setup() {
        const spotifyAPi = new SpotifyWebAPi({
            clientId: 'b284efe9d3d04f93aacbc01162f63a08'
        })

        const authStore = useAuthStore()

        return {spotifyAPi, authStore}
    },
    data(){
        return {
            search: null,
            searchResults: [],
            player: null,
            deviceID: null
        }
    },
    watch:{
        search(){
            if(!this.search) {
                this.searchResults = []
                return;
            }
            if(!this.authStore.access_token) return;

            this.spotifyAPi.setAccessToken(this.authStore.access_token)

            this.spotifyAPi.searchTracks(this.search)
                .then(res => {
                    this.searchResults = res.body.tracks.items.map(track => {
                        const smallestAlbumImage = track.album.images.reduce(
                            (smallest, image) => {
                                if(image.height < smallest.height) return image
                                return smallest
                            }, track.album.images[0])

                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: smallestAlbumImage.url
                        }
                    })
                })
        }
    },
    mounted(){
        setTimeout(() => {
            this.player = new Spotify.Player({
                name: "My Web Playback",
                getOAuthToken: cb => {cb(this.authStore.access_token)},
                volume: 0.05
            })
            this.player.connect()
                .then(res => {
                    if(res)
                        console.log("The Playback successfully connected to Spotify")
                })
            this.player.addListener('ready', ({device_id}) => {
                console.log(`Device is Ready with ID: ${device_id}`)
                let deviceIds = [device_id]
                this.deviceID = device_id
                this.spotifyAPi.setAccessToken(this.authStore.access_token)
                this.spotifyAPi.transferMyPlayback(deviceIds, {play: true})
                        .then(function() {
                            console.log('Transfering playback to ' + deviceIds);
                        }, function(err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.error('Something went wrong!', err);
                        });
            })
            window.onbeforeunload = () => {
                console.log("disconnecting")
                this.player.disconnect()
            }
        }, 1000)
    },
    methods: {
        async playTrack(event) {
            console.log(event)
            if(!this.deviceID) return;
            if(!this.authStore.access_token) return
            let config = { 
                headers: {
                    'Authorization': `Bearer ${this.authStore.access_token}`
                },
                data: {
                    device_id: this.deviceID
                },
                url: `https://api.spotify.com/v1/me/player/queue?uri=${event.uri}`,
                method: 'post'
            }
            await axios(config)
            this.player.nextTrack()
            this.setActiveTrackImg(event.albumUrl)
        },
        setActiveTrackImg(imgSrc){
            this.$refs.controleSection.setActiveTrackImg(imgSrc)
        }
    }
}

</script>

<style>
#controleSection {
    flex-shrink: 1
}

#songList {
    flex-grow: 9
}
</style>
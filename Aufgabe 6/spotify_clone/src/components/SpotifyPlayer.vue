<template>
    <div>
        <audio id="my-audio"></audio>
        <button @click="start">Start</button>
        <button @click="logState">Log State</button>
        <button @click="activateSpot">Activate</button>
    </div>
</template>

<script>
/* eslint-disable */
// import SpotifyWebApi from 'spotify-web-api-js'
// import SpotifyPlayer from 'spotify-player'
import { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET } from '@/assets/spotify-auth/spotify_keys';

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://spotify-clone.myapp/',
  refreshToken: 'YOUR_REFRESH_TOKEN'
});


export default {
    data(){
        return {
            player: null,
            accessToken: ACCESS_TOKEN,
            trackUri: 'https://open.spotify.com/track/0yxPUMQsHJXThYjYMoIJU5?si=1bcb1e22f4334fad'
        }
    },
    created(){
        window.onSpotifyWebPlaybackSDKReady = () => {
            this.player = new Spotify.Player({
                name: 'My Web Playback SDK Player',
                getOAuthToken: cb => { cb(this.accessToken);},
                volume: 0.5
            });

            this.player.connect().then(success => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            });
            
            this.player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                const trackUri = 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6';
                const play = {
                    device_id: device_id,
                    uris: [trackUri]
                };
                this.player._options.getOAuthToken(access_token => {
                    fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    body: JSON.stringify(play),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    }).catch((error) => console.error(error));
                });
            });

            this.player.addListener('initialization_error', ({ message }) => { 
                console.error(message);
            });

            this.player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            this.player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

        }
    },
    methods: {
        async start(){
            this.player.resume('spotify:track:6rqhFgbbKwnb9MLmUQDhG6')
        },
        async getCurrentTrackID(){
            let trackId = ''
            await this.player.getCurrentState().then((state) => {
                if(state !== null){
                    trackId = state.track_window.current_track.id
                    console.log(`Current Track ID is: ${trackId}`)
                    
                }else{
                    console.error("error", state)
                }
            })
            return trackId
        },
        logState(){
            this.player.getCurrentState().then((state)=> {
                console.log(state)
            })
        },
        activateSpot(){
            
            this.player.activateElement(document.getElementById('my-audio'))
        }
    }
}
</script>

<style>

</style>
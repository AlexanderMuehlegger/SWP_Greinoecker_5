
<script setup>
  import ACCESS_TOKEN from '@/assets/spotify-auth/spotify_keys'

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = ACCESS_TOKEN;
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });
  

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  player.addListener('initialization_error', ({ message }) => { 
      console.error(message);
  });

  player.addListener('authentication_error', ({ message }) => {
      console.error(message);
  });

  player.addListener('account_error', ({ message }) => {
      console.error(message);
  });
}
</script>

<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'SpotifyClone',
  components: {

  }
}
</script>

<style>
</style>

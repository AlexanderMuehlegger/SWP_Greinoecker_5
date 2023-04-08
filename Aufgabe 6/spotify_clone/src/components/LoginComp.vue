<template>
    <section class="">
        <a :href="AUTH_URL" class="bg-green-500 hober:bg-green-700 w-min text-white font-bold py-2 px-4 rounded">Login</a>
    </section>
</template>

<script>

export default {
    data(){
        return {
            AUTH_URL: "https://accounts.spotify.com/authorize?client_id=b284efe9d3d04f93aacbc01162f63a08&response_type=code&redirect_uri=http://localhost:8080/&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20streaming%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-follow-modify%20user-follow-read%20user-read-playback-position%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read%20user-read-email%20user-read-private"
        }
    },
}

</script>

<style>

</style>
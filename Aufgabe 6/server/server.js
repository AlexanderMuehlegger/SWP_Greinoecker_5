const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const spotifyWebAPi =require('spotify-web-api-node')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/login', (req, res) => {
    console.log("HELLOOOOOOo")
})


app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    const spotifyAPi = new spotifyWebAPi({
        redirectUri: 'http://localhost:8080/',
        clientId: 'b284efe9d3d04f93aacbc01162f63a08',
        clientSecret: '2ebff068b9474cda8cd6db17c4a8ea40'
    })

    spotifyAPi.refreshAccessToken()
        .then((data) => {

            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })

        })
        .catch((err) => {
            console.log("Could not refresh access token", err)
        })
})


app.post('/login', (req, res)=> {
    const code = req.body.code
    console.log(code)
    const spotifyAPi = new spotifyWebAPi({
        redirectUri: 'http://localhost:8080/',
        clientId: 'b284efe9d3d04f93aacbc01162f63a08',
        clientSecret: '2ebff068b9474cda8cd6db17c4a8ea40'
    })

    spotifyAPi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => {
        console.log(err.body)
        res.sendStatus(400)
    })

})

app.listen(8081, ()=> {
    console.log("Listening on Port: 8081")
})
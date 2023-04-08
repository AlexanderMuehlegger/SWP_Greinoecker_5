import axios from 'axios'

//eslint-disable-next-line
export async function auth(code) {
    if(code == null)
      return;

    let obj;
    await axios.post("http://localhost:8081/login", {code})
    .then(res => {
      window.history.pushState({}, null, "/")
      console.log(res)
      obj = {
        accessToken: res.data.accessToken,
        expiresIn: res.data.expiresIn,
        refreshToken: res.data.refreshToken,
      }
    })
    .catch((err) => {
        console.error(err)
    })

    return obj
}

export async function refresh(refresh_token){
    if(refresh_token == null)
      return;

    let obj;
    await axios.post("http://localhost:8081/refresh", {refresh_token})
    .then(res => {
      console.log(res)
      obj = {
        accessToken: res.data.accessToken,
        expiresIn: res.data.expiresIn,
      }
    })
    .catch(() => {
        window.location="/"
    })

    return obj
}


export default {
    getWeather
}



function getWeather(lat, lon) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=1960f555fc16289521b949e9f716c0fa`)
        .then(res => res.data)

}
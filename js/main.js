console.log('Main!');

import weatherService from './services/weather.service.js'
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'



locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));


    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })

}

document.querySelector('.btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
                .then(() => {
                    mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                    mapService.getAddressName(pos.coords.latitude, pos.coords.longitude)
                        .then(name => {
                            renderAddress(name.results[0].formatted_address);
                        })
                    weatherService.getWeather(pos.coords.latitude, pos.coords.longitude)
                        .then(pos => {
                            console.log(pos.weather[0].description) // descriptive weather
                            console.log(pos.main.temp)      // temp in Kelvin (need to convert to celsius)
                            console.log(pos.wind.speed)     // wind speed in  m/s
                            console.log(pos.weather[0])  // weather icon
                            renderWeatherIcon(pos.weather[0].icon)  // weather icon
                        })

                })
        })
    console.log('Aha!', ev.target);
})



function renderAddress(address) {
    document.querySelector('h3').innerText = 'Location: ' + address;
}


document.querySelector('.address-input').addEventListener('input', (ev) => {

    var requstedAddress = ev.target.value;
    if (requstedAddress.length < 4) return
    mapService.getAddressLatlng(requstedAddress)
        .then(loc => {
            console.log(loc.results[0].geometry.location);

            var latlng = loc.results[0].geometry.location;
            mapService.panTo(latlng.lat, latlng.lng)
            mapService.addMarker(latlng)

        })
})


function renderWeatherIcon(icon) {
    var elImg = document.createElement("IMG")
    elImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    document.querySelector('.weather').appendChild(elImg);
}


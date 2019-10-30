'use strict'

import weatherService from './services/weather.service.js'
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'






window.onload = () => {
    var lat = +getParameterByName('lat')
    var lng = +getParameterByName('lng')
    if (!lat && !lng) {
        mapService.initMap(32.0749831, 34.9120554)
            .then(() => {
                mapService.addMarker({ lat:32.0749831, lng:34.9120554 });
                hendelPos()
    
            })
            .catch(console.log('INIT MAP ERROR'));
    }else{
        mapService.initMap(lat, lng)
        .then(() => {
            mapService.addMarker({ lat:lat, lng:lng });
            // hendelPos()

        })
        .catch(console.log('INIT MAP ERROR'));
    }



    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })

}

document.querySelector('.btn').addEventListener('click', (ev) => {
    hendelPos()
})

function hendelPos() {
    locService.getPosition()
        .then(pos => {
            // console.log('User position is:', pos.coords);
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
}



function renderAddress(address) {
    document.querySelector('h3').innerText = 'Location: ' + address;
    document.querySelector('.address-input').placeholder = address


}


document.querySelector('.address-input').addEventListener('input', (ev) => {

    var requstedAddress = ev.target.value;
    if (requstedAddress.length < 4) return
    mapService.getAddressLatlng(requstedAddress)
        .then(loc => {
            // console.log(loc.results[0].geometry.location);

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

document.querySelector('.copy').addEventListener('click', (ev) => {
    var currPos = mapService.getCurrLoc()
    console.log(currPos);
    var gUrl = document.getElementById("myurl")
    gUrl.value = `https://ori-mansur.github.io/travel-tip/?lat=${currPos.lat}&lng=${currPos.lng}`
    myFunction()

})

function myFunction() {
    var copyText = document.getElementById("myurl");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand('copy');
    // alert("Copied the text: " + copyText.value);
}



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

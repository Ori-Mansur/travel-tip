console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'






window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            hendelPos()

        })
        .catch(console.log('INIT MAP ERROR'));



}

document.querySelector('.btn').addEventListener('click', (ev) => {
    hendelPos()
})

function hendelPos() {
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
                })
        })
}


function renderAddress(address) {
    document.querySelector('h3').innerText = 'Location: ' + address;
    document.querySelector('.address-input').placeholder=address
    
    
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


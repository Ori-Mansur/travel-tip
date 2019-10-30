console.log('Main!');

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
                    mapService.getAddressName(pos.coords.latitude,pos.coords.longitude)
                        .then(name => {
                            console.log(name.results[0].formatted_address);

                        })
                })
        })
    console.log('Aha!', ev.target);
})


function renderAddress(address) {
    document.querySelector('h3').innerText = address;
}


export default {
    initMap,
    addMarker,
    panTo,
    getAddressName,
    getAddressLatlng,
    getCurrLoc
}


var map;
var gLatlng={lat:'',lng:''}

function initMap(lat , lng  ) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', map);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!',
        icon: {
            url: 'imgs/pin.png'
          }
    });
    return marker;
}

function panTo(lat, lng) {
    gLatlng.lat=lat
    gLatlng.lng=lng
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
    return Promise.resolve()
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBtIZbV3hkdA38vvKGEGbrpEah3vO1ZPyE'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getCurrLoc(){
    return gLatlng
}

function getAddressName(lat, lng) {
    var prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBtIZbV3hkdA38vvKGEGbrpEah3vO1ZPyE`)
    var prm1 = prm.then(res => res.data)
    return prm1
}
function getAddressLatlng(requstedAddress) {
    var prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${requstedAddress}&key=AIzaSyBtIZbV3hkdA38vvKGEGbrpEah3vO1ZPyE`)
    
    var prm1 = prm.then(res => res.data)
    return prm1
}





// 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBtIZbV3hkdA38vvKGEGbrpEah3vO1ZPyE'

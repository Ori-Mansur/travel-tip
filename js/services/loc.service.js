
export default {
    getLocs :getLocs,
    getPosition: getPosition
}



var locs = [{lat: 11.22, lng: 22.11}]




function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getLocsobj()
function getLocsobj(){
    var prm=axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBtIZbV3hkdA38vvKGEGbrpEah3vO1ZPyE')
    var prm1=prm.then(res=>res.data)
    .then(loc=>{

        console.log(loc);
    })
    
}




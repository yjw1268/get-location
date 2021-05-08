/**
 * HTML5原生函数实现
 * 精度较低
 */
<script type="text/javascript" src = "http://a.amap.com/jsapi_demos/static/remogeo/remogeo.js" ></script >
  
  if (navigator.platform === 'iPhone') {
    let remoGeo = new RemoGeoLocation();
    navigator.geolocation.getCurrentPosition = function () {
        return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
    };
    navigator.geolocation.watchPosition = function () {
        return remoGeo.watchPosition.apply(remoGeo, arguments);
    };
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    document.getElementById("demo").innerHTML = 'Your current position is:' + 'Latitude : ' + crd.latitude + 'Longitude: ' + crd.longitude + 'More or less ' + crd.accuracy + ' meters.';
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
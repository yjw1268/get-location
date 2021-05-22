// 覆盖图像
var imageLayer = new AMap.ImageLayer({
    url: 'https://i.loli.net/2021/05/11/Uph4gDBHjG8euPZ.png',
    bounds: new AMap.Bounds(
        [116.355065, 39.960051],
        [116.359872, 39.962009]
    ),
    opacity: 0.5,
    zooms: [15, 18]
});

var map = new AMap.Map("container", {
    resizeEnable: true,
    center: [116.356792, 39.961197],
    layers: [
        // 高德默认标准图层
        new AMap.TileLayer.Satellite(),
        imageLayer
    ],
    zoomEnable: false,
    zoom: 20
});


function getHttpObj() {
    var httpobj = null;
    try {
        httpobj = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            httpobj = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e1) {
            httpobj = new XMLHttpRequest();
        }
    }
    return httpobj;
}


var lineArr = [];
// 绘制轨迹
var polyline = new AMap.Polyline({
    map: map,
    showDir: true,
    strokeColor: "#28F",  //线颜色
    // strokeOpacity: 1,     //线透明度
    strokeWeight: 4,      //线宽
    lineJoin: 'round',
    // strokeStyle: "solid"  //线样式
});

var passedPolyline = new AMap.Polyline({
    map: map,
    // path: lineArr,
    strokeColor: "#52BE47",  //线颜色
    // strokeOpacity: 1,     //线透明度
    strokeWeight: 4,      //线宽
    // strokeStyle: "solid"  //线样式
});

function get_data() {
    lineArr = [];
    $gid = document.getElementById('gid').value;
    var xhr = getHttpObj();
    //异步请求，一定要在这里面写得到数据后的操作
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var jsonObj = JSON.parse(xhr.responseText);
            if (jsonObj.status = '200') {
                for (let i = 0; i < jsonObj.data.length; i++) {
                    s = jsonObj.data[i]['data_position'];
                    // 坐标格式转换
                    char = s.split(",");
                    let temp = [];
                    char.forEach(element => {
                        temp.push(parseFloat(element));
                    });
                    lineArr.push(temp);
                }
                polyline.setPath(lineArr);
                marker = new AMap.Marker({
                    map: map,
                    position: lineArr[0],
                    icon: "https://www.bupt404.cn/location/pic/52BE47.png",
                    anchor: 'bottom-center',
                    offset: new AMap.Pixel(0, 0),
                });
                marker.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });
            }
        }
    }
    var fd = new FormData();
    fd.append("gid", document.getElementById('gid').value);
    url = "https://www.bupt404.cn/location/replay.php";
    xhr.open("POST", url, true);
    // 发送请求
    xhr.send(fd);
}


map.setFitView();

function startAnimation() {
    marker.moveAlong(lineArr, 200);
}

function pauseAnimation() {
    marker.pauseMove();
}

function resumeAnimation() {
    marker.resumeMove();
}

function stopAnimation() {
    marker.stopMove();
}

var freq = 924;
updateFreq(freq);
function updateFreq(v) {
    document.getElementById('opa-val').innerText = v;
}

function setFreq(val) {
    updateFreq(val);
    frequrl = "https://www.bupt404.cn/location/pic/" + val + ".png";
    imageLayer.setImageUrl(frequrl);
}
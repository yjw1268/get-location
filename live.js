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
var lineArr1 = [];
var lineArr2 = [];
var lineArr3 = [];
var lineArr4 = [];
var lineArr5 = [];
var lineArr6 = [];


function ajax_request() {
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
                    //添加数据
                    let gid = jsonObj.data[i]['gid'];
                    if (gid == 1) {
                        lineArr1.push(temp);
                        polyline1.setPath(lineArr1);
                        marker1.setPosition(temp);
                    } else if (gid == 2) {
                        lineArr2.push(temp);
                        polyline2.setPath(lineArr2);
                        marker2.setPosition(temp);
                    } else if (gid == 3) {
                        lineArr3.push(temp);
                        polyline3.setPath(lineArr3);
                        marker3.setPosition(temp);
                    } else if (gid == 4) {
                        lineArr4.push(temp);
                        polyline4.setPath(lineArr4);
                        marker4.setPosition(temp);
                    } else if (gid == 5) {
                        lineArr5.push(temp);
                        polyline5.setPath(lineArr5);
                        marker5.setPosition(temp);
                    } else if (gid == 6) {
                        lineArr6.push(temp);
                        polyline6.setPath(lineArr6);
                        marker6.setPosition(temp);
                    }
                    console.log(jsonObj.data);
                }
            }
        }
    }
    url = "https://www.bupt404.cn/location/live.php";
    xhr.open("GET", url, true); // 发送请求 
    xhr.send();
}
setInterval(ajax_request, 3000);


// 覆盖图像
var imageLayer = new AMap.ImageLayer({
    url: 'https://i.loli.net/2021/05/11/Uph4gDBHjG8euPZ.png',
    bounds: new AMap.Bounds(
        [116.355065, 39.960051],
        [116.359872, 39.962009]
    ),
    opacity:0.5,
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
    zoomEnable:false,
    zoom: 20
});

// 绘制轨迹
var polyline1 = new AMap.Polyline({
    map: map,
    path: lineArr1,
    showDir: true, //显示方向
    strokeColor: "#2288FF", //线颜色
    // strokeOpacity: 1, //线透明度
    strokeWeight: 4, //线宽
    lineJoin: 'round',
    // strokeStyle: "solid" //线样式
});
var polyline2 = new AMap.Polyline({
    map: map,
    path: lineArr2,
    showDir: true, //显示方向
    strokeColor: "#FA9B03", //线颜色
    // strokeOpacity: 1, //线透明度
    strokeWeight: 4, //线宽
    lineJoin: 'round',
    // strokeStyle: "solid" //线样式
});
var polyline3 = new AMap.Polyline({
    map: map,
    path: lineArr3,
    showDir: true, //显示方向
    strokeColor: "#FFF800", //线颜色
    // strokeOpacity: 1, //线透明度
    strokeWeight: 4, //线宽
    lineJoin: 'round',
    // strokeStyle: "solid" //线样式
});
var polyline4 = new AMap.Polyline({
    map: map,
    path: lineArr4,
    showDir: true, //显示方向
    strokeColor: "#52BE47", //线颜色
    // strokeOpacity: 1, //线透明度
    strokeWeight: 4, //线宽
    lineJoin: 'round',
    // strokeStyle: "solid" //线样式
});
var polyline5 = new AMap.Polyline({
    map: map,
    path: lineArr5,
    showDir: true, //显示方向
    strokeColor: "#EA0019", //线颜色
    // strokeOpacity: 1, //线透明度
    strokeWeight: 4, //线宽
    lineJoin: 'round',
    // strokeStyle: "solid" //线样式
});
var polyline6 = new AMap.Polyline({
    map: map,
    path: lineArr6,
    showDir: true, //显示方向
    strokeColor: "#7643A0", //线颜色
    // strokeOpacity: 1, //线透明度
    strokeWeight: 4, //线宽
    lineJoin: 'round',
    // strokeStyle: "solid" //线样式
});
//绘制marker
var marker1 = new AMap.Marker({
    map: map,
    icon: 'https://www.bupt404.cn/location/pic/2288FF.png',
    anchor: 'bottom-center',
    offset: new AMap.Pixel(-0, 5)
});
var marker2 = new AMap.Marker({
    map: map,
    icon: 'https://www.bupt404.cn/location/pic/FA9B03.png',
    anchor: 'bottom-center',
    offset: new AMap.Pixel(-0, 5)
});
var marker3 = new AMap.Marker({
    map: map,
    icon: 'https://www.bupt404.cn/location/pic/FFF800.png',
    anchor: 'bottom-center',
    offset: new AMap.Pixel(-0, 5)
});
var marker4 = new AMap.Marker({
    map: map,
    icon: 'https://www.bupt404.cn/location/pic/52BE47.png',
    anchor: 'bottom-center',
    offset: new AMap.Pixel(-0, 5)
});
var marker5 = new AMap.Marker({
    map: map,
    icon: 'https://www.bupt404.cn/location/pic/EA0019.png',
    anchor: 'bottom-center',
    offset: new AMap.Pixel(-0, 5)
});
var marker6 = new AMap.Marker({
    map: map,
    icon: 'https://www.bupt404.cn/location/pic/7643A0.png',
    anchor: 'bottom-center',
    offset: new AMap.Pixel(-0, 5)
});

map.setFitView();

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

var changeTeam = function (teamid) {
    switch (teamid) {
        case '1':
            console.log(teamid);
            polyline1.show();
            marker1.show();
            polyline2.hide();
            marker2.hide();
            polyline3.hide();
            marker3.hide();
            polyline4.hide();
            marker4.hide();
            polyline5.hide();
            marker5.hide();
            polyline6.hide();
            marker6.hide();
            break;
        case '2':
            polyline1.hide();
            marker1.hide();
            polyline2.show();
            marker2.show();
            polyline3.hide();
            marker3.hide();
            polyline4.hide();
            marker4.hide();
            polyline5.hide();
            marker5.hide();
            polyline6.hide();
            marker6.hide();
            break;
        case '3':
            polyline1.hide();
            marker1.hide();
            polyline2.hide();
            marker2.hide();
            polyline3.show();
            marker3.show();
            polyline4.hide();
            marker4.hide();
            polyline5.hide();
            marker5.hide();
            polyline6.hide();
            marker6.hide();
            break;
        case '4':
            polyline1.hide();
            marker1.hide();
            polyline2.hide();
            marker2.hide();
            polyline3.hide();
            marker3.hide();
            polyline4.show();
            marker4.show();
            polyline5.hide();
            marker5.hide();
            polyline6.hide();
            marker6.hide();
            break;
        case '5':
            polyline1.hide();
            marker1.hide();
            polyline2.hide();
            marker2.hide();
            polyline3.hide();
            marker3.hide();
            polyline4.hide();
            marker4.hide();
            polyline5.show();
            marker5.show();
            polyline6.hide();
            marker6.hide();
            break;
        case '6':
            polyline1.hide();
            marker1.hide();
            polyline2.hide();
            marker2.hide();
            polyline3.hide();
            marker3.hide();
            polyline4.hide();
            marker4.hide();
            polyline5.hide();
            marker5.hide();
            polyline6.show();
            marker6.show();
            break;
        case '0':
            polyline1.show();
            marker1.show();
            polyline2.show();
            marker2.show();
            polyline3.show();
            marker3.show();
            polyline4.show();
            marker4.show();
            polyline5.show();
            marker5.show();
            polyline6.show();
            marker6.show();
            break;
    }
}
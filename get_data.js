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

var gid = 888;
var num = 5;
var url = "https://www.bupt404.cn/location/get_data.php" + "?gid=" + gid + "&num=" + num;
console.log(url);

function ajax_request() {
    var xhr = getHttpObj();
    //异步请求，一定要在这里面写得到数据后的操作
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var jsonObj = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log(jsonObj.status); //数据库返回状态码
            console.log(jsonObj.data[0]); //数据库第一组数据
            console.log(jsonObj.data[0]['data_position']); //数据库第一组data_position键值
            for (let i = 0; i < jsonObj.data.length; i++) {
                console.log(jsonObj.data[i]['data_position']);
            }
            return jsonObj;
        }
    }
    xhr.open("GET", url, true);
    // 发送请求
    xhr.send();
}
ajax_request();

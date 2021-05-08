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
        var num = 0;


        //第一组
        function ajax_request1() {
            var xhr = getHttpObj();
            //异步请求，一定要在这里面写得到数据后的操作
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsonObj = JSON.parse(xhr.responseText);
                    if (jsonObj.status = '200') {
                        for (let i = 0; i < jsonObj.data.length; i++) {
                            s = jsonObj.data[i]['data_position'];
                            char = s.split(",");
                            let temp = [];
                            char.forEach(element => {
                                temp.push(parseFloat(element));
                            });
                            lineArr1.push(temp);
                            console.log(temp);
                        }
                        polyline1.setPath(lineArr1);
                        marker1.setPosition(lineArr1[lineArr1.length - 1]);
                    }
                }
            }
            gid = 800;
            url = "https://www.bupt404.cn/location/get_data_h.php" + "?gid=" + gid + "&num=" + num;
            xhr.open("GET", url, true); // 发送请求 
            xhr.send();
            num = num + 1;
        }
        setInterval(ajax_request1, 2000);
        //第二组
        function ajax_request2() {
            var xhr = getHttpObj();
            //异步请求，一定要在这里面写得到数据后的操作
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsonObj = JSON.parse(xhr.responseText);
                    if (jsonObj.status = '200') {
                        for (let i = 0; i < jsonObj.data.length; i++) {
                            s = jsonObj.data[i]['data_position'];
                            char = s.split(",");
                            let temp = [];
                            char.forEach(element => {
                                temp.push(parseFloat(element));
                            });
                            lineArr2.push(temp);
                            console.log(temp);
                        }
                        // console.log(lineArr);
                        polyline2.setPath(lineArr2);
                    }
                }
            }
            gid = 999;
            url = "https://www.bupt404.cn/location/get_data_h.php" + "?gid=" + gid + "&num=" + num;
            xhr.open("GET", url, true); // 发送请求 
            xhr.send();
            // num = num + 1;
        }
        setInterval(ajax_request2, 2000);
        //第三组
        function ajax_request3() {
            var xhr = getHttpObj();
            //异步请求，一定要在这里面写得到数据后的操作
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsonObj = JSON.parse(xhr.responseText);
                    if (jsonObj.status = '200') {
                        for (let i = 0; i < jsonObj.data.length; i++) {
                            s = jsonObj.data[i]['data_position'];
                            char = s.split(",");
                            let temp = [];
                            char.forEach(element => {
                                temp.push(parseFloat(element));
                            });
                            lineArr3.push(temp);
                            console.log(temp);
                        }
                        // console.log(lineArr);
                        polyline3.setPath(lineArr3);
                    }
                }
            }
            gid = 888;
            url = "https://www.bupt404.cn/location/get_data_h.php" + "?gid=" + gid + "&num=" + num;
            xhr.open("GET", url, true); // 发送请求 
            xhr.send();
            // num = num + 1;
        }
        setInterval(ajax_request3, 2000);


        var map = new AMap.Map("container", {
            resizeEnable: true,
            center: [116.35634, 39.96248],
            layers: [
                // 高德默认标准图层
                new AMap.TileLayer.Satellite(),
            ],
            zoom: 17
        });

        // 绘制轨迹
        var polyline1 = new AMap.Polyline({
            map: map,
            path: lineArr1,
            showDir: true, //显示方向
            strokeColor: "#28F", //线颜色
            // strokeOpacity: 1, //线透明度
            strokeWeight: 4, //线宽
            lineJoin: 'round',
            // strokeStyle: "solid" //线样式
        });
        var polyline2 = new AMap.Polyline({
            map: map,
            path: lineArr2,
            showDir: true, //显示方向
            strokeColor: "#259d06", //线颜色
            // strokeOpacity: 1, //线透明度
            strokeWeight: 4, //线宽
            lineJoin: 'round',
            // strokeStyle: "solid" //线样式
        });
        var polyline3 = new AMap.Polyline({
            map: map,
            path: lineArr3,
            showDir: true, //显示方向
            strokeColor: "#f85a35", //线颜色
            // strokeOpacity: 1, //线透明度
            strokeWeight: 4, //线宽
            lineJoin: 'round',
            // strokeStyle: "solid" //线样式
        });

        var marker1 = new AMap.Marker({
            map: map,
            icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            anchor: 'bottom-center',
            offset: new AMap.Pixel(-0, 5)
        });
        map.setFitView();
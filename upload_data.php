<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $gid=$_POST["gid"];
    $data_position=$_POST["data_position"];
    $data_location_type=$_POST["data_location_type"];
    $data_accuracy=$_POST["data_accuracy"];
    $data_isConverted=$_POST["data_isConverted"];
    # 初始化数据
    $servername = "localhost";
    $username = "root";
    $password = "bupt404";
    $dbname = "location";
    # 连接数据库
    $link = mysqli_connect($servername, $username, $password, $dbname);
    if (!$link) {
        $arr = array('status' => '501', 'msg' => mysqli_connect_error());
        die(json_encode($arr));
    }
    $sql = "INSERT INTO alldata(gid,data_position,data_location_type,data_accuracy,data_isConverted) VALUES ('$gid','$data_position','$data_location_type','$data_accuracy','$data_isConverted');";
    $result = mysqli_multi_query($link, $sql);
    if (mysqli_affected_rows($link) == 1) {
        $arr = array('status' => '200');
        echo json_encode($arr);
    } else {
        $arr = array('status' => '501', 'msg' => mysqli_error($link));
        echo json_encode($arr);
    }
}
?>
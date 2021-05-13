<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization');
// ini_set("display_errors", "On");
// error_reporting(E_ALL || E_STRICT);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $gid=$_POST["gid"];
    $sql= "SELECT SQL_CALC_FOUND_ROWS gid,data_position,data_accuracy FROM alldata WHERE data_accuracy!='' AND `gid`=$gid ORDER BY ID;";
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
    $result = mysqli_query($link, $sql);
    if (mysqli_num_rows($result) >= 0) {
        $row_list = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $temp = array(
                'gid' => $row["gid"],
                'data_position' => $row["data_position"],
                'data_accuracy' => $row["data_accuracy"],
            );
            array_push($row_list, $temp);
        }
        $sql = "SELECT FOUND_ROWS() AS NUM";
        $result = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($result);
        $arr = array('status' => '200', 'data' => $row_list, 'data_num' => $row["NUM"]);
        echo json_encode($arr);
    } 
}
?>
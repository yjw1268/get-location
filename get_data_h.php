<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization');
ini_set("display_errors", "On");
error_reporting(E_ALL || E_STRICT);
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $gid=$_GET["gid"];
    $num=$_GET["num"];
    if (!is_numeric($num) && isset($_GET["num"])) {
        $arr = array('status' => '403', 'msg' => '参数格式不正确');
        die(json_encode($arr));
    }
    if(isset($_GET["gid"])){
        if(isset($_GET["num"])&&is_numeric($num)){
            $sql="SELECT gid,data_position,data_accuracy,`time` FROM alldata WHERE `gid`='$gid' AND data_accuracy!='' ORDER BY ID DESC LIMIT $num,1";
        }elseif(!isset($_GET["num"])){
            $sql = "SELECT gid,data_position,data_accuracy,`time` FROM alldata WHERE `gid`='$gid' ORDER BY ID DESC";
        }
    }else{
        if (isset($_GET["num"]) && is_numeric($num)) {
            $sql = "SELECT gid,data_position,data_accuracy,`time` FROM alldata ORDER BY ID DESC LIMIT $num,5";
        } elseif (!isset($_GET["num"])) {
            $sql = "SELECT gid,data_position,data_accuracy,`time` FROM alldata ORDER BY ID DESC";
        }
    }
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
            $temp=array(
                'gid'=> $row["gid"],
                'data_position'=>$row["data_position"],
                'data_accuracy'=>$row["data_accuracy"],
                'time'=>$row["time"]
            );
            array_push($row_list, $temp);
        }
        $sql = "SELECT FOUND_ROWS() AS NUM";
        $result = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($result);
        $arr = array('status' => '200', 'data' => $row_list, 'data_num' => $row["NUM"]);
        echo json_encode($arr);
    } else {
        $arr = array('status' => '501', 'msg' => mysqli_error($link));
        echo json_encode($arr);
    }
    mysqli_close($link);
}
?>
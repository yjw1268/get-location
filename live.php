<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization');
// ini_set("display_errors", "On");
// error_reporting(E_ALL || E_STRICT);
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql="";
    for($i=1;$i<7;$i++){
        // $tid=17444+111*$i;
        $sql.= "SELECT gid,data_position,data_accuracy FROM alldata WHERE data_accuracy!='' AND `gid`=$i ORDER BY ID DESC LIMIT 1;";
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
    if (mysqli_multi_query($link, $sql)) {
        $row_list = array();
        do {
            // 存储第一个结果集
            if ($result = mysqli_store_result($link)) {
                while ($row = mysqli_fetch_row($result)) {
                    $temp = array(
                        'gid' => $row[0],
                        'data_position' => $row[1],
                        'data_accuracy' => $row[2],
                    );
                    array_push($row_list, $temp);
                }
                mysqli_free_result($result);
            }
        } while (mysqli_next_result($link));
        $arr = array('status' => '200', 'data' => $row_list);
        echo json_encode($arr);
    } else {
        $arr = array('status' => '501', 'msg' => mysqli_error($link));
        echo json_encode($arr);
    }
}
?>
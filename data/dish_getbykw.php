<?php
    header("Content-Type:application/json");
    require("init.php");
    $kw=$_REQUEST["kw"];
    if(empty($kw)){
        echo "[]";
        return;
    }
    $sql="select did,name,intro,img_sm,material from kf_dish where material like '%$kw%' or name like '%$kw%'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>
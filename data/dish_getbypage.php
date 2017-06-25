<?php
    header("Content-Type:application/json");
    require("init.php");
    $start=$_REQUEST["start"];
    $count=5;
    $sql="select did,name,intro,img_sm,material from kf_dish limit $start,$count";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>
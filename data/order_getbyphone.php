<?php
    header("Content-Type:application/json");
    require("init.php");
    $phone=$_REQUEST["phone"];
    $sql="select o.oid,o.order_time,o.user_name,d.img_sm from kf_order o,kf_dish d where o.did=d.did and o.phone='$phone'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>
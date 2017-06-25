<?php
    header("Content-Type:application/json");
    require("init.php");
    @$uname=$_REQUEST["uname"] or die("-1");
    @$upwd=$_REQUEST["upwd"] or die("-2");
    $sql="select * from kf_user where uname='$uname' and upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if($row==null){
        $obj["msg"]="error";
    }else{
        $obj["msg"]="success";
    }
    echo json_encode( $obj);
?>
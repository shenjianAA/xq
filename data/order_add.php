<?php
    header("Content-Type:application/json");
    require("init.php");
    @$sex=$_REQUEST["sex"];
    @$phone=$_REQUEST["phone"];
    @$addr=$_REQUEST["addr"];
    @$did=$_REQUEST["did"];
    @$userName=$_REQUEST["userName"];
    if(empty($sex)||empty($phone)||empty($addr)||empty($did)||empty($userName)){
        echo "[]";
        return;
    }
    $orderTime=time()*1000;
    $sql="insert into kf_order values(null,'$phone','$userName','$sex','$orderTime','$addr','$did')";
    $result=mysqli_query($conn,$sql);
    if($result){
        $obj['msg']="success";
        $obj['oid']=mysqli_insert_id($conn);
    }else{
        $obj['msg']="error";
    }
    echo json_encode($obj);
?>
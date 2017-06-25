<?php
    header("Content-Type:application/json");
    require("init.php");
    @$did=$_REQUEST["did"];
    if(empty($did)){
        echo "[]";
        return;
    }
    $sql="select did,name,img_lg,material,detail from kf_dish where did=$did";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if(!$row){
        echo '[]';
    }else{
        echo json_encode($row);
    }
?>
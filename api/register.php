<?php
include("config.php");
$type=$_POST["type"];
$name=$_POST["name"];
$addr=$_POST["addr"];
$tel=$_POST["tel"];
$user=$_POST["user"];
$pass=$_POST["pass"]; // step 1


$resp["status"]=mysqli_query($con,"insert into $type(name, tel, addr, user, pass) VALUES('$name','$tel','$addr','$user','$pass')");

if($resp["status"]){
    $result=mysqli_query($con,"select id from $type where user='$user'");
    $row=mysqli_fetch_assoc($result); // [{id:16}] . {id:16}
    $resp["id"]=$row["id"]; // {status:false} , {status:true,id:16}
}

echo json_encode($resp); // step 4




?>
<?php
include("config.php");
$user=$_POST["user"];
$pass=$_POST["pass"];
$type=$_POST["type"]; // step 1

$result=mysqli_query($con,"select id,name from $type where user='$user' and pass='$pass'");

if(mysqli_num_rows($result)==0)
    $resp["status"]=false;
else{
    $resp["status"]=true;
    $row=mysqli_fetch_assoc($result); // {id:17,name:}
    $resp["id"]=$row["id"];  // {status:false} - {status:true,id:17}
    $resp["name"]=$row["name"];  // {status:false} - {status:true,id:17}

}

echo json_encode($resp); // step 4



?>
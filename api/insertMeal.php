<?php
include("config.php");

$rest_id=$_POST["id"];
$name=$_POST["name"];
$price=$_POST["price"];
$descr=$_POST["descr"];
$type=$_POST["type"];

$img_name=round(microtime(true) * 1000).substr($_FILES["img"]["name"],strrpos($_FILES["img"]["name"],'.'));

move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name"); // step 1

$resp["status"]=mysqli_query($con,"insert into meals(rest_id, name, price, descr, type, img) values('$rest_id','$name','$price','$descr','$type','uploads/$img_name')"); // step 2 & 3

echo json_encode($resp); // step 4





?>
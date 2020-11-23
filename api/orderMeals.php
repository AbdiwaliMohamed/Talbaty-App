<?php
include("config.php");
$cust_id=$_POST["cust_id"];
$rest_id=$_POST["rest_id"];
$addr=$_POST["addr"];
$order_details=$_POST["order_details"]; // step 1

$resp["status"]=mysqli_query($con,"insert into orders(cust_id, rest_id, addr, meals) values('$cust_id','$rest_id','$addr','$order_details') "); // step 2 & 3

echo json_encode($resp); // step 4




?>
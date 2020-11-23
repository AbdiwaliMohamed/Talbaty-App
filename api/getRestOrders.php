<?php
include("config.php");

$rest_id=$_POST["rest_id"]; // step 1

$result=mysqli_query($con,"select * from orders where rest_id=$rest_id"); // step 2
$resp=mysqli_fetch_all($result,MYSQLI_ASSOC); // step 3

echo json_encode($resp); // step 4




?>
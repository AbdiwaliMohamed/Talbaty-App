<?php
include("config.php");

$id=$_POST["id"]; // step 1

$resp["status"]=mysqli_query($con,"delete from meals where id=$id"); // step 2 & 3

echo json_encode($resp); // step 4


?>
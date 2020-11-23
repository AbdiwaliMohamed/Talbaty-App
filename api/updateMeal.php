<?php
include("config.php");
$id=$_POST["id"];
$name=$_POST["name"];
$price=$_POST["price"];
$descr=$_POST["descr"];
$type=$_POST["type"];

if($_FILES["img"]){
    $result=mysqli_query($con,"select img from meals where id=$id");
    $row=mysqli_fetch_assoc($result); // {img:'uploads/786123876128937.jpg'}
    unlink("../".$row["img"]);

    $img_name=round(microtime(true) * 1000).substr($_FILES["img"]["name"],strrpos($_FILES["img"]["name"],'.'));
    move_uploaded_file($_FILES["img"]["tmp_name"],"../uploads/$img_name");
    $resp["status"]=mysqli_query($con,"update meals set name='$name',price='$price',descr='$descr',img='uploads/$img_name',type='$type' where id=$id");

} // step 1
else{
    $resp["status"]=mysqli_query($con,"update meals set name='$name',price='$price',descr='$descr',type='$type' where id=$id");

}

echo json_encode($resp); // step 4

?>
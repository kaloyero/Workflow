<?php

include("db.php");
include("facturacionDao.php");
if ($_SERVER['REQUEST_METHOD']=="GET"){
	$tipoListado= $_GET['tipoFacturacion'];
	if($tipoListado=="previsto" ){
		return getPrevistos($db);
	}else{
		return getConfirmados($db);
	}

}else if ($_SERVER['REQUEST_METHOD']=="POST"){
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	insertMonto($db,$request);
}

?>
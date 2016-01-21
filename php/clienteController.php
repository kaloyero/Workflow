<?php

include("db.php");
include("clienteDaoTest.php");

if ($_SERVER['REQUEST_METHOD']=="GET"){
	if ($_GET["id"]){
		return getClienteById($db,$_GET["id"]);
	}else{
			return getClientes($db);
	}

}
if ($_SERVER['REQUEST_METHOD']=="POST"){
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	return saveCliente($db,$request);
}
if ($_SERVER['REQUEST_METHOD']=="PUT"){
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	return updateCliente($db,$request);
}

?>
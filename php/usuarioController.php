<?php

include("db.php");
include("usuarioDao.php");

if ($_SERVER['REQUEST_METHOD']=="GET"){
	if ($_GET["id"]){
		return getUsuarioById($db,$_GET["id"]);
	}else{
		return getUsuarios($db);
	}

}
if ($_SERVER['REQUEST_METHOD']=="POST"){
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	return saveUsuario($db,$request);
}
if ($_SERVER['REQUEST_METHOD']=="PUT"){
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	return updateUsuario($db,$request);
}

?>
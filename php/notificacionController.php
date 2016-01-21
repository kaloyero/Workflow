<?php

include("db.php");
include("notificacionDao.php");
if ($_SERVER['REQUEST_METHOD']=="GET"){

if ($_GET["estado"]){
		return getNotificacionesInicio($db);
	}else{
		return getNotificaciones($db);
		}
}

?>
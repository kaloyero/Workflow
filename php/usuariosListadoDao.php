<?php
include("db.php");
include("baseListDao.php");
$sqlList=getSql();
getList($sqlList);
closeConnection();

function getSql(){

		$json = array();
		//Recupero instalacion
		$usuarios = "select * from Usuarios";
		return $usuarios;

}
	?>
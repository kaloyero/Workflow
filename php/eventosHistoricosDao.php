<?php
include("db.php");
include("baseListDao.php");
$tipoListado= $_GET['estado'];
$sqlList=getSql($tipoListado);
getList($sqlList);
closeConnection();

function getSql($idTipoListado){

		$json = array();
		//Recupero instalacion
		$eventos = "select * from EventosCerradosCancelados_V";

		return $eventos;

}
	?>
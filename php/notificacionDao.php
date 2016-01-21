<?php
session_start();


function addNotifiacion($con,$mensaje,$idEvento,$idUsuario,$idRol,$idTipoNotificacion){

	$insert="INSERT INTO `Notificaciones` (`mensaje`,`idUsuario`, `idEvento`,`idRol`,`idTipoNotificacion`,`Fecha`) VALUES('".$mensaje."','".$idUsuario."','".$idEvento."','".$idRol."','".$idTipoNotificacion."','".getFechaHoy()."');";
	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}

}
function getNotificaciones($db){
		$json = array();
		$sqlList="SELECT  * from RegistroActividades_V";

		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));

		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
			$r["Fecha"]= getFechaFormateadaNotificacion($r["Fecha"]);
			$rows[] = $r;
		}

		$jsonData = $rows;

		echo json_encode($jsonData);
}
function getNotificacionesInicio($db){
		$json = array();
		$sqlList="SELECT * FROM `RegistroActividades_V` WHERE Mensaje ='Nuevo Evento' or Mensaje ='Cambio de estado de Waiting a Confirmado'";

		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));

		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
			$r["Fecha"]= getFechaFormateadaNotificacion($r["Fecha"]);
			$rows[] = $r;
		}

		$jsonData = $rows;

		echo json_encode($jsonData);
}


function getFechaFormateadaNotificacion($fecha){
$datetime = new DateTime();
                $objetoDate=$datetime->createFromFormat('Y-m-d', $fecha);
		$fechaFormateada=$objetoDate->format('d/m/Y');
return $fechaFormateada;
}
	?>
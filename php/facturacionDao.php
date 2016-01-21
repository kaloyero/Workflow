<?php

function getPrevistos($db){
		$json = array();
		$sqlList = "select * from EventosFacturacionPrevista_V";
		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
			$rows[] = $r;
		}


		$jsonData = $rows;

		echo json_encode($jsonData);
}
function getConfirmadosOLD($db){
		$json = array();
		$sqlList = "SELECT *  from EventosFacturacionConfirmada_V";
		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
			$rows[] = $r;
		}


		$jsonData = $rows;

		echo json_encode($jsonData);
}

function getConfirmados($db){
		$json = array();
		$sqlList = "select * from EventosFacturacionConfirmada_V";
		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
			$rows[] = $r;
		}


		$jsonData = $rows;

		echo json_encode($jsonData);
}





function insertMonto($con,$request){
///DONDE INGRESO EL MEONTO
	$insert="INSERT INTO  `EventoFacturaciones` (`FechaFacturacion`, `descripcion`,`idEvento`,`idUsuario`,`importe`)	VALUES ('". getFormatedDate($request->fecha)."','".$request->descripcion."','".$request->idEvento."',1,'".$request->monto."');";
	//echo $insert;

	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}


}

function getFechaHoy(){
	return date('Y-m-d H:i:s');

}
function getFormatedDate($date){
	if ($date!=""){

		$datetime = new DateTime();
		$objetoDate=$datetime->createFromFormat('d-m-Y', $date);
		$fechaFormateada=$objetoDate->format('Y/m/d');
		return $fechaFormateada;
	}else{
		return null;
	}
}



	?>
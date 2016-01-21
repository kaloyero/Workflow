<?php
//include("db.php");


function getList($sqlList){
		global $db;
		$json = array();
		//Recupero instalacion
		//$eventos = "SELECT * FROM Eventos  ";
		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));



		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
//echo "a";

	// Se reemplaza cuando la vista este bien y vengan las fechas correctas
			$r["FechaDesde"]= getFechaFormateadaLista($r["FechaDesde"]);
                       $r["FechaHasta"]= getFechaFormateadaLista($r["FechaHasta"]);                       
$r["FechaPresentacion"]= getFechaFormateadaLista($r["FechaPresentacion"]);

			$rows[] = $r;
		}


		$jsonData = $rows;

		echo json_encode($jsonData);

}
function getListUser($sqlList){
		global $db;
		$json = array();

		$result = $db->query($sqlList) or die(print_r($db->errorInfo()));



		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {

	// Se reemplaza cuando la vista este bien y vengan las fechas correctas
	
			$rows[] = $r;
		}


		$jsonData = $rows;

		echo json_encode($jsonData);

}






function getFechaFormateadaLista($fecha){
$datetime = new DateTime();
                $objetoDate=$datetime->createFromFormat('Y-m-d', $fecha);
		$fechaFormateada=$objetoDate->format('d/m/Y');
return $fechaFormateada;
}

	?>
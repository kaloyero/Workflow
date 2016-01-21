<?php
include("db.php");
include("calendarDao.php");
getEventosCalendarController($db);
function getEventosCalendarController($db){



	$json = array();

	$resultEventos = getEventosCalendar($db);
	// sending the encoded result to success page
	$rows = array();
	//print_r($resultEventos);
	foreach ($resultEventos as &$r) {
		$r["start"]=$r["FechaDesde"];
		$r["end"]=$r["FechaHasta"];

			if ($r["estadoNombre"]=="Pending"){
			$r["className"]="pendingEvent";
			$r["title"]=$r["Id"]."-".$r["RazonSocial"]."-".$r["Nombre"]." : ".$r["FechaPresentacion"];

		}else if ($r["estadoNombre"]=="Waiting"){
			$r["className"]="waitingEvent";
			$r["title"]=$r["Id"]."-".$r["RazonSocial"]."-".$r["Nombre"]." : ".$r["FechaDesde"]."-".$r["FechaHasta"];


		}elseif ($r["estadoNombre"]=="Confirmado"){
			$r["className"]="confirmEvent";
			$r["title"]=$r["Id"]."-".$r["RazonSocial"]."-".$r["Nombre"]." : ".$r["FechaDesde"]."-".$r["FechaHasta"];

		}
		$rows[] = $r;
	}
//	while($r =$resultEventos) {
		//	echo $r["FechaEventoDesde"];
			//$r["start"]=$r["FechaEventoDesde"];
			//$r["end"]=$r["FechaEventoHasta"];
			//$r["title"]=$r["Nombre"];
		//	$rows[] = $r;

			//echo "FIRST ".$firstDate;

	//}

	$jsonData  =$rows;
		echo json_encode($jsonData);

}
?>
<?php
function getEventosCalendar($db){
		$json = array();
		$sqlList="select Eventos.*,est.Nombre as estadoNombre from Eventos  INNER JOIN (SELECT idEvento,Max(idEstado) AS estado ,MAX(FechaEstado) AS MaxDateTime FROM EventoEstados GROUP BY idEvento) groupEvento ON Eventos.id = groupEvento.idEvento INNER JOIN Estados est on est.Id = groupEvento.estado where est.Id in(1,2,3) ";
		$resultEventos = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultEventos)) {
			$rows[] = $r;
		}


	 return $rows;


}
?>
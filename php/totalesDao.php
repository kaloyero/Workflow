
<?php
include("db.php");

getTotales($db);

function getTotales($db){
	$json = array();
		$sqlList="SELECT * from EventosTotales_V";

		$resultTotales = $db->query($sqlList) or die(print_r($db->errorInfo()));

		$rows = array();
		
		while($r = mysqli_fetch_assoc($resultTotales)) {
			$rows[] = $r;
		}

		$jsonData = $rows;
		echo json_encode($jsonData);

}


	?>
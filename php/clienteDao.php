<?php
include("db.php");
//Obtengo el Json enviado
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if ($_SERVER['REQUEST_METHOD']=="GET"){
	selectClientes($db,$request);
}

closeConnection();

function selectClientes($db){

		$json = array();
		//Recupero instalacion
		$sqlClientes = "select * from Clientes";

			$json = array();
			//Recupero instalacion
			//$eventos = "SELECT * FROM Eventos  ";
			$resultClientes = $db->query($sqlClientes) or die(print_r($db->errorInfo()));



			$rows = array();
			while($r = mysqli_fetch_assoc($resultClientes)) {
				$rows[] = $r;
			}


			$jsonData = $rows;

			echo json_encode($jsonData);


}

	?>
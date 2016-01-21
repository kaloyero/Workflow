
<?php

function getClientes($db){
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
function getClienteById($db,$id){
		$json = array();
		$sqlList="SELECT * from Clientes where id='".$id."'" ;
//echo "$sqlList".$sqlList;
		$resultUsuarios = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultUsuarios)) {
			$r["Habilitado"]=fillHabilitado($r["Habilitado"]);
			$rows[] = $r;
		}

		$jsonData = $rows;

		echo json_encode($jsonData);
}
function saveCliente($db,$request){
	$insert="INSERT INTO  `Clientes` (`RazonSocial`,`Habilitado`)	VALUES ('".$request->Nombre."','".getHabilitado($request)."');";
	if (!mysqli_query($db,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		return "ok";
	}
}
function updateCliente($db,$request){
	$update="UPDATE`Clientes`  set RazonSocial='".$request-> RazonSocial."' ,Habilitado='".getHabilitado($request)."' where  id='".$request->Id."'";
	if (!mysqli_query($db,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
			return "ok";
	}
}


function fillHabilitado($valor){
					if ($valor=="N" ){
						return false;
					}else{
						return true;
					}

				}

function getHabilitado($request){
	if ($request->Habilitado=="" || $request->Habilitado==false){
		return "N";
	}else{
		return "S";
	}

}

	?>
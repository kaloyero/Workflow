<?php
include("db.php");
include("notificacionDao.php");

//Obtengo el Json enviado
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
insertEventoEstado($db,$request);
closeConnection();


function insertEventoEstado($con,$request){


	$insert="INSERT INTO `EventoEstados` (`idEvento`,`idEstado`, `fechaEstado`,`idUsuario`) VALUES('".$request->idEvento."','".$request->idEstado."','".getFechaHoy()."','1');";

	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		    if($request->idEstado==3){//Si pasa a Confirm,se actualiza el Productor y el Stage
				$update="UPDATE`Eventos`  set IdUsuarioProductor='".$request->IdUsuarioProductor."' , IdStage='".$request->IdStage."' where  id='".$request->idEvento."'";

					if (!mysqli_query($con,$update)) {
						printf("Errormessage: %s\n", mysql_error());
					}
		    }
$mensajeCambio="Cambio de estado de ".$request->estadoActual." a ".getEventoEstado($request->idEstado);
			addNotifiacion($con,$mensajeCambio,$request->idEvento,1,1,2);
			addNotifiacion($con,$mensajeCambio,$request->idEvento,1,2,2);

	}



}

function getFechaHoy(){
	return date('Y-m-d H:i:s');

}
function getEventoEstado($id){
	if ($id==1){
		return "Pending";
	}else if ($id==2 ){
		return "Waiting";
	}else if ($id==3 ){
		return "Confirmado";
	}	else if ($id==5 ){
			return "Completado";
		}

}


	?>
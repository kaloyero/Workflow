<?php
include("db.php");
include("notificacionDao.php");
//Obtengo el Json enviado
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


if ($_SERVER['REQUEST_METHOD']=="PUT"){
	updateEventoRenegociar($db,$request);
}

closeConnection();

function updateEventoRenegociar($con,$request){

$idComercial= $request->IdComercial[0]->Id;

$update="UPDATE`Eventos` set TotalBudget='".$request->TotalBudget."',FechaActualizacion='".getFechaHoy()."' ,idUsuarioComercial='".$idComercial."' ,FechaPresentacion='".$request->FechaPresentacion."',Comentarios='".$request->Comentario."' ,IdActualizadoPor=1  where  id='".$request->Id."'";
echo $update;
	if (!mysqli_query($con,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		addNotifiacion($con,"Cambio de estado de Waiting a Pending",$request->Id,1,1,2);
		addNotifiacion($con,"Cambio de estado de Waiting a Pending",$request->Id,1,2,2);
		insertEventoEstado($con,$request);
	}
}



function getFechaHoy(){
	return date('Y-m-d H:i:s');

}

function insertEventoEstado($con,$request){


	$insert="INSERT INTO `EventoEstados` (`idEvento`,`idEstado`, `fechaEstado`,`idUsuario`) VALUES('".$request->Id."','1','".getFechaHoy()."','1');";

	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
}



}

	?>
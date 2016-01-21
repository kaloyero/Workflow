<?php
include("db.php");
include("notificacionDao.php");

//Obtengo el Json enviado
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
cancelEventoEstado($db,$request);
insertEventoEstado($db,$request);

closeConnection();



function cancelEventoEstado($con,$request){


	$update="UPDATE`Eventos` set cancelado='S' where id='".$request->idEvento."'";
	if (!mysqli_query($con,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}


}
function insertEventoEstado($con,$request){

	$insert="INSERT INTO `EventoEstados` (`idEvento`,`idEstado`, `fechaEstado`,`idUsuario`) VALUES('".$request->idEvento."','".$request->idEstado."','".getFechaHoy()."','1');";

	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		addNotifiacion($con,"Cancelado",$request->idEvento,1,1,2);
		addNotifiacion($con,"Cancelado",$request->idEvento,1,2,2);

	}

}
function getFechaHoy(){
	return date('Y-m-d H:i:s');

}



	?>
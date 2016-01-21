<?php

session_start();

include("db.php");
include("notificacionDao.php");
//Obtengo el Json enviado
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//echo "DATOS".print_r($request).$request->nombre;
//if ()
//addEvento($db,$request);
//closeConnection();

//closeConnection($db);
//echo $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD']=="PUT"){
	//updateEvento($db,$_GET);
	updateEvento($db,$request);
}
if ($_SERVER['REQUEST_METHOD']=="POST"){
	addEvento($db,$request);
}
if ($_SERVER['REQUEST_METHOD']=="GET"){
	//echo "AAA".$_GET;
    getEventoById($db,$_GET["id"]);

}
closeConnection();

function addEvento($con,$request){
	$insert="INSERT INTO  `Eventos` (`codigo`, `nombre`,`TotalBudget`,`FechaCreacion`,`FechaActualizacion`,`idCliente`,`idUsuarioComercial`,`IdCreadoPor`,`IdActualizadoPor`
		,`FechaDesde`,`FechaHasta`,`FechaPresentacion`,`FechasAlt`,`Pax`,`Comentarios`,`IdTipoEvento`,`Presupuesto`)	VALUES ('".$request->codigo."','".$request->nombre."','".$request->budget."','".getFechaHoy()."','".getFechaHoy()."','".$request->clienteId[0]->Id."','".$request->usuarioId[0]->Id."','".$_SESSION['idUser']."','".$_SESSION['idUser']."','".getFormatedDate($request->fechaDesde)."','".getFormatedDate($request->fechaHasta)."','".getFormatedDate($request->fechaPresentacion)."','".getFechaAlternativa($request)."','".$request->pax."','".$request->comentario."','1','".$request->presupuesto."');";


//mysqli_insert_id();
	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
	//Guarda el id del ultimno insert
	 $eventoIngresadoId=mysqli_insert_id($con);
	addNotifiacion($con,"Nuevo Evento",$eventoIngresadoId,$_SESSION['idUser'],1,3);
	addNotifiacion($con,"Nuevo Evento",$eventoIngresadoId,$_SESSION['idUser'],2,3);
	addEventoEstado($con,$eventoIngresadoId);
	//Seteo el ID que por ahora es el codigo del Evento
	$arr = array('codigo' => $eventoIngresadoId,'nombre' => $request->nombre);
	echo json_encode($arr);

	}

//Manera Devolver Valores a Angular
//	$rows = array();
	//$pila = array("naranja", "plátano");
	//array_push($pila, "manzana", "arándano");
//	$rows["a"] = $pila;
//	echo json_encode($rows);

}
/*
function updateEventoOLD($con,$request){
	if ($request->columna=="RazonSocial"){
	$update="UPDATE`Eventos` set idCliente=".$request->valor." where id='".$request->id."'";

	}else{
	$update="UPDATE`Eventos`  set ".$request->columna."='".$request->valor."' where id='".$request->id."'";
 }
	if (!mysqli_query($con,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		addNotifiacion($con,$request->columna,$request->id,$_SESSION['idUser'],1,1);
		addNotifiacion($con,$request->columna,$request->id,$_SESSION['idUser'],2,1);
	}
	echo "ENTRO".$update;
}
function updateEvento($con,$request){
//	echo $request["IdComercial"][1];
	//$nueva=json_encode($request["IdComercial"]);
$idComercial= json_decode($request["IdComercial"])->Id;
$idTipoEvento= json_decode($request["EventoTipo"])->id;
//echo "TIPOEV".$idTipoEvento;

$update="UPDATE`Eventos`  set codigo='".$request["Codigo"]."' , TotalBudget='".$request["TotalBudget"]."',FechaActualizacion='".getFechaHoy()."' ,idUsuarioComercial='".$idComercial."'  ,FechaEventoDesde='".$request["FechaEventoDesde"]."' ,FechaPresentacion='".$request["FechaPresentacion"]."' ,Pax='".$request["Pax"]."' ,Comentario='".$request["Comentario"]."',Presupuesto='".$request["Presupuesto"]."',TipoEvento='".$idTipoEvento."' ,nombre='".$request["Nombre"]."',FechaEventoHasta='".$request["FechaEventoHasta"]."' ,IdActualizadoPor='".$_SESSION['idUser']."'  where  id='".$request["Id"]."'";

	if (!mysqli_query($con,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		addNotifiacion($con,"Edicion",$request["Id"],$_SESSION['idUser'],1,1);
		addNotifiacion($con,"Edicion",$request["Id"],$_SESSION['idUser'],2,1);
	}
	echo "ENTRO".$update;
}*/
function updateEvento($con,$request){
//	echo $request["IdComercial"][1];
	//$nueva=json_encode($request["IdComercial"]);
$idComercial= $request->IdComercial[0]->Id;
$idTipoEvento= $request->EventoTipo[0]->Id;
//echo "TIPOEV".$idTipoEvento;
$update="UPDATE`Eventos`  set codigo='".$request->Codigo."' , TotalBudget='".$request->TotalBudget."',FechaActualizacion='".getFechaHoy()."' ,idUsuarioComercial='".$idComercial."'  ,FechaDesde='".getFormatedDate($request->FechaDesde)."' ,FechaPresentacion='".getFormatedDate($request->FechaPresentacion)."',FechasAlt ='".getEsFechaAlt($request)."',Pax='".$request->Pax."' ,Comentarios='".$request->Comentario."',Presupuesto='".$request->Presupuesto."',IdTipoEvento='".$idTipoEvento."' ,nombre='".$request->Nombre."', FechaHasta ='".getFormatedDate($request->FechaHasta)."' ,IdActualizadoPor='".$_SESSION['idUser']."',IdUsuarioProductor='".getProductor($request)."',IdStage='".getStage($request)."'  where  id='".$request->Id."'";

	if (!mysqli_query($con,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		addNotifiacion($con,"Edicion",$request->Id,$_SESSION['idUser'],1,1);
		addNotifiacion($con,"Edicion",$request->Id,$_SESSION['idUser'],2,1);
	}
	//echo "ENTRO".$update;
}

function getEsFechaAlt($request){

print_r($request);
if ($request->FechaAlt=="" || $request->FechaAlt ==false){
		return "N";
	}else{
		return "S";
	}

}


function addEventoEstado($con,$idEvento){

	$insert="INSERT INTO `EventoEstados` (`idEvento`,`idEstado`, `fechaEstado`,`idUsuario`) VALUES('".$idEvento."','1','".getFechaHoy()."','1');";

	if (!mysqli_query($con,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}

}
function getEventoById($con,$idEvento){

	$select="Select Eventos.* ,Clientes.RazonSocial ,Usuarios.Nombre as UsuarioCreador from `Eventos` inner join Clientes  ON Eventos.idCliente=Clientes.Id inner join  Usuarios on Eventos.IdCreadoPor=Usuarios.id where Eventos.id='".$idEvento."'";
	$resultEvento=mysqli_query($con,$select);
	if (!$resultEvento) {
		printf("Errormessage: %s\n", mysql_error());
	}else{

		$rows = array();
		while($r = mysqli_fetch_assoc($resultEvento)) {
			
$r["FechaAlt"]=fillEsFechaAlt($r["FechasAlt"]);
$r["FechaDesde"]= getFechaFormateadaByEvento($r["FechaDesde"]);
                       $r["FechaHasta"]= getFechaFormateadaByEvento($r["FechaHasta"]);                       
$r["FechaPresentacion"]= getFechaFormateadaByEvento($r["FechaPresentacion"]);
			$rows[] = $r;
			

		}


		$jsonData = $rows;
		echo json_encode($jsonData);

	}

}
function fillEsFechaAlt($valor){
					if ($valor=="N" ){
						return false;
					}else{
						return true;
					}

				}
function getFechaHoy(){
	return date('Y-m-d H:i:s');

}
function getFechaAlternativa($request){
	if ($request->alternativa=="" || $request->alternativa==false){
		return "N";
	}else{
		return "S";
	}

}
function getProductor($request){
	if(!$request->Productor){
		return "";
	}else{
		return $request->Productor[0]->Id;
	}

}
function getStage($request){
	if(!$request->Stage){
		return "";
	}else{
		return $request->Stage[0]->Id;
	}

}
function getFormatedDate($date){
	if ($date!=""){
		//$fecha = new DateTime($date);
		///$fechaFormateada = $fecha->format('Y-m-d');

		$datetime = new DateTime();
		$objetoDate=$datetime->createFromFormat('d-m-Y', $date);
		$fechaFormateada=$objetoDate->format('Y/m/d');
		return $fechaFormateada;
	}else{
		return null;
	}
}
function getFechaFormateadaByEvento($fecha){
$datetime = new DateTime();
                $objetoDate=$datetime->createFromFormat('Y-m-d', $fecha);
		$fechaFormateada=$objetoDate->format('d-m-Y');
return $fechaFormateada;
}

	?>

<?php

function getUsuarios($db){
		$json = array();
		$sqlList="SELECT * from Usuarios ";
		$resultUsuarios = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultUsuarios)) {
			$rows[] = $r;
		}

		$jsonData = $rows;

		echo json_encode($jsonData);
}
function getUsuarioById($db,$id){
		$json = array();
		$sqlList="SELECT Usuarios.*,UsuarioRoles.IdRol from Usuarios  inner join UsuarioRoles on Usuarios.Id=UsuarioRoles.IdUsuario  where Usuarios.id='".$id."'" ;
//echo "$sqlList".$sqlList;
		$resultUsuarios = $db->query($sqlList) or die(print_r($db->errorInfo()));
		$rows = array();
		while($r = mysqli_fetch_assoc($resultUsuarios)) {
			$r["EsProductor"]=fillEsProductor($r["EsProductor"]);
			$r["EsComercial"]=fillEsComercial($r["EsComercial"]);
			$r["Habilitado"]=fillHabilitado($r["Habilitado"]);
			$rows[] = $r;
		}

		$jsonData = $rows;

		echo json_encode($jsonData);
}
function saveUsuario($db,$request){
	$insert="INSERT INTO  `Usuarios` (`Nombre`, `Apellido`,`ClaveAcceso`,`Email`,`EsComercial`,`EsProductor`,`Habilitado`)	VALUES ('".$request->Nombre."','".$request->Apellido."','".$request->ClaveAcceso."','".$request->Email."','".getEsComercial($request)."','".getEsProductor($request)."','".getHabilitado($request)."');";
	if (!mysqli_query($db,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		//Guarda el id del ultimno insert
		 $usuarioIngresadoId=mysqli_insert_id($db);
		saveUsuarioRol($db,$usuarioIngresadoId,$request->rolId[0]->Id);
	}
}
function updateUsuario($db,$request){
	$update="UPDATE`Usuarios`  set Nombre='".$request->Nombre."' , Apellido='".$request->Apellido."',ClaveAcceso='".$request->ClaveAcceso."' ,Email='".$request->Email."' ,EsComercial='".getEsComercial($request)."' ,EsProductor='".getEsProductor($request)."' ,Habilitado='".getHabilitado($request)."' where  id='".$request->Id."'";
	if (!mysqli_query($db,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		//Guarda el id del ultimno insert

		updateUsuarioRol($db,$request->Id,$request->rolId[0]->Id);
	}
}
function updateUsuarioRol($db,$usuarioIngresadoId,$rolId){
		$update="UPDATE`UsuarioRoles`  set IdRol='".$rolId."' where  IdUsuario='".$usuarioIngresadoId."'";
	if (!mysqli_query($db,$update)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		echo "Ok";
	}
}
function saveUsuarioRol($db,$usuarioIngresadoId,$rolId){
	$insert="INSERT INTO  `UsuarioRoles` (`IdUsuario`, `IdRol`)	VALUES ('".$usuarioIngresadoId."','".$rolId."');";
	echo $insert;
	if (!mysqli_query($db,$insert)) {
		printf("Errormessage: %s\n", mysql_error());
	}else{
		echo "OKKK";
	}
}
function fillEsComercial($valor){
		if ($valor=="N" ){
			return false;
		}else{
			return true;
		}

	}
function fillEsProductor($valor){
			if ($valor=="N" ){
				return false;
			}else{
				return true;
			}

		}

function fillHabilitado($valor){
					if ($valor=="N" ){
						return false;
					}else{
						return true;
					}

				}

function getEsComercial($request){
	if ($request->EsComercial=="" || $request->EsComercial==false){
		return "N";
	}else{
		return "S";
	}

}
function getEsProductor($request){
	if ($request->EsProductor=="" || $request->EsProductor==false){
		return "N";
	}else{
		return "S";
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
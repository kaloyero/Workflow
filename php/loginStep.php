<?php

include("db.php");
session_start();

if(isSet($_POST['username']) && isSet($_POST['password'])) {
		//usuario Administrador
		//Limpio session
		$_SESSION['idRol']="";

		$user=strtoupper(mysqli_real_escape_string($db,$_POST['username']));
		$pass=strtoupper(mysqli_real_escape_string($db,$_POST['password']));
		$consulta="SELECT Usuarios.Id as idUser,Usuarios.*,UsuarioRoles.idRol FROM Usuarios Inner Join UsuarioRoles on UsuarioRoles.idUsuario=Usuarios.id  WHERE UPPER(Email)='".$user."' and UPPER(ClaveAcceso)='".$pass."' and Habilitado like 'S' LIMIT 1;";

		echo $consulta;
		$result=mysqli_query($db,$consulta);

		$resultLogin= $db->query($consulta) or die(print_r($db->errorInfo()));


	//	$rows = array();
		while($r = mysqli_fetch_assoc($resultLogin)) {
			//$rows[] = $r;
			$_SESSION['idRol']=$r["idRol"];
			$_SESSION['idUser']=$r["idUser"];
		}

		echo $_SESSION['idRol'];

}


?>
<?php
include("db.php");
include("baseListDao.php");
$tipoListado= $_GET['estado'];
$sqlList=getSql($tipoListado);
getList($sqlList);
closeConnection();

function getSql($idTipoListado){

		$json = array();
		//Recupero instalacion
		$eventos = "select Eventos.*,cli.RazonSocial,usu.Nombre as Comercial,product.Nombre as Productor,stage.Nombre as Stage from Eventos INNER JOIN EventoEstados eves on Eventos.id=eves.IdEvento and eves.Id =(Select Max(id) From EventoEstados eVe1 where eVe1.IdEvento = Eventos.id) INNER JOIN Clientes cli on cli.Id=Eventos.idCliente Left JOIN Usuarios usu on usu.id=Eventos.IdUsuarioComercial Left Join Usuarios product on product.Id=Eventos.IdUsuarioProductor Left Join Stage stage on stage.ID=Eventos.IdStage where eves.idEstado='".$idTipoListado."'";

		return $eventos;

}
	?>
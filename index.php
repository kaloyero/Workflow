<?
session_start();

?>
<script>

<?
if ($_SESSION['idRol'] ==""){
echo 'window.location = "login.php"';
}else{
	echo 'console.log("ASDAD2")';
	//echo "SES".$_SESSION['idRol'];
}
?> 

var tipoUs = '<?php echo $_SESSION['idRol']; ?>';
console.log("SIM", tipoUs)





</script>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="myApp" class="no-js"> <!--<![endif]-->
<head>

<meta charset="utf-8">
<title>Rubra - WorkFlowEventos</title>
<meta name="description" content="FreshUI is a Premium Web App and Admin Template created by pixelcave and published on Themeforest. This is the demo of FreshUI! You need to purchase a license for legal use!">
<meta name="author" content="pixelcave">
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">
<link rel="shortcut icon" href="img/favicon.ico">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="57x57" href="img/apple-touch-icon-57x57-precomposed.png">
<link rel="apple-touch-icon" sizes="72x72" href="img/apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon" sizes="114x114" href="img/apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-precomposed.png">
<link rel="stylesheet" href="css/bootstrap-1.03.css">
<link rel="stylesheet" href="css/plugins-1.03.css">
<link rel="stylesheet" href="css/main-1.03.css">
<link rel="stylesheet" href="bower_components/html5-boilerplate/dist/css/normalize.css">
 <link rel="stylesheet" href="bower_components/html5-boilerplate/dist/css/main.css">
 <link rel="stylesheet" href="librerias/angular-multi-select-master/isteven-multi-select.css">

 <link rel="stylesheet" href="app.css">
 <script src="bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"></script>
<style>

.edicionForm .ngdialog-content {
   width: 80% !important;
 }
.search-button{
	background-color: #449A12 !important;
	    border-color: rgba(32, 90, 36, 0.85) !important;
	    box-shadow: 0 1px 0 #49803A !important;
}
.volver{
	background-color: #383C94 !important;
	    border-color: #1F65DC !important;
	    -webkit-box-shadow: 0 1px 0 #c0392b !important;
	    box-shadow: 0 1px 0 #5666AB !important;
}
.cerrar{
background-color: rgba(175, 181, 27, 0.63) !important;
    border-color: #7E8C2E !important;
    box-shadow: 0 1px 0 #556910 !important;
}
.confirmacionEstilo td{
	color: green;
	font-weight: bold;
}
.waitingEstilo td{
	color: #D0830E;
	font-weight: bold;
}
.pendingEstilo td{
	color: red;
	font-weight: bold;
}

.pendingEvent{
	border: 1px solid red;
    background-color: red;
}
.waitingEvent{
	border: 1px solid #f39c12;
    background-color: #f39c12;
}
.confirmEvent{
	border: 1px solid green;
    background-color: green;
}

</style>
</head>
<body class="header-fixed-top">


<div id="sidebar-left" class="enable-hover">
<div class="sidebar-content">
<form action="page_ready_search_results.html" method="post" class="sidebar-search">
<input type="text" id="sidebar-search-term" name="sidebar-search-term" placeholder="Search..">
</form>
<div class="sidebar-left-scroll">
<ul class="sidebar-nav">
<li>
<h2 class="sidebar-header">Bienvenido</h2>
</li>
<li>
<a href="#/inicio"><i class="icon-coffee"></i>Inicio</a>

<a href="http://belasoft.com.ar/workflow/php/logout.php"><i class="icon-coffee"></i>Log out</a>
</li>



<li>
<h2 class="sidebar-header">Acciones</h2>
</li>

<?
if ($_SESSION['idRol'] ==1 or $_SESSION['idRol'] ==2){
	echo '<li>';
	echo '<a href="#/evento"><i class="glyphicon-circle_plus"></i>Nuevo Evento</a>';
	echo '</li>';
}
?>

<?
if ($_SESSION['idRol'] ==1){
	echo '<li>';
	echo '<a href="#/usuario"><i class="glyphicon-circle_plus"></i>Nuevo Usuario</a>';
	echo '</li>';
echo '<li>';
	echo '<a href="#/cliente"><i class="glyphicon-circle_plus"></i>Nuevo Cliente</a>';
	echo '</li>';
}
?>

<li>
<h2 class="sidebar-header">Listados</h2>
</li>

<?
if ($_SESSION['idRol'] !=3){
	echo '<li>';
	echo '<a href="#/calendar"><i class="icon-time"></i>Calendar</a>';
	echo '</li>';
      echo '<li>';
	echo '<a href="#/notification"><i class="icon-time"></i> Notificacion </a>';
	echo '</li>';

}

?>
<?
if ($_SESSION['idRol'] ==1){
	echo '<li>';
	echo '<a href="#/usuarioListado"><i class="icon-time"></i>Usuario Listado</a>';
	echo '</li>';
echo '<li>';
	echo '<a href="#/clienteListado"><i class="icon-time"></i>Cliente Listado</a>';
	echo '</li>';
}
?>

<?
if ($_SESSION['idRol'] !=3){
	echo '<li>';
	echo '<a href="#/pending"><i class="icon-time"></i>Pending</a>';
	echo '</li>';
      echo '<li>';
	echo '<a href="#/waiting"><i class="glyphicon-lock"></i>Waiting</a>';
	echo '</li>';

}

?>

<li>
<a href="#/confirmacion"><i class="glyphicon-check"></i>Confirm</a>
</li>
<li>
<a href="#/facturacion"><i class="glyphicon-usd"></i>Facturacion</a>
</li>
<li>
<a href="#/historicos"><i class="glyphicon-usd"></i>Historicos</a>
</li>


</ul>
</div>
</div>
</div>
<div id="sidebar-right">
<div class="sidebar-content">
<div class="user-info">
<div class="user-details"><a href="page_special_user_profile.html">pixelcave</a><br><em>Web Designer</em></div>
<img src="img/template/avatar.png" alt="Avatar">
</div>
<div class="sidebar-right-scroll">
<ul class="sidebar-nav">
<li>
<h2 class="sidebar-header">Explore</h2>
</li>
<li>
<a href="page_special_timeline.html"><i class="icon-time"></i> Updates</a>
</li>
<li>
<a href="page_special_user_profile.html"><i class="icon-edit-sign"></i> Profile</a>
</li>
<li>
<a href="page_special_message_center.html"><i class="icon-envelope-alt"></i> Messages</a>
</li>
<li>
<a href="javascript:void(0)"><i class="icon-cog"></i> Settings</a>
</li>
<li>
<a href="page_special_login.html"><i class="icon-off"></i> Logout</a>
</li>
</ul>
<div class="sidebar-section">
<h2 class="sidebar-header">Notifications</h2>
<div class="alert alert-success alert-dismissable">
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
<small><em>2 hours ago</em></small><br>
PHP version updated successfully on <a href="javascript:void(0)">Server #5</a>
</div>
<div class="alert alert-danger alert-dismissable">
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
<small><em>3 hours ago</em></small><br>
<a href="javascript:void(0)">Game Server</a> crashed but restored!
</div>
<div class="alert alert-warning alert-dismissable">
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
<small><em>5 hours ago</em></small><br>
<a href="javascript:void(0)">FTP Server</a> went down for maintenance!
</div>
</div>
<div class="sidebar-section">
<h2 class="sidebar-header">Messages</h2>
<div class="alert alert-info">
<small><a href="page_special_user_profile.html">Claire</a>, 2 minutes ago</small><br>
Hi John, I just wanted to let you know that.. <a href="page_special_message_center.html">more</a>
</div>
<div class="alert alert-info">
<small><a href="page_special_user_profile.html">Michael</a>, 5 minutes ago</small><br>
The project is moving along just fine and we.. <a href="page_special_message_center.html">more</a>
</div>
</div>
</div>
</div>
</div>
<div id="page-container">
<header class="navbar navbar-default navbar-fixed-top">
<ul class="nav header-nav pull-right">

</a>
<ul class="dropdown-menu dropdown-custom pull-right">
<li class="hidden-xs hidden-sm dropdown-header text-center">FULL WIDTH PAGE</li>
<li class="hidden-xs hidden-sm">
<div class="btn-group btn-group-justified btn-group-sm">
<a href="javascript:void(0)" class="btn btn-default" id="options-fw-disable">Disable</a>
<a href="javascript:void(0)" class="btn btn-default" id="options-fw-enable">Enable</a>
</div>
</li>
<li class="dropdown-header text-center">HEADER</li>
<li>
<div class="btn-group btn-group-justified btn-group-sm">
<a href="javascript:void(0)" class="btn btn-default" id="options-header-default">Default</a>
<a href="javascript:void(0)" class="btn btn-default" id="options-header-inverse">Inverse</a>
</div>
</li>
<li>
<div class="btn-group btn-group-justified btn-group-sm">
<a href="javascript:void(0)" class="btn btn-default" id="options-header-top">Top</a>
<a href="javascript:void(0)" class="btn btn-default" id="options-header-bottom">Bottom</a>
</div>
</li>
<li class="visible-lg dropdown-header text-center">LEFT SIDEBAR MOUSE HOVER</li>
<li class="visible-lg">
<div class="btn-group btn-group-justified btn-group-sm">
<a href="javascript:void(0)" class="btn btn-default" id="options-hover-disable">Disable</a>
<a href="javascript:void(0)" class="btn btn-default" id="options-hover-enable">Enable</a>
</div>
</li>
<li class="hidden-lt-ie9 visible-lg dropdown-header text-center">EFFECT WHEN SIDEBARS OPEN</li>
<li class="hidden-lt-ie9 visible-lg text-center">
<div class="btn-group-vertical btn-group-sm" id="option-effects">
<button class="btn btn-default" data-fx="fx-none">None</button>
<button class="btn btn-default" data-fx="fx-opacity">Opacity</button>
<button class="btn btn-default" data-fx="fx-move">Move</button>
<button class="btn btn-default" data-fx="fx-push">Push</button>
<button class="btn btn-default" data-fx="fx-rotate">Rotate</button>
<button class="btn btn-default" data-fx="fx-push-move">Push and Move</button>
<button class="btn btn-default" data-fx="fx-push-rotate">Push and Rotate</button>
</div>
</li>
</ul>
</li>

</ul>
<ul class="nav header-nav pull-left">
<li>
<a href="javascript:void(0)" id="sidebar-left-toggle">
<i class="icon-reorder"></i>
</a>
</li>
</ul>
<a href="index.html" class="navbar-brand">
<img src="img/template/LogoAPUNTE.png" style="width: 100px;" alt="Apunte">
<span>By Rubra</span>
</a>
</header>



 <!--[if lt IE 7]>
     <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
 <![endif]-->

 <div ng-view>


 </div>
</form>
</div>
</div>
</div>
</div>
<footer class="clearfix">
<div class="pull-right">
Creado con  <i class="icon-heart"></i> by <a href="http://goo.gl/vNS3I" target="_blank">belasoft</a>
</div>
<div class="pull-left">
<span id="id">2015</span> &copy; <a href="#" target="_blank">WorkFlow 1.0</a>
</div>
</footer>
</div>
</div>
<a href="javascript:void(0)" id="to-top"><i class="icon-angle-up"></i></a>

<script src="js/jquery.min.js"></script>
<script src="vendor/datatables/media/js/jquery.dataTables.js"></script>

<script src="js/vendor/bootstrap.min-1.03.js"></script>

<script src="js/plugins-1.03.js"></script>


<script src="js/main-1.03.js"></script>

<script src="bower_components/angular/angular.js"></script>
<script src='librerias/ngMask.min.js'></script>
<script src="bower_components/angular-route/angular-route.js"></script>
<script src="bower_components/angular-resource/angular-resource.js"></script>

<link rel="stylesheet" href="node_modules/ng-dialog//css/ngDialog.css">

<link rel="stylesheet" href="node_modules/ng-dialog//css/ngDialog-theme-default.css">

<link rel="stylesheet" href="node_modules/ng-dialog/css/ngDialog-theme-plain.css">

<script src="node_modules/ng-dialog/js/ngDialog.js"></script>


<!--[if lt IE 7]>
     <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
 <![endif]-->





<!--	<script src="vendor/angular/angular.js"></script>
	<script src="bower_components/angular-route/angular-route.js"></script>

  <script src="vendor/angular-resource/angular-resource.min.js"></script>-->







<script src="js/extras/angular-datatables.js"></script>
<script src="js/extras/angular-datatables.util.js"></script>
<script src="js/extras/angular-datatables.options.js"></script>
<script src="js/extras/angular-datatables.instances.js"></script>
<script src="js/extras/angular-datatables.factory.js"></script>
<script src="js/extras/angular-datatables.renderer.js"></script>
<script src="js/extras/angular-datatables.directive.js"></script>









<script src="app.js"></script>

<script src="evento/evento.js"></script>

<script src="notificacion/notificacion.js"></script>

<script src="confirmacion/confirmacion.js"></script>
<script src="pending/pending.js"></script>
<script src="waiting/waiting.js"></script>
<script src="inicio/inicio.js"></script>

<script src="evento/services.js"></script>
<script src="facturacion/previstos.js"></script>
<script src="facturacion/confirmados.js"></script>

<script src="waiting/servicioWaiting.js"></script>

<script src="calendar/calendar.js"></script>
<script src="usuario/usuario.js"></script>
<script src="usuario/usuarioListado.js"></script>
<script src="cliente/cliente.js"></script>
<script src="cliente/clienteListado.js"></script>


<script src="historicos/historicos.js"></script>


<script src="components/version/version.js"></script>
<script src="components/version/version-directive.js"></script>
<script src="components/version/interpolate-filter.js"></script>
<script src="librerias/angular-multi-select-master/doc/highlight/highlight.pack.js"></script>

<script src="librerias/angular-multi-select-master/isteven-multi-select.js"></script>


<script>
console.log("EHH",window.location)
//Si entro a /workflow sin nada,redirecciono al VERDADERO inicio.Habria que poner si la URL es disinta a un array con posibles URLs VALidas
if (window.location.hash==""){
	window.location = "#/inicio";
}















</script>
</body>

<?
session_start();
?>
<script>
var simple = '<?php echo $_SESSION['idRol']; ?>';
console.log("SIM", simple)
</script>






<div id="fx-container" class="fx-opacity"><div id="page-content" class="block full">
<div class="block-header">
<a href="#" class="header-title-link">
<h1>
<i class="icon-thumbs-up-alt animation-expandUp"></i>Listado Historicos<br><small>Listado de los Eventos en estado Cancelados/Cerrados</small>
</h1>
</a>
</div>
<ul class="breadcrumb breadcrumb-top">
<li><i class="icon-th"></i></li>
<li>Eventos</li>
<li><a href="#">Historicos</a></li>
</ul>
<!--<p><a href="https://datatables.net/" target="_blank">Recepcion</a> El siguiente listado muestra los invitados al Evento XXXXX.Le permite llevar el control de los ingresos y aplicar acciones sobre ellos,tales como marcar entrada de los mismos ,acreditarlos o dejar constancia de su abrigo y/o estacionamiento</p>-->

<div class="block block-tabs full">
<div class="block-title">
<div class="block-options pull-right">

</div>
<ul class="nav nav-tabs" data-toggle="tabs">
</ul>
</div>
<div class="tab-content">
	<div class="tab-pane active" id="example-tabs2-home">

		<div class="table-responsive">
			<div ng-controller="datatableControllerHistoricos as lista">

			    <table datatable dt-options="lista.dtOptions" dt-columns="lista.dtColumns" dt-instance="lista.dtInstance" class="table table-bordered table-hover "></table>
			</div>

		</div>


		</div>


	</div>
</div>

</div>

</div>

<script src="js/vendor/bootstrap.min-1.03.js"></script>

<script src="js/plugins-1.03.js"></script>
over pendingEstilo"></table>
			</div>

		</div>


		</div>


	</div>
</div>

</div>

</div>

<script src="js/vendor/bootstrap.min-1.03.js"></script>

<script src="js/plugins-1.03.js"></script>

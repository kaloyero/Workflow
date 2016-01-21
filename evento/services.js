'use strict';

var services = angular.module('myApp.services', ['ngResource']);
var servicesCancel = angular.module('myApp.servicesCancel', ['ngResource']);
var servicesCliente = angular.module('myApp.servicesCliente', ['ngResource']);
var servicesUsuario = angular.module('myApp.servicesUsuario', ['ngResource']);
var servicesFacturacion = angular.module('myApp.servicesFacturacion', ['ngResource']);
var servicesTipoEventos = angular.module('myApp.servicesTipoEventos', ['ngResource']);
var servicesStage = angular.module('myApp.servicesStage', ['ngResource']);
var servicesRenegociar = angular.module('myApp.servicesRenegociar', ['ngResource']);
var servicesTotales = angular.module('myApp.servicesTotales', ['ngResource']);
var servicesHistoricos = angular.module('myApp.servicesHistoricos', ['ngResource']);
var servicesClienteABM = angular.module('myApp.servicesClienteABM', ['ngResource']);



var servicesRoles = angular.module('myApp.servicesRoles', ['ngResource']);



var baseUrl = 'http://belasoft.com.ar\\workflow';


services.factory('TotalesFactory', function ($resource) {
    console.log("Totales")
    return $resource(baseUrl + '/php/totalesDao.php',{}, {
        query: { method: 'GET',  isArray: true }
    })
});







services.factory('EventosFactory', function ($resource) {
    console.log("FAV")
    return $resource(baseUrl + '/php/eventoDao.php', {id: '@id'}, {
        query: { method: 'GET',  isArray: true },
        save: { method: 'POST'},
        update: { method: 'PUT'}
    })
});
servicesRenegociar.factory('RenegociarFactory', function ($resource) {
    console.log("FAV")
    return $resource(baseUrl + '/php/renegociarDao.php', {id: '@id'}, {
        update: { method: 'PUT'}
    })
});

servicesCancel.factory('EventosCancelFactory', function ($resource) {
    return $resource(baseUrl + '/php/eventoCancelDao.php', {}, {
        update: { method: 'POST'}
    })
});

servicesCliente.factory('ClientesFactory', function ($resource) {
    return $resource(baseUrl + '/php/clienteDao.php', {}, {
        query: { method: 'GET', isArray: true }
    })
});

servicesClienteABM.factory('ClientesFactoryABM', function ($resource) {
    return $resource(baseUrl + '/php/clienteController.php', {}, {
         query: { method: 'GET', isArray: true },
        save: { method: 'POST'},
	 update: { method: 'PUT'}
    })
});

servicesHistoricos.factory('HistoricosFactory', function ($resource) {
    return $resource(baseUrl + '/php/eventosHistoricosDao.php', {}, {
        query: { method: 'GET', isArray: true }
    })
});
servicesRoles.factory('RolesFactory', function ($resource) {
    return $resource(baseUrl + '/php/rolesDao.php', {}, {
        query: { method: 'GET', isArray: true }
    })
});
servicesUsuario.factory('UsuariosFactory', function ($resource) {
    return $resource(baseUrl + '/php/usuarioController.php', {}, {
        query: { method: 'GET', isArray: true },
        save: { method: 'POST'},
	 update: { method: 'PUT'}


    })
});
servicesFacturacion.factory('FacturacionFactory', function ($resource) {
    return $resource(baseUrl + '/php/facturacionController.php', {}, {
        query: { method: 'GET', isArray: true },
        save: { method: 'POST'},
    })

});
servicesTipoEventos.factory('TipoEventosFactory', function ($resource) {
     return $resource(baseUrl + '/php/tipoEventosDao.php', {}, {
         query: { method: 'GET', isArray: true }
     })
 });
 servicesStage.factory('StageFactory', function ($resource) {
      return $resource(baseUrl + '/php/stageDao.php', {}, {
          query: { method: 'GET', isArray: true }
      })
  });




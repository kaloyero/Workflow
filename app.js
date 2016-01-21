'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.servicesCancel',
  'myApp.servicesCliente',
 'myApp.servicesClienteABM',
  'myApp.servicesUsuario',
  'myApp.servicesFacturacion',
  'myApp.servicesRenegociar',
  'myApp.inicio',

  'myApp.evento',
  'myApp.confirmacion',
  'myApp.pending',
  'myApp.historicos',

  'myApp.waiting',
  'myApp.notificacion',
  'myApp.cliente',

  'myApp.facturacionPrevistos',
  'myApp.facturacionConfirmados',
  'myApp.calendar',
  'myApp.usuario',
  'myApp.usuarioListado',
   'myApp.clienteListado',

  'myApp.servicioWaiting',
  'isteven-multi-select',
   'myApp.servicesTipoEventos',
      'myApp.servicesStage',
   'myApp.servicesRoles',
'myApp.servicesTotales',
'myApp.servicesHistoricos'

])
//config(['$routeProvider', function($routeProvider) {
 // $routeProvider.otherwise({redirectTo: '/evento'});
 // $httpProvider.defaults.useXDomain = true;
//delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}]);








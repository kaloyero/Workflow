'use strict';

var servicioWaiting = angular.module('myApp.servicioWaiting', ['ngResource']);

var baseUrl = 'http://belasoft.com.ar\\workflow';


servicioWaiting.factory('WaitingFactory', function ($resource) {
    console.log("FAV")
    return $resource(baseUrl + '/php/eventoEstadosDao.php', {}, {
        update: { method: 'POST'}
    })
});



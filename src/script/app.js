const angular = require('angular');
const ngRoute = require('angular-route');
require('./mainCtrl');
//css
require('../css/app.css');


const app = angular.module('app', ['app.controllers.main']);//引入路由依赖





'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');

const gearShare = angular.module('gear-share', [uiRouter, ngFileUpload]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(path => {
  gearShare.config(context(path));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  gearShare.controller(name, module);
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  gearShare.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  gearShare.component(name, module);
});

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  gearShare.filter(name, module);
})

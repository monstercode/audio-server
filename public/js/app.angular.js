'use strict';
// Define the `dirApp` module
var audioServerApp = angular.module('audioServerApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
audioServerApp.controller('AudioController', function AudioController($scope, $http) {
    
  $scope.setAudioSrc = function(audioSrc){
    $scope.mainAudioSrc = audioSrc;
    var audio = document.getElementById('audio');
    audio.load();
    audio.play();
  };

  $scope.setFolder = function(folder){
      $http.get(folder).then(function(response) {
      $scope.folders = response.data;
      // EL boton de regresar es la nueva url menos la ultima parte despues de la ultima /
      var goBack = folder.split('/');
      goBack.pop();   
      $scope.goBack = goBack.join('/');
    });
  };

  //One Ok Rock - Ambitions
  $http.get('folders/data/').then(function(response) {
    $scope.goBack = 'folders/data/';
    $scope.folders = response.data;
    if (response.data.length > 0 && 'file' == response.data[0].type) {
        $scope.mainAudioSrc = response.data[0].path;
        var audio = document.getElementById('audio');
        audio.load();;
    }
  });
});
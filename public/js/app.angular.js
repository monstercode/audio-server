'use strict';
// Define the `dirApp` module
var audioServerApp = angular.module('audioServerApp', ['ngAnimate']);

// Define the `PhoneListController` controller on the `phonecatApp` module
audioServerApp.controller('AudioController', function AudioController($scope, $http) {

  $scope.playlist = [];
  $scope.playlistCurrent = -1;
  $scope.audio = document.getElementById('audio')
  $scope.audio.volume = 0.8;

  $scope.setAudioSrc = function(index, audioSrc){
    $scope.playlistCurrent = index;
    $scope.audio.src = audioSrc;    
    $scope.audio.load();
    $scope.audio.play();
  };

  $scope.audio.addEventListener('ended', function(){
    $scope.playlistCurrent += 1;
    if ($scope.playlistCurrent < $scope.playlist.length ) {
      $scope.audio.src = $scope.playlist[$scope.playlistCurrent].path
      $scope.audio.load();
      $scope.audio.play();
    }

    $scope.$apply();
  });

  $scope.setFolder = function(folder){
      $http.get(folder).then(function(response) {
      $scope.folders = response.data;
      // EL boton de regresar es la nueva url menos la ultima parte despues de la ultima /
      var goBack = folder.split('/');
      goBack.pop();   
      $scope.goBack = goBack.join('/');
    });
  };


  
  $scope.removeFromPlaylist = function(index){
    if (index < $scope.playlistCurrent) {
      $scope.playlistCurrent -= 1;
    }
    $scope.playlist.splice(index, 1);
  };

  $scope.addAllToPlaylist = function(){
      $scope.playlist = $scope.playlist.concat($scope.folders.filter(function(item){
        return item.type == 'file' && !$scope.playlist.includes(item);
      }))
  };

  $scope.addToPlaylist = function(audioElement){
      if(audioElement.type == 'file' && !$scope.playlist.includes(audioElement)){
        $scope.playlist.push(audioElement);
      }       
  };

  // Inicializo el listado de carpetas
  $http.get('folders/data/').then(function(response) {
    $scope.goBack = 'folders/data/';
    $scope.folders = response.data;
  });
});
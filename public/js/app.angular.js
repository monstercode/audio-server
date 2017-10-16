'use strict';
// Define the `dirApp` module
var audioServerApp = angular.module('audioServerApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
audioServerApp.controller('AudioController', function AudioController($scope, $http) {

  $scope.playlist = [];
  $scope.playlistCurrent = -1;
  $scope.audio = document.getElementById('audio')
  $scope.playing = !$scope.audio.paused
  $scope.setAudioSrc = function(index, audioSrc){
    $scope.playlistCurrent = index;
    $scope.audio.src = audioSrc;    
    $scope.audio.load();
    $scope.audio.play();
  $scope.playing = !$scope.audio.paused
  };

  $scope.audio.addEventListener('ended', function(){
    $scope.playlistCurrent += 1;
    console.log($scope.playlistCurrent, $scope.playlist.length);
    if ($scope.playlistCurrent < $scope.playlist.length ) {
      $scope.audio.src = $scope.playlist[$scope.playlistCurrent].path
      $scope.audio.load();
      $scope.audio.play();
    }

    $scope.$apply();  // <<<<
    $scope.playing = !$scope.audio.paused
  });
  
  /*$scope.setAudioSrc = function(audioSrc){
    $scope.mainAudioSrc = audioSrc;
    var audio = document.getElementById('audio');
    audio.load();
    audio.play();
  };*/

  $scope.playAudio = function(){
    $scope.audio.play();
    $scope.playing = !$scope.audio.paused
  }

  $scope.pauseAudio = function(){
    $scope.audio.pause();
    $scope.playing = !$scope.audio.paused
  }

  $scope.setFolder = function(folder){
      $http.get(folder).then(function(response) {
      $scope.folders = response.data;
      // EL boton de regresar es la nueva url menos la ultima parte despues de la ultima /
      var goBack = folder.split('/');
      goBack.pop();   
      $scope.goBack = goBack.join('/');
    });
  };

  $scope.addAllToPlaylist= function(){
      $scope.playlist = $scope.playlist.concat($scope.folders.filter(function(item){
        return item.type == 'file';
      }))
  };

  /*$scope.audio.addEventListener('ended', function(){
        $scope.class = "playButton play";
        $scope.afspelen = false;
        console.log("ended ");
    });*/

  $http.get('folders/data/').then(function(response) {
    $scope.goBack = 'folders/data/';
    $scope.folders = response.data;
  });
});
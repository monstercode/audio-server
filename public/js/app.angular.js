// Define the `dirApp` module
var audioServerApp = angular.module('audioServerApp', []);

// Define the `PhoneListController` controller on the `dirApp` module
audioServerApp.controller('DirsListController', function DirsListController($scope) {
  $scope.folders = [
    {
      name: "01 - Ambitions –Introduction–.mp3",
      path: "tracks/One Ok Rock - Ambitions/01 - Ambitions –Introduction–.mp3"
    },
    {
      name: "02 - Bombs away.mp3",
      path: "tracks/One Ok Rock - Ambitions/02 - Bombs away.mp3"
    },
    {
      name: "03 - Taking Off.mp3",
      path: "tracks/One Ok Rock - Ambitions/03 - Taking Off.mp3"
    },
    {
      name: "04 - We are.mp3",
      path: "tracks/One Ok Rock - Ambitions/04 - We are.mp3"
    },
    {
      name: "05 - 20-20.mp3",
      path: "tracks/One Ok Rock - Ambitions/05 - 20-20.mp3"
    },
    {
      name: "06 - Always coming back.mp3",
      path: "tracks/One Ok Rock - Ambitions/06 - Always coming back.mp3"
    },
    {
      name: "07 - Bedroom Warfare.mp3",
      path: "tracks/One Ok Rock - Ambitions/07 - Bedroom Warfare.mp3"
    },
    {
      name: "08 - Lost in Tonight.mp3",
      path: "tracks/One Ok Rock - Ambitions/08 - Lost in Tonight.mp3"
    },
    {
      name: "09 - I was King.mp3",
      path: "tracks/One Ok Rock - Ambitions/09 - I was King.mp3"
    },
    {
      name: "10 - ONE OK ROCK feat. Avril Lavigne - Listen.mp3",
      path: "tracks/One Ok Rock - Ambitions/10 - ONE OK ROCK feat. Avril Lavigne - Listen.mp3"
    },
    {
      name: "11 - One Way Ticket.mp3",
      path: "tracks/One Ok Rock - Ambitions/11 - One Way Ticket.mp3"
    },
    {
      name: "12 - Bon Voyage.mp3",
      path: "tracks/One Ok Rock - Ambitions/12 - Bon Voyage.mp3"
    },
    {
      name: "13 - Start Again.mp3",
      path: "tracks/One Ok Rock - Ambitions/13 - Start Again.mp3"
    },
    {
      name: "14 - ONE OK ROCK feat. 5 Seconds of Summer - Take what you want.mp3",
      path: "tracks/One Ok Rock - Ambitions/14 - ONE OK ROCK feat. 5 Seconds of Summer - Take what you want.mp3"
    }  
  ];
});
const express = require('express')
const app = express()

// lo que esta en public accede de forma estatica
app.use("/public", express.static(__dirname + '/public'));
app.set('view engine', 'pug')

var fs = require('fs');
var path = require('path');
var id3 = require('id3js');

// Home
app.get('/', function (req, res) {
  res.render('index', { title: 'Cool Audio Server'});
})

// Informacion de la carpeta y directorios
app.get('/folders/data/:dir?', function (req, res) {
    var dir = req.params.dir ? req.params.dir : '';
    var dirPath = path.join(__dirname, 'tracks/'+dir);
    fs.readdir(dirPath, (err, files) => {
        files = files.filter(function(dirOrFile) {
            //filtro los que terminan en .png, .jpg y.jpeg
            return dirOrFile.match('\.png$|\.jpg$|\.jpeg$') === null; 
        });
        res.send(files);
    });
})

// Informacion del tag de la cancion
app.get('/tracks/data/:song', function (req, res) {
  var file = req.params.song;
  var filePath = path.join(__dirname, 'tracks/'+file);

  id3({ file:filePath, type: id3.OPEN_LOCAL }, function(err, tags) {
      res.send(tags);
  });
})

// Streaming de la cancion
app.get('/tracks/*?', function (req, res) {
console.log(req.params[0]);
  //var file = req.params.song;
  var file = req.params[0];
  var filePath = path.join(__dirname, 'tracks/'+file);
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);

})

app.listen(8080, function () {
  console.log('Listening on port 8000!')
})


const express = require('express')
const app = express()

// Access to static files in the /public directory
app.use("/public", express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

var fs = require('fs');
var path = require('path');
var id3 = require('id3js');

var config = require('./config.js');

// Return the index.html for the home
app.get('/', function (req, res) {
  res.render('views/index.html');
})

// Read the contents of the directory
app.get('/folders/data*?', function (req, res) {
    var dir = req.params[0] ? req.params[0].replace('/../', '') : '';
    var dirPath = path.join(config.audio_path, '/'+dir);
    
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(err);
            res.send({'error':'File or Dir not found'});  
        }

        promises = files.filter(function(dirOrFile) {
            // filter files/dirs that don't intereset us. This can be improved.
            return dirOrFile.match('\.png$|\.jpg$|\.jpeg$|\.db') === null; 
        }).map(function(dirOrFile){
            // for each element of the result of 'ls', return if it is a file or a folder
            return new Promise((resolve, reject) => {
                var fullPath = path.join(dirPath, dirOrFile);
                fs.lstat(fullPath, (err, stats) => {
                    if(err){ reject(console.log(err)); }

                    if (stats.isDirectory()) {
                        resolve( {'name':dirOrFile, 'path': path.join('folders/data/'+dir,dirOrFile), 'type':'dir'} );
                    }else if(stats.isFile()){
                        resolve( {'name':dirOrFile, 'path': path.join('tracks/'+dir,dirOrFile), 'type':'file'} );
                    }

                    resolve({'name':dirOrFile,'path': dirOrFile, 'type':'unknown'});
                });
            });
        });

        Promise.all(promises).then(function(results){
            res.send(results);
        })
    });
})



// Streaming
app.get('/tracks/*?', function (req, res) {
    console.log('Streaming: ' + req.params[0]);
    var file = req.params[0];
    var filePath = path.join(config.audio_path, '/'+file);
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
})


/*
// Enpoints in progress 

// Get te id3 tag for mp3 files
app.get('/tracks/data/*?', function (req, res) {
console.log('Tag Info: ' + req.params[0]);
  var file = req.params[0];
  var filePath = path.join(config.audio_path, '/'+file);

  id3({ file:filePath, type: id3.OPEN_LOCAL }, function(err, tags) {
      
      
      // var binary = '';
      // var bytes = new Uint8Array( tags.v2.image.data );
      // var len = bytes.byteLength;
      // for (var i = 0; i < len; i++) {
      //     binary += String.fromCharCode( bytes[ i ] );
      // }
      
      // tags.v2.image.image = binary

      res.send(tags);
  });
})

// Get the image in the id3 tag for mp3 files
app.get('/tracks/img/*?', function (req, res) {
    console.log('Tag Info: ' + req.params[0]);
    var file = req.params[0];
    var filePath = path.join(config.audio_path, '/'+file);

    id3({ file:filePath, type: id3.OPEN_LOCAL }, function(err, tags) {

        //console.log(tags.v2.image );
        //var img = new Buffer(tags.v2.image.data, 'base64');
        
        var img = Buffer.from(tags.v2.image.data);
        //let img =tags.v2.image.data;
        console.log(tags.v2.image.mime);
        //console.log(img.length);
        res.writeHead(200, {
            'Content-Type': tags.v2.image.mime,
            //'Content-Length': tags.v2.image.data.byteLength,
            'Content-Length': img.length,
        });
        res.end(img);
    });
})

*/

app.listen(config.port, function () {
  console.log('Listening on port '+config.port+'!')
})


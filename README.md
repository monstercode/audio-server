# Audio-server

This is a local audio server. It's a json-based API made in node.js that list dirs and streams music. The frontend is a very small an angular.js.

Firt, install dependencies

```bash
npm install
```

Then configure the path where your music is and the port where the server will be listening in config.js

```javascript
module.exports = {
  audio_path: '/vagrant_data/music',
  port: 9000,
}
```

Start the server

```bash
node app.js
```

Open your browser (preferably Firefox, the styles in Chrome are not working) and go to localhost:9000 (or the port you configured).

The server is accesible from your LAN, so using your computers ip instead of localhost would work. Now you can hear your music from the bathroom, yey!

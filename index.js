const http = require("http");
const fs = require("fs");
const axios = require('axios').default;

const PROVIDERS = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const CLIENTS = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

function giveFile (callback) {
  fs.readFile("index.js", (err, data) => {
    callback(data.toString());
  });
}

function readJSON (url, callback) {
  axios.get(url).then(res => {
    res.data;
  }).catch(err => console.error(err));
}

http.createServer((req, res) => {
  giveFile(f => res.end(f));
}).listen(8000);

readJSON(PROVIDERS);
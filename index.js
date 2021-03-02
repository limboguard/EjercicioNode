const http = require("http");
const fs = require("fs");
const util = require('util');
const axios = require('axios').default;
const { table } = require("console");

const PROVIDERS = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const CLIENTS = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

function getHtml () {
  return util.promisify(fs.readFile)("index.html");
}

async function readJSON (url) {
  return axios.get(url).then(res => {
    return res.data;
  }).catch(err => console.error(err));
}

http.createServer((req, res) => {
  if (req.url.includes("/api/proveedores")) {
    Promise.all([readJSON(PROVIDERS), getHtml()]).then(results => {
      const data = results[0];
      let html = results[1].toString();
      html = html.replace(/<!-- Title -->/g, " proveedores");

      const tableBody = data.map(d => (`<tr><td>${d.idproveedor}</td><td>${d.nombrecompania}</td><td>${d.nombrecontacto}</td></tr>`)).join("");
      console.log(tableBody)

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html.replace("<!-- Table Data -->", tableBody));
      res.end();
    }).catch(err => console.error(err));
  }
  else if (req.url.includes("/api/clientes")) {
    Promise.all([readJSON(CLIENTS), getHtml()]).then(results => {
      const data = results[0];
      let html = results[1].toString();
      html = html.replace(/<!-- Title -->/g, " clientes");
      
      const tableBody = data.map(d => (`<tr><td>${d.idCliente}</td><td>${d.NombreCompania}</td><td>${d.NombreContacto}</td></tr>`)).join("");
      
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html.replace("<!-- Table Data -->", tableBody));
      res.end();

    }).catch(err => console.error(err));
  }
}).listen(8081);
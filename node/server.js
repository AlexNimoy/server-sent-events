const http = require("http");
const fs = require("fs");
const path = require("path");

const getRandomInt = max => Math.floor(Math.random()*max);

function sse(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let id = 0;
  let data;
  setInterval(() => {
    data = getRandomInt(100);
    res.write(`data: ${data}\n`);
    res.write(`id: ${++id} \n`);
    res.write("\n");
  }, 1000);
}

http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);

  if (url.pathname === "/stream") {
    sse(req, res);
    return;
  }

  const fileStream = fs.createReadStream(path.join(__dirname, "index.html"));
  fileStream.pipe(res);
}).listen(8086, () => {
    console.log("Server started on 8086")
})

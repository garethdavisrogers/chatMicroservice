const http = require("http");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const createCluster = (port) => {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs.length; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      console.log(`worker process ${process.pid} has died`);
      console.log(`${Object.keys(cluster.workers).length} remain`);
      console.log(`Starting new worker`);
      cluster.fork();
    });
  } else {
    http
      .createServer((req, res) => {
        res.end(`process:${process.pid}`);
        if (req.url === "/kill") {
          process.exit();
        } else if (req.url === "/") {
          console.log(`serving from ${process.pid}`);
        }
      })
      .listen(port);
  }
};

module.exports = createCluster;

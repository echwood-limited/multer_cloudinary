require('es6')
const multer = require('multer')
const cluster = require('cluster');
const server = require('http').createServer
const app = require('express')()
const numCPUs = require('os').cpus().length;

const upload  = multer({
    storage:  GoogleDriveStorage({
      drive: new gdrive().drive,
      parents: 'AIMS',
      fileName: function (req, file, cb) {
        let filename = `test-${file.originalname}`;
        cb(null, filename);
      }
    })
  })

console.log(numCPUs)
if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
        console.log(`Worker ${process.pid} started`);
        app.listen(3000, function () {
            console.log('listening on port 3000.');
        });
    }


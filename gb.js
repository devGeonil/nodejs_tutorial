//cluster 에는 master 프로세스와 worker프로 세스가 있습니다. cluster.fork()가 워커를 만듭니다.
  const cluster = require('cluster');
  const os = require('os');
  const numCPU = os.cpus().length;
  const http = require('http');
  if(cluster.isMaster){
      console.log('마스터 프로세스 아이디 ',process.pid)
      for(let i = 0 ; i < numCPU; i++){
        cluster.fork();
      }
      cluster.on('exit',(worker, code, signal)=>{
        console.log(worker.process.pid,'worker die');
        //cluster.fork();
      })
  }else {
  //worker
    http.createServer((req, res)=>{
      res.end('http server');
      setTimeout(()=>{
        process.exit(1);
      },1000)
    }).listen(8080);
    console.log(process.pid, 'start worker')
  }

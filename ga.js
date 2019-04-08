const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  console.log('서버 실행')
  if(req.url.startsWith('/login')){
  }else{
    console.log(req.headers.cookie)
    fs.readFile('./server.html', (err, data)=>{
      if(err)
        throw err
      res.writeHead(200,{ Location: '/','Set-Cookie':'mycookie=test'});
      res.end(data); //브라우저가 알아서  버퍼를 변환 처리 해줍니다.
      //axios.get('www.google.com');  이렇게 구글에 요청을 보낼 수 있는데 이게 뭔지는 아직 모르겠당
    })
  }
})
server.listen(8081, ()=>{
  console.log('8081 port에서 실행됩니다');
});
// server.on('listening', ()=>{
//   console.log('8081 port ');
// })
server.on('err', (error)=>{
  console.error(error);
})

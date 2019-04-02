# Nodejs 학습!
>1) 노드 공식 홈페이지에 접속하여 원하시는 버전을 다운 받아 주세요!

### REPL
R : Read
E : Evalute
P : Print
L : Loop

### 핵심 개념
nodejs는 (1)이벤트 기반, (2)논 블로킹I/O 모델을 사용해 가볍고 효율적이며, (3)싱글 쓰레드를 사용. <br>

>1) 이벤트 루프
: 자바스크립 코드가 있을때 어떤 순서로 실행되는지 알 수 있는가 여부.
<pre>
  <code>
    function first(){
      second();
      console.log(1);
    }
    function second(){
      third();
      console.log(2)
    }
    function third(){
      console.log(3)
    }
    first();
  </code>
</pre>
<pre>
  <code>
    //태스크 큐 + 이벤트루프 + 호출스택
    function run(){
      console.log('3초');
    }
    console.log("start"); //호출스택
    setTimeout(run, 3000); // ren 을 테스크 큐에 보내 버림 + 이벤트 루프가 3 초 체크 + 태스크 에서 호출 스택으로 run을 가져와서 실행
    console.log("end"); // 호출스택
  </code>
</pre>

>2) 언제 태스크 큐에 들어가나요? ( 여러개의 큐가 존재 하며 우선순위 껴들기가 가능함..)
setTimeout, setInterval, setImmediate,
Promise resolve, reject,이벤트 리스너의 콜백

>3) 이벤트 드리븐 , 싱글쓰레드, 논블러킹 IO
 1. 이벤트 드리븐 : 이벤트 리스너의 콜백(태스크 큐) -> 호출 스택으로 옮겨 주는 것
    -> 서버는 이벤트를 기다리며, 응답 한다. (이벤트 리서를 등록)<br>
 2.  논블러킹 : 테스크 큐로 보내 버려서, 시작 되는 코드순 서를 달라 지게 하는 것을 말한다. (I/O : 파일 / 네트워크)
 3. 싱글 쓰레드 : 팔이 한 개라서 한가지 일 밖에 못한다!!

>4) ECMAScript 2015
  1. const vs let
  -> 블록 영역을 밤주를 가지며, const 변경 불가, let 변경 가능
  2. 백틱 (\`)
  -> 문자열을 백틱을 사용해서 만들 수 있으며, 내부에서 ${변수}를 사옹하여 추가 할 수 있다.
  3. 객체 리터럴의 변화
  -> {hello : function(){console.log("hello")}} => {hello(){console.log("hello")},["name"]:"Geonil"s}
  4. 화살표 함수 "=>"
  -> 함수 선언문 function() foreach 에서 사용하는 this는 window,
  함수 표현식 에서 사용 하는 this는 자신의 객체
  const add2 => (v1, v2) => v1+v2
  5. 비구조 할당 destructuring
  -> const { 객체 속성 } = 객체
     var array = [1,23,2,4];
     const [one, two, , four] = array
  6. 콜백과 프로미스 비교
  -> 프로미스는 결과를 가지고 있지만 밖에 표현을 안해 줬다고 생각하면 편합니다!!
    <pre>
      <code>
        function ff(value, cb){
          if(value=="some") cb(null, value)
          else cb("thing", value)
        }
        ff("some", (error, value)=>{error, value})
      </code>
    </pre>
    <pre>
      <code>
        const plus = new Promise((resolve, reject) =>{
          const a = 1;
          const b = 2;
          if(a + b > 2){
            resolve(a+b);
          }else{
            reject(a+b);
          }
        });
        plus
          .then((success)=>{
            console.log(success);
          })
          .catch((fail)=>{
            console.log(fail);
          })
      </code>
     </pre>
      <pre>
        <code>
          Promise.all([us.d(), ss.so(), s.s()])
            .then(re => {})
            .catch((fail)=> console.log(fail);
            //아래는 예시
            const k1 = (value) => {if(value === "geonil"){
            	return Promise.resolve("성공");
            }else{
            	return Promise.reject("실패");
            }}
        </code>
      </pre>
  7. Async / Await
    <pre>
      <code>
        async fun(){
          try{
            await f1();
            await f2();
            await f3();
          }catch(err){console.log(err)}
        }
      </code>
    </pre>

>5) 노드의 기능
1. 다음 코드를 통해서 다른 파일에 들어 있는 변수를 사용 할 수 있다.
 <pre>
  <code>
    //var
    const odd = "odd";
    const even = "even";
    module.exports = {odd, even}
    exports.odd = odd;
    exports.even = even;
    //use
    const {odd , even } = require('./var');
    console.log(add);
    console.log(even)
  </code>
</pre>
  <pre>
   <code>
     //var
     export const odd = "odd";
     export const even = "even";
     //use
     import {odd, evem } from "./var"
     console.log(add);
     console.log(even)
   </code>
  </pre>
2. global : 새로운 전역 객체
-> global.something = "value";
  <pre>
    <code>
      //ga.js
      //export const va = () => global.me
      exports.va = () => global.me
      exports.name = "Geonil"
      //gb.js
      //import {va} from "./ga"
      const {name, va} = require("./ga")
      global.me = "D",
      console.log(va());
      console.log(global.me)
      console.log(name)
    </code>
  </pre>
3.  console 객체
-> console.time(인자) ~ console.timeEnd(인자) 사이의 시간을 측정한다.
-> console.dir / console.dir(obj, {color:bool, depth:dep})
-> console.trace()
4. 타이머
  <pre>
    <code>
      const timeout = setTimeout(function , 1000) 1초 후에
      const interval = setInterval(function, 1000) 1초마다
      clearTimeout(timeout); 해제
      clearInterval(interval); 해제 하는 함수 입니다.
      const im = setImmediate(()=> console.log("즉시실행")); //비동기 효솨를 바로 사용하기 위해서 사용하기 위해서 사용한다.
      clearImmediate(im);
    </code>
  </pre>
5. __filename, __dirname, process
  -> process : process는 쓰레드 보다 큰 개념 = 하나의 프로그램이라고 생각하면됩니다. 현재 실행중인 자바스크립의 정보를 담고 있습니다.
    <pre>
      <code>
        console.log(__filename); //파일경로
        console.log(__dirname); // 파일이 들어 있는 경로
        process.arch() / process.uptime() / process.cwd() / process.execPath() .. 다양한 함수를 제공한다
        위의 함수를 데스크탑 드로그램을  실행 시킬 때 사용하는 객체.. 음
        process.exit() // 서비스를 죽일 때 사용할 수 있어요
        for(let i = 0 ; i < 10000 ; i++){
            console.log(i);
            process.exit(); // 0만 축력되고 서비스는 죽는다.
        }
      </code>
    </pre>
6. os 모듈 운영체제와 관련되 모듈입니다.
  -> 내장 모듈을 사용!! require() 로 불러 올 수 있습니다
  <pre>
    <code>
      const os = require('os')
      os.arch();
      os.type();
      os.uptime();
      os.hostname();
      os.homedir();
      os.tmpdir();
      os.freemem();
      os.cpu();
    </code>
  </pre>
7. path 모듈
  -> 진짜 많이 사용하게 될 예정입니다!!
  <pre>
    <code>
      const path = require("path");
      path.sep "\\" // 경로구문자.
      path.dekimiter ";" // 환경 변수 구분자.
      path.dirname(___filename); // 실행 파일이 들어 있는 경로
      path.extname(___filename); // 실행 파일의 확장자
      path.basename(___filename); // 실행 파일의 이름
      path.parse(__filename); // 위의 내용을 객체로 던저 준다.
      path.format(path.parse(__filename)) // 위의 parse 합쳐준다.
      path.normalize("c:// \\cdccccc \cccd ") // 정상결로로 조합해준다.
      path.relative("c:\\users\\zeor\\geonil", "c:\\"); 상대 경로를 쉽게 알 수 있다.
      path.join(__dirname, '..','..','\users','.'\geonil); // 경로를 함쳐 주는 역할 [상위 ,상위 ,user, user에서 ,geonil]로
      path.resolve(__dirname, '\user') 절대 경로로 친다. C:\\User 로 감
    </code>
  </pre>
8. url 모듈
  ->주소 관련되 모듈 입니다.
  -> https : // user : pass @ sub.host.come : 8080 / p/a/t/h ? query=string # haah
      [protocol | auth(로그인) | hostname | 포트 | path | query | hash]
      [ ㅡㅡㅡㅡㅡㅡㅡㅡㅡ origin ㅡㅡㅡㅡㅡㅡ :WHATWG 방식 ]
  <pre>
    <code>
    const url = require('url');
    const URL = url.URL;
    const newURL = new URL("https://www.naver.com:80/news?geonil=isHandSomeguy#info");
    const new = url.parse("https://www.naver.com:80/news?geonil=isHandSomeguy#info")
    //newURL : WAHTWG 방식 - 장점 ?뒤의 부분을 다룰 때 편리하다.
    newUrl.searchParams[.getAll / .get / .has / .keys / .values / .append(key, value) / .set(key, value) / .toString]
    //new 기존방식 - 장점 같은 도메인에서 요청을 할 때는 /hello?uq=10 이런 방식으로 처리할 때는 기존의 방식으로 처리를 해야 하기 때문에 둘 다 살아 남아있다.
    </code>
  </pre>
9. querystring module
  -> 예전의 방법을 사용하는 url parse방식에서 사용하면 편리하다.
  <pre>
    <code>
      const url = require('url');
      const querystring = require('querystring');
      const pasedUrl = url.parse("https://www.naver.com/naverpay?query=geonil");
      const query = querystring.parse(parsedUrl.query);
      query.stringify(query) // 하나로 합쳐준다.
    </code>
  </pre>
10. crypto 단방향 암호화(해시)
  -> 다양한 방식의 암호화를 할 때 도와 주는 모듈 입니다.
  <pre>
    <code>
      //1. 비밀번호 암호화 (비밀번호는 보통 복호화를 하지 않는 것을 기본을 합니다.)
      const crypto = require('crypto');
      //sha512로 알고리즘을 사용하여 비밀번호를 암호화 하고 base64 방식으로 출력해라
      crypto.createHash('sha512').update('비밀번호').digest('base64');
      //2. pbkdf2 암호화: 암호화 시간이 약 1초 걸리때까지 숫자를 올려 주면서 암호화를 시키는 것이 좋다.
      crypto.randoBytes(64, (err, buf)=>{
        const salt = buf.toString('base64');
        crypto.pbkdf2("비밀번호", salt, 1231234, 64, 'sha512', (err, key)=> {
          key.toString();
        })
      })
    </code>
  </pre>
11. 양방향 암호화를
  -> 복구화를 가능하게 하는 암호화 방법이
  <pre>
    <code>
      const crypto = require('crypto');
      const cipher = crypto.createCipher('aes-256-cbc',"열쇠");
      let result = cipher.update("비밀번호", 'utf8', 'base64');
      result += cipher.final('base64');
      console.log(result)
      //복구화
      const decipher = crypto.createDecipher('aes-256-cbc',"열쇠");
      let result2 = decipher.update(result, 'base64','utf8');
      result2+=decipher.final('utf8');
      console.log(result2);
    </code>
  </pre>
12. util 모(deprecate, promisify)
  -> deprecate : 지원이 조만간 중단될 메서드임을 알려줄 때 사용합니다.
  -> ** promisify 콜백을 promise 로 만들어 처리할 수 있다. ( 콜백을 리턴 처리 할 수 있게 만들어 준다.)
  <pre>
    <code>
      const util = require("util");
      const crypto = require("crypto");
      <br>
      const dontuseme = util.deprecate((x, y) => {
        console.log(x + y);
      }, '이 함수는 2019년 12월 까지만 사용가능합니다.')
      //중요한 부분 시작합니다.
      const randomBytesPromise = util.promisify(crypto.randomBytes);
      const pbkdf2Promise = util.promisify(ctyto.pbkdf2);
      randomBytesPromise(64)
      .then((buf)=>{
        const salt = buf.toString('base64');
        return pbkdf2Promise("비밀번호", salt, 1231234, 64, 'sha512')
      })
      .then(key => {
        key.toString();
      })
      .catch(error => console.error(error));
      //위 함수 부분을 async / Await 으로 변경 처리
      ( async () => {
        const buf = await randomBytesPromise(64);
        const salt = buf.toString('base64');
        const key = await pbkdf2Promise("비밀번호", salt, 1231234, 64, 'sha512')
        console.log('pass : ', key.toString('base64'));
      })
      //////////////////////////////////////////////////
      ////////////////////////////////////////////////
      const util = require('util');
      function fnc1(name , cb){
        if(name === "geonil"){cb(null,"gseonil")}
        else{cb(new Error("틀렸지롱"),"wrong")}
      }
      const fncPromis = util.promisify(fnc1);
      (async () => {
        const a = await fncPromis("geonil");
        console.log(a);
      })();
    </code>
  </pre>

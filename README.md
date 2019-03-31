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
    프로미스는 결과를 가지고 있지만 밖에 표현을 안해 줬다고 생각하면 편합니다!!
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

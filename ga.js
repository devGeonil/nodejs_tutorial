const EventEmitter = require('events');
const myEvent = new EventEmitter();

//addListener == on
myEvent.addListener('방문', ()=>{
  console.log('방문해주셔서 감사합니다.');
})
myEvent.on('종료', ()=>{
  console.log('byebye');
})
myEvent.on('종료', ()=>{
  console.log('see you never!!');
})
myEvent.once('특별이벤트', ()=>{
  console.log('한 번만 실행됩니다.');
}
//The way custom event sue
myEvent.emit('방문');
myEvent.emit('종료');
//The way custom events remove 

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

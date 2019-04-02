exports.fnc1 = function(name , cb){
  if(name === "geonil"){cb(null,"gseonil")}
  else{cb(new Error("틀렸지롱"),"wrong")}
}

// module.exports = {
//   fnc1
// }

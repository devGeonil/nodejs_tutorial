function fnc1(name , cb){
  if(name === "geonil"){
    cb(true, "geonil");
  }else{
    cb(false, "wrong");
  }
}

module.exports = {
  fnc1
}

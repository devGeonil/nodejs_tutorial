const url = require('url');
const URL = url.URL;
const newURL = new URL("https://www.naver.com:80/news?geonil=isHandSomeguy#info");
const new = url.parse("https://www.naver.com:80/news?geonil=isHandSomeguy#info")
console.log(newURL);
console.log(url.format(newURL));

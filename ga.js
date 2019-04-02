const util = require('util');
const {fnc1} = require('./gb');

const fncPromis = util.promisify(fnc1);

(async () => {
  const a = await fncPromis("geonil");
  console.log(a);
})();

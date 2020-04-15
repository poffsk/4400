const fs = require("fs");

const getInfo = function() {
  test = fs.readFileSync('usersession.json');
  console.log(test.toString());
  var obj = JSON.parse(test);
  if(obj.length > 0){
    return obj[0];
  }

}
exports.getInfo = getInfo;

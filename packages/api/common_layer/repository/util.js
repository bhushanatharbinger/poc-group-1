var fs = require("fs");
const FILE_NAME = "POC.txt";
const file = {};
file.fileWrite = async function(data){
    fs.writeFileSync(
      FILE_NAME,
      data);
}
    
file.fileRead = async function(){
    let data;
    try{
        data = fs.readFileSync(FILE_NAME);
    }catch(e){
        fs.writeFileSync(
            FILE_NAME,
            "{}");     
        data = fs.readFileSync(FILE_NAME);
    }

return data;
}

module.exports = file;
const { v4} = require('uuid');
const { fileWrite,fileRead } = require('../util');
const userRepository = {};
userRepository.save = async function(user){
    const data = await fileRead();
    let users = data.users;
    const id = v4();
    if(!users){
        users =[];
    }
   
    if(data){
        users.push({...user,id});
        data.users = users;
        fileWrite (data)
    }
 return {
     id
 };
}

userRepository.update = async function(user){
    const data = await fileRead();
    let users = data.users;
}
module.exports = userRepository;
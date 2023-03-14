import {
    CREATE_USER,
    RETRIEVE_USERS,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER
  } from "../actions/types";
  
  const initialState = [];
  
  const userReducer = (users = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_USER:
        return [...users, payload];
  
      case RETRIEVE_USERS:
        return payload;
      
      case RETRIEVE_USER:
        if(!users.length){
          let _newUser ={}
            _newUser.id = Number(payload?.basicInfo.id)
            _newUser.email = payload.basicInfo.email
            _newUser.firstName = payload.basicInfo.firstName
            _newUser.lastName = payload.basicInfo.lastName
            _newUser.basicInfo = payload.basicInfo
            _newUser.employementInfo = payload.employementInfo
            _newUser.academicInfo = payload.academicInfo
          return[_newUser]
        }
        return users.map((user) => {
          if (user.id === payload?.basicInfo.id) {
            return {
              ...user,
              ...payload.basicInfo,
              ...payload,
            };
          } else {
            return user;
          }
        });;
  
      case UPDATE_USER:
        
       
        return users.map((user) => {
          console.log('A',user)
          console.log('B',payload)
          if (Number(user.id) === Number(payload.id)) {
            let _newUser ={}
            _newUser.id = Number(payload.id)
            _newUser.email = payload.email
            _newUser.firstName = payload.firstName
            _newUser.lastName = payload.lastName
            _newUser.basicInfo = payload.basicInfo
            _newUser.employementInfo = payload.employementInfo
            _newUser.academicInfo = payload.academicInfo
            return _newUser
          } else {
            return user;
          }
        });
  
      case DELETE_USER:
        return users.filter(({ id }) => id !== payload.id);
  
      default:
        return users;
    }
  };
  
  export default userReducer;
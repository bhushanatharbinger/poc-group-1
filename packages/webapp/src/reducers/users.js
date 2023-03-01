import {
    CREATE_USER,
    RETRIEVE_USERS,
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
  
      case UPDATE_USER:
        return users.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_USER:
        return users.filter(({ id }) => id !== payload.id);
  
      default:
        return users;
    }
  };
  
  export default userReducer;
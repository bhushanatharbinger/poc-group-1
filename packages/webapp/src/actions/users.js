import {
    CREATE_USER,
    RETRIEVE_USERS,
    RETRIEVE_USER,
    UPDATE_USER,
    DELETE_USER,
  } from "./types";
  
  import UserDataService from "../services/userService";
  
  export const createUser = (data) => async (dispatch) => {
    try {
      const res = await UserDataService.create(data);
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllUsers = () => async (dispatch) => {
    try {
      const res = await UserDataService.getAll();
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data?.users,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const getUser = (id) => async (dispatch) => {
    try {
      const res = await UserDataService.get(id)
      dispatch({
        type: RETRIEVE_USER,
        payload: {basicInfo:res.data?.basicInfo,academicInfo:res.data?.academicInfo,employementInfo:res.data?.employementInfo},
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await UserDataService.update(id, data);
  
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await UserDataService.remove(id);
  
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
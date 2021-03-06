import axios from "axios";

import instance from "./server/index";
const urlServer = "https://server-galery.herokuapp.com/";

//CONSTS OF ACTIONS

//USERS
export const GET_USERS = "GET_USERS";
export const GET_USERS_FOR_ID = "GET_USERS_FOR_ID";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";

//IMAGES
export const GET_IMAGES = "GET_IMAGES";
export const GET_IMAGES_LOADED = "GET_IMAGES_LOADED";
export const CREATE_IMAGES = "CREATE_IMAGES";
export const IMAGES_SEARCH = "IMAGES_SEARCH";
export const DELETE_IMAGE = "DELETE_IMAGE";

//LOGIN
export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";

//CLEAR MSGS
export const CLEAR_MSG = "CLEAR_MSG";

//ACTIOS

export function signIn(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(urlServer + "login", payload);
      if (data.token) {
        localStorage.setItem("token", data.token);
        return dispatch({ type: SIGN_IN, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function logOut() {
  return async function (dispatch) {
    return dispatch({ type: LOG_OUT });
  };
}

export function createUser(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(urlServer + "user", payload);
      return dispatch({ type: CREATE_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function msgClear() {
  return async function (dispatch) {
    return dispatch({ type: CLEAR_MSG });
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      const { data } = await axios(urlServer + "user");
      return dispatch({ type: GET_USERS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserForId(id) {
  return async function (dispatch) {
    try {
      const { data } = await instance.get(urlServer + "user/" + id);
      console.log("action geruserid data", data);
      return dispatch({ type: GET_USERS_FOR_ID, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateUser(id, payload) {
  return async function (dispatch) {
    try {
      const { data } = await instance.put("user/" + id, payload);
      return dispatch({ type: UPDATE_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function createImage(payload) {
  return async function (dispatch) {
    try {
      const { data } = await instance.post("image", payload);
      return dispatch({ type: CREATE_IMAGES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getImages() {
  return async function (dispatch) {
    try {
      const { data } = await axios(urlServer + "image");
      return dispatch({ type: GET_IMAGES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteImage(idimage) {
  return async function (dispatch) {
    try {
      const { data } = await instance.delete("image/" + idimage);
      console.log("delete image action", data);
      return dispatch({ type: DELETE_IMAGE, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function imagesSearch(nameImage) {
  return async function (dispatch) {
    try {
      const { data } = await axios(urlServer + "image");
      return dispatch({ type: IMAGES_SEARCH, payload: { nameImage, data } });
    } catch (err) {
      console.log(err);
    }
  };
}

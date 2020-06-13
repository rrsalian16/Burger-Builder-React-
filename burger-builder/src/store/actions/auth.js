import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  console.log(authData);
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error,
  };
};

export const logout=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut=(expirationTime)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH6pnWTwTxahki3t0nHcE_PIxYXw6F89U";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH6pnWTwTxahki3t0nHcE_PIxYXw6F89U";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate=new Date(new Date().getTime()+ response.data.expiresIn*1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('expirationDate',expirationDate);
        localStorage.setItem('email',response.data.email);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailure(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath=(path)=>{
  return{
    type:actionTypes.SET_AUTH_REDIRECT_PATH,
    path:path
  }
}

export const authCheckState=()=>{
  return dispatch=>{
    const token=localStorage.getItem("token");
    if(!token){
      dispatch(logout());
    }
    else{
      const expireDate =new Date(localStorage.getItem("expirationDate"));
      const email=localStorage.getItem('email');
      const userId=localStorage.getItem('userId');
      if(expireDate<=new Date()){
        dispatch(logout());
      }else{
        dispatch(authSuccess({idToken:token,email:email,localId:userId}));
        dispatch(checkAuthTimeOut((expireDate.getTime()-new Date().getTime())/1000))
      }
    }
  }
}
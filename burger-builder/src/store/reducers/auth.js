import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    token:null,
    refreshToken:null,
    email:null,
    userId:null,
    error:null,
    loading:false,
    autRedirectPath:'/'
}

const authReducer=(state=initialState, action)=>{

    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state,{error:null,loading:true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.authData.idToken,
                refreshToken: action.authData.refreshToken,
                email: action.authData.email,
                userId: action.authData.localId,
                error:null,
                loading: false
            });
        case actionTypes.AUTH_FAILURE:
            return updateObject(state, {
                error: action.error,
                loading: false
            })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state,initialState)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state,{autRedirectPath:action.path})
        default:
            return state;
    }

}

export default authReducer;
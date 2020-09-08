import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { IUserData, IUserRequest } from "../../Lib/Interfaces";
import { UserRole } from "../../Containers/SignupScreen/SignupScreen";

const actions = {
    signup: createAction("SIGNUP_REQUEST", (username: string, email: string, pwd: string,
        userRole: UserRole, pob: string, dob: string, country: string, interests: string, topAlbums: string) => ({
        type: "SIGNUP_REQUEST", payload: { username, email, pwd, userRole, dob, pob, country, interests, topAlbums }
    })),
    loginRequest: createAction("LOGIN_REQUEST", (email: string | undefined, pwd: string | undefined, socialType: string, socialId?: string, userData? : IUserData) => ({
        type: "LOGIN_REQUEST", payload: { email, pwd, socialType, socialId, userData }
    })),
    loginSuccess: createAction("LOGIN_SUCCESS", (params: IUserData) => ({
        type: "LOGIN_SUCCESS", payload: params
    })),
    loginFailure: createAction("LOGIN_FAILURE", () => ({
        type: "LOGIN_FAILURE"
    })),
    checkIsLogin: createAction("CHECK_LOGIN"),

    setIsLogin: createAction("SET_LOGIN", (params: boolean) => ({
        type: "SET_LOGIN", payload: params
    })),
    logout: createAction("USER_LOGOUT"),
    
    socialLogout: createAction("SOCIAL_LOGOUT"),

    checkUserRole: createAction("CHECK_USER_ROLE", (callback: () => void) => ({
        type: "CHECK_USER_ROLE", payload: callback,
    })),

    setUserRole: createAction("SET_USER_ROLE", (userRole: UserRole,) => ({
        type: "SET_USER_ROLE", payload: userRole,
    })),

    forgotPassword: createAction("FORGOT_PASSWORD", (email: string) => ({
        type:"FORGOT_PASSWORD", payload: email,
    }))
}

export const LoginActions = actions;

export interface LoginState {
    userData: IUserData | undefined,
    isLogin: boolean,
    userRole: UserRole | undefined,
    fetching: boolean,

}
export type LoginAction = PayloadAction<string, LoginState>;

export type ImmutableLoginState = SI.ImmutableObject<LoginState>;

export const INITIAL_STATE: ImmutableLoginState = SI.from({
    userData: undefined,
    isLogin: false,
    userRole: undefined,
    fetching: false,
})

export const loginSuccess: Reducer<ImmutableLoginState> = (state, action) =>
    state.merge({ userData: action.payload, isLogin: true, fetching: false});

export const loginFailure: Reducer<ImmutableLoginState> = (state) => state.merge({
    userData: undefined, isLogin: false, fetching: false,
});

export const setIsLogin: Reducer<ImmutableLoginState> = (state, action) => state.merge({
    isLogin: action.payload, fetching: false,
});

export const signup: Reducer<ImmutableLoginState> = (state, action) => state.merge({
    fetching: true,
});

export const loginRequest: Reducer<ImmutableLoginState> = (state, action) => state.merge({
    fetching: true,
});


export const logout: Reducer<ImmutableLoginState> = (state, action) => state.merge({
    fetching: true,
});





const reducerMap: ReducerMap<typeof actions, ImmutableLoginState> = {
    loginSuccess,
    loginFailure,
    setIsLogin,
    loginRequest,
    logout,
    signup,
}

export const LoginReducer = mapReducers(INITIAL_STATE, reducerMap, actions);

export default LoginReducer;

import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { ReducerMap, mapReducers } from "../../Lib/ReduxHelpers";
import { IUserData } from "../../Lib/Interfaces";

const actions = {
    getProfileRequest: createAction("GET_PROFILE_REQUEST", (() => ({
        type: "GET_PROFILE_REQUEST"
    }))),
    getProfileSuccess: createAction("GET_PROFILE_SUCCESS", ((params: IUserData) => ({
        type: "GET_PROFILE_SUCCESS", payload: params,
    }))),
    getProfileFailure: createAction("GET_PROFILE_FAILURE", (() => ({
        type: "GET_PROFILE_FAILURE",
    }))),
    updateProfileRequest: createAction("UPDATE_PROFILE_REQUEST", ((params: IUserData) => ({
        type: "UPDATE_PROFILE_REQUEST", payload: params,
    }))),
    updateProfileSuccess: createAction("UPDATE_PROFILE_SUCCESS", ((params: IUserData) => ({
        type: "UPDATE_PROFILE_SUCCESS", payload: params,
    }))),
    updateProfileFailure: createAction("UPDATE_PROFILE_FAILURE", (() => ({
        type: "UPDATE_PROFILE_FAILURE",
    }))),
    
};

export const ProfileAction = actions;

export interface ProfileState {
    profileData: IUserData | undefined;
    fetching: boolean;
}

export type ProfileActions = PayloadAction<string, any>;

export type ImmutableProfileState = SI.ImmutableObject<ProfileState>;

export const INITIAL_STATE: ImmutableProfileState = SI.from({
    profileData: undefined,
    fetching: false,
});

export const getProfileSuccess: Reducer<ImmutableProfileState> = (state, action) => state.merge({
    profileData: action.payload, fetching: false
})
export const updateProfileSuccess: Reducer<ImmutableProfileState> = (state, action) => state.merge({
    profileData: action.payload, fetching: false,
})
export const getProfileRequest: Reducer<ImmutableProfileState> = (state, action) => state.merge({
    fetching: true,
})

export const updateProfileRequest: Reducer<ImmutableProfileState> = (state) => state.merge({
    fetching: true,
})

export const updateProfileFailure: Reducer<ImmutableProfileState> = (state) => state.merge({
    fetching: false,
})

export const getProfileFailure: Reducer<ImmutableProfileState> = (state) => state.merge({
    fetching: false,
})
const reducerMap: ReducerMap<typeof actions, ImmutableProfileState> = {
    getProfileSuccess,
    updateProfileSuccess,
    getProfileRequest,
    updateProfileRequest,
    getProfileFailure,
    updateProfileFailure,
};

export const ProfileReducers = mapReducers(INITIAL_STATE, reducerMap, actions);

export default ProfileReducers;
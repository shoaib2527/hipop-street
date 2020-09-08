import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { ReducerMap, mapReducers } from "../../Lib/ReduxHelpers";
import { IUserData } from "../../Lib/Interfaces";

const actions = {
    getArtistProfileRequest: createAction("GET_ARTIST_REQUEST", ((userId) => ({
        type: "GET_ARTIST_REQUEST", payload:{userId}
    }))),
    getArtistProfileSuccess: createAction("GET_ARTIST_SUCCESS", ((params: any) => ({
        type: "GET_ARTIST_SUCCESS", payload: params,
    }))),
    getArtistProfileFailure: createAction("GET_ARTIST_FAILURE", (() => ({
        type: "GET_ARTIST_FAILURE",
    }))),
};

export const ArtistProfileAction = actions;

export interface ArtistProfileState {
    artistData: any;
    fetching: boolean;
}

export type ArtistProfileActions = PayloadAction<string, any>;

export type ImmutableArtistProfileState = SI.ImmutableObject<ArtistProfileState>;

export const INITIAL_STATE: ImmutableArtistProfileState = SI.from({
    artistData: undefined,
    fetching: false,
});

export const getArtistProfileSuccess: Reducer<ImmutableArtistProfileState> = (state, action) => state.merge({
     fetching: false, artistData: action.payload
})
export const getArtistProfileRequest: Reducer<ImmutableArtistProfileState> = (state, action) => state.merge({
    fetching: true,
})

export const getArtistProfileFailure: Reducer<ImmutableArtistProfileState> = (state) => state.merge({
    fetching: false,
})
const reducerMap: ReducerMap<typeof actions, ImmutableArtistProfileState> = {
    getArtistProfileFailure,
    getArtistProfileRequest,
    getArtistProfileSuccess,
};

export const ArtistProfileReducers = mapReducers(INITIAL_STATE, reducerMap, actions);

export default ArtistProfileReducers;
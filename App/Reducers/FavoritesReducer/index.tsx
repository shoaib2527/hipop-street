import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { ReducerMap, mapReducers } from "../../Lib/ReduxHelpers";

export interface IFavoriteResponse {
    songId: string,
    songName: string,
    songCategory: string,
    // "song_image": "825932c0c8999d4f94d36bf0288f20b1.jpg",
    songFile: string,
    userId: string,
    status: string,
    addDate: string,
    likeCount: string,
    songType: string,
    catId: string,
    songImage: string;
}
const actions = {
    getFavoriteRequest: createAction("GET_FAVORITE_REQUEST", ((setPlaylist: boolean) => ({
        type: "GET_FAVORITE_REQUEST", payload: setPlaylist
    }))),
    getFavoriteSuccess: createAction("GET_FAVORITE_SUCCESS", ((params: IFavoriteResponse) => ({
        type: "GET_FAVORITE_SUCCESS", payload: params,
    }))),
    loadingRequest: createAction("LOADING_REQUEST", (() => ({
        type: "LOADING_REQUEST",payload:true
    }))),
    getFavoriteFailure: createAction("GET_FAVORITE_FAILURE", (() => ({
        type: "GET_FAVORITE_FAILURE",
    }))),
    makeFavoriteRequest: createAction("MAKE_FAVORITE_REQUEST", ((songId: string) => ({
        type: "MAKE_FAVORITE_REQUEST", payload: songId
    }))),
    makeFavoriteSuccess: createAction("MAKE_FAVORITE_SUCCESS", (() => ({
        type: "MAKE_FAVORITE_SUCCESS",
    }))),
    makeFavoriteFailure: createAction("MAKE_FAVORITE_FAILURE", (() => ({
        type: "MAKE_FAVORITE_FAILURE",
    }))),
};

export const FavoriteAction = actions;

export interface FavoriteState {
    favoritesData: Array<IFavoriteResponse> | undefined;
    fetching: boolean;
}

export type FavoriteActions = PayloadAction<string, any>;

export type ImmutableFavoriteState = SI.ImmutableObject<FavoriteState>;

export const INITIAL_STATE: ImmutableFavoriteState = SI.from({
    favoritesData: undefined,
    fetching: false,
});

export const getFavoriteRequest: Reducer<ImmutableFavoriteState> = (state, action) => state.merge({
    fetching: action.payload,
})
export const loadingRequest: Reducer<ImmutableFavoriteState> = (state, action) => state.merge({
    fetching: true,
})

export const makeFavoriteRequest: Reducer<ImmutableFavoriteState> = (state, action) => state.merge({
    fetching: false,
})

export const makeFavoriteSuccess: Reducer<ImmutableFavoriteState> = (state, action) => state.merge({
    fetching: false
})

export const getFavoriteSuccess: Reducer<ImmutableFavoriteState> = (state, action) => state.merge({
    favoritesData: action.payload, fetching: false,
});

export const getFavoriteFailure: Reducer<ImmutableFavoriteState> = (state) => state.merge({
    fetching: false,
})

export const makeFavoriteFailure: Reducer<ImmutableFavoriteState> = (state) => state.merge({
    fetching: false,
})
// export const makeFavoriteSuccess: Reducer<ImmutableFavoriteState> = (state, action) => state.merge({

// })

const reducerMap: ReducerMap<typeof actions, ImmutableFavoriteState> = {
    getFavoriteSuccess,
    getFavoriteRequest,
    makeFavoriteRequest,
    makeFavoriteSuccess,
    getFavoriteFailure,
    makeFavoriteFailure,
    loadingRequest,
};

export const FavoriteReducers = mapReducers(INITIAL_STATE, reducerMap, actions);

export default FavoriteReducers;
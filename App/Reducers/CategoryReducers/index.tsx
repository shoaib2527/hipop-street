import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { ReducerMap, mapReducers } from "../../Lib/ReduxHelpers";

export interface ICategoryResponse {
    catId: string;
    catName: string;
}
const actions = {
    getCategoryRequest: createAction("CATEGORY_REQUEST", (() => ({
        type: "CATEGORY_REQUEST"
    }))),
    getCategorySuccess: createAction("CATEGORY_SUCCESS", ((params: ICategoryResponse) => ({
        type: "CATEGORY_SUCCESS", payload: params,
    }))),
    getCategoryFailure: createAction("CATEGORY_FAILURE", (() => ({
        type: "CATEGORY_FAILURE",
    }))),
    getSongByCatRequest: createAction("SONG_BY_CAT_REQUEST", ((catName: string) => ({
        type: "SONG_BY_CAT_REQUEST", payload: catName,
    }))),
    getSongByCatSuccess: createAction("SONG_BY_CAT_SUCCESS", ((params: any) => ({
        type: "SONG_BY_CAT_SUCCESS", payload: params
    }))),
    getSongByCatFailure: createAction("SONG_BY_CAT_FAILURE", (() => ({
        type: "SONG_BY_CAT_FAILURE"
    }))),
    getHomeDataReq: createAction("GET_HOME_DATA_REQ", (() => ({
        type: "GET_HOME_DATA_REQ",
    }))),
    getHomeDataSuccess: createAction("GET_HOME_DATA_SUCCESS", ((params: any) => ({
        type: "GET_HOME_DATA_SUCCESS", payload: params,
    }))),
    getHomeDataFailure: createAction("GET_HOME_DATA_FAILURE", (() => ({
        type: "GET_HOME_DATA_FAILURE",
    }))),
};

export const CategoryAction = actions;

export interface CategoryState {
    categoriesData: Array<ICategoryResponse> | undefined;
    songByCategory: any | undefined;
    homeData: any | undefined;
    fetching: boolean;
}

export type CategoryActions = PayloadAction<string, any>;

export type ImmutableCategoryState = SI.ImmutableObject<CategoryState>;

export const INITIAL_STATE: ImmutableCategoryState = SI.from({
    categoriesData: undefined,
    songByCategory: undefined,
    homeData: undefined,
    fetching: false,
});

export const getCategoryRequest: Reducer<ImmutableCategoryState> = (state, action) => state.merge({
    fetching: true
})

export const getSongByCatRequest: Reducer<ImmutableCategoryState> = (state, action) => state.merge({
    fetching: true
})
export const getHomeDataReq: Reducer<ImmutableCategoryState> = (state, action) => state.merge({
    fetching: true
})
export const getCategorySuccess: Reducer<ImmutableCategoryState> = (state, action) => state.merge({
    categoriesData: action.payload, fetching: false
})

export const getSongByCatSuccess: Reducer<ImmutableCategoryState> = (state, action) => state.merge({
    songByCategory: action.payload, fetching: false,
})

export const getHomeDataSuccess: Reducer<ImmutableCategoryState> = (state, action) => state.merge({
    homeData: action.payload, fetching: false,
})

export const getCategoryFailure: Reducer<ImmutableCategoryState> = (state) => state.merge({
    fetching: false,
})

export const getHomeDataFailure: Reducer<ImmutableCategoryState> = (state) => state.merge({
    fetching: false,
})

export const getSongByCatFailure: Reducer<ImmutableCategoryState> = (state) => state.merge({
    fetching: false,
})


const reducerMap: ReducerMap<typeof actions, ImmutableCategoryState> = {
    getCategorySuccess,
    getSongByCatSuccess,
    getHomeDataSuccess,
    getCategoryRequest,
    getSongByCatRequest,
    getHomeDataReq,
    getHomeDataFailure,
    getCategoryFailure,
    getSongByCatFailure,

};

export const CategoryReducers = mapReducers(INITIAL_STATE, reducerMap, actions);

export default CategoryReducers;
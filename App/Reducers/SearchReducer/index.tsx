import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { ReducerMap, mapReducers } from "../../Lib/ReduxHelpers";
import { IUserData } from "../../Lib/Interfaces";

const actions = {
    searchRequest: createAction("SEARCH_REQUEST", ((keyword: string) => ({
        type: "SEARCH_REQUEST", payload: keyword
    }))),
    searchSuccess: createAction("SEARCH_SUCCESS", ((params: any) => ({
        type: "SEARCH_SUCCESS", payload: params,
    }))),
    searchFailure: createAction("SEARCH_FAILURE", (() => ({
        type: "SEARCH_FAILURE",
    }))),
    
};

export const SearchAction = actions;

export interface SearchState {
    searchData: any;
    fetching: boolean;
}

export type ProfileActions = PayloadAction<string, any>;

export type ImmutableSearchState = SI.ImmutableObject<SearchState>;

export const INITIAL_STATE: ImmutableSearchState = SI.from({
    searchData: undefined,
    fetching: false,
});

export const searchRequest: Reducer<ImmutableSearchState> = (state, action) => state.merge({
     fetching: true
})

export const searchSuccess: Reducer<ImmutableSearchState> = (state, action) => state.merge({
    searchData: action.payload, fetching: false
})
export const searchFailure: Reducer<ImmutableSearchState> = (state, action) => state.merge({
    searchData: action.payload, fetching: false,
})

const reducerMap: ReducerMap<typeof actions, ImmutableSearchState> = {
    searchFailure,
    searchSuccess,
    searchRequest,
};

export const SearchReducers = mapReducers(INITIAL_STATE, reducerMap, actions);

export default SearchReducers;
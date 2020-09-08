import { Action, AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { createAction, PayloadAction } from "typesafe-actions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { BottomBarBtns } from "../../Types/BottomBar";

/* ------------- Types and Action Creators ------------- */
// interface RequestParams {username: string; }
// interface SuccessParams {avatar: string; }
const actions = {
//   userRequest: createAction("githubUserRequest", (params: RequestParams) =>
//     ({type: "githubUserRequest", payload: params})),
//   userSuccess: createAction("githubUserSuccess", (params: SuccessParams) =>
//     ({type: "githubUserSuccess", payload: params})),
//   userFailure: createAction("githubUserFailure"),
    setSelectedTab: createAction("SET_SELECTED_TAB", ((params: BottomBarBtns) => ({
        type: "SET_SELECTED_TAB", payload: params
    }))),
};

export const BottomBarActions = actions;

export interface BottomBarState {
    selectedTab: BottomBarBtns;
}

export type BottomBarAction = PayloadAction<string, BottomBarBtns >;

export type ImmutableBottomBarState = SI.ImmutableObject<BottomBarState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableBottomBarState = SI.from({
  selectedTab: BottomBarBtns.EXPLORE,
});

/* ------------- Reducers ------------- */

// // request the avatar for a user
// export const userRequest: Reducer<ImmutableGithubState> =
//   (state: ImmutableGithubState, { payload }: AnyAction & {payload?: RequestParams}) =>
//     payload ? state.merge({ fetching: true, username: payload.username, avatar: null }) : state;

export const setSelectedTab: Reducer<ImmutableBottomBarState> = (state, action) => 
    state.merge({selectedTab: action.payload})

// // successful avatar lookup
// export const userSuccess: Reducer<ImmutableGithubState> =
//   (state: ImmutableGithubState, { payload }: AnyAction & {payload?: SuccessParams}) =>
//   payload ? state.merge({ fetching: false, error: null, avatar: payload.avatar }) : state;

// // failed to get the avatar
// export const userFailure: Reducer<ImmutableGithubState> = (state: ImmutableGithubState) =>
//   state.merge({ fetching: false, error: true, avatar: null });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, ImmutableBottomBarState> = {
  setSelectedTab,
};

export const BottomBarReducer = mapReducers(INITIAL_STATE, reducerMap, actions);

export default BottomBarReducer;

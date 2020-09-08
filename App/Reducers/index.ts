/// <reference types="@types/webpack-env" />
import { combineReducers } from "redux";
import root from "../Epics/index";
import Api from "../Services/Api";
import { BottomBarReducer, BottomBarState } from "./BottomBarReducer";
import CategoryReducers, { CategoryState } from "./CategoryReducers";
import configureStore from "./CreateStore";
import FavoriteReducers, { FavoriteState } from "./FavoritesReducer";
import LoginReducer, { LoginState } from "./LoginReducers";
import MySongReducers, { MySongState } from "./MySongsReducer";
import ProfileReducers, { ProfileState } from "./ProfileReducers";
import SongsReducer, { SongsState } from "./SongsReducer";
import ArtistProfileReducers, { ArtistProfileState } from "./ArtistProfileReducer";
import SearchReducers, { SearchState } from "./SearchReducer";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  bottomBar: BottomBarReducer,
  songs: SongsReducer,
  login: LoginReducer,
  category: CategoryReducers,
  favorites: FavoriteReducers,
  mySongs: MySongReducers,
  profile: ProfileReducers,
  artist: ArtistProfileReducers,
  search: SearchReducers,
});

export interface RootState {
  bottomBar: BottomBarState;
  songs: SongsState,
  login: LoginState,
  category: CategoryState,
  favorites: FavoriteState,
  mySongs: MySongState,
  profile: ProfileState,
  artist: ArtistProfileState,
  search: SearchState,
}
const api: any = Api.create;
const db: any = "";
export default () => {
  // tslint:disable-next-line:prefer-const
  let { store } = configureStore(reducers, root, {api, db});

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

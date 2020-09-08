import { combineEpics } from "redux-observable";
import { setNextSongEpic, setPrevSongEpic, selectSongEpic } from "./SongsEpics";
import { checkIfLoginEpic, loginRequestEpic, signupRequestEpic, logoutEpic, checkUserRoleEpic, forgotPasswordEpic } from "./LoginEpics";
import { getCategoriesEpic, getSongByCategoryEpic, getHomeDataEpic } from "./CategoryEpics";
import { getFavoritesEpic, makeFavoritesEpic } from "./FavoritesEpics";
import { getMySongsEpic, uploadMySongEpic } from "./MySongsEpics";
import { getProfileEpic, updateProfileEpic, getArtistProfile } from "./ProfileEpics";
import { searchEpic } from "./SearchEpics";

export default combineEpics(
    setNextSongEpic,
    setPrevSongEpic,
    // selectSongEpic,
    checkIfLoginEpic,
    loginRequestEpic,
    signupRequestEpic,
    getCategoriesEpic,
    getFavoritesEpic,
    getSongByCategoryEpic,
    makeFavoritesEpic,
    getMySongsEpic,
    uploadMySongEpic,
    getProfileEpic,
    updateProfileEpic,
    logoutEpic,
    getHomeDataEpic,
    getArtistProfile,
    searchEpic,
    forgotPasswordEpic,
    // checkUserRoleEpic,
);
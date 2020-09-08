import { create as apicreate } from "apisauce";
import { HipHopApi } from "./Api";
import { IUserData, IUserRequest, ISongUpload } from "../Lib/Interfaces";
import { from } from "rxjs";
import { deviceId } from "../Lib/ApiData";
import { Platform } from "react-native";
import { UserRole } from "../Containers/SignupScreen/SignupScreen";


export default (baseURL = `http://app.hiphopstreets.com/mobileServices`): HipHopApi => {

  const api = apicreate({
    baseURL,
    headers: {
      "Cache-Control": "public, max-age=31536000",
      // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Content-Type": "application/json",
    },
    //   20 second timeout...
    timeout: 20000,
  });
  const signup = (username: string, email: string, pwd: string, userRole: UserRole, pob: string, dob: string, country: string,
    interests? :string, topAlbums? :string) => {
    let data = new FormData();
    data.append("email_id", email);
    data.append("password", pwd);
    data.append("name", username);
    data.append("user_cat", userRole);
    data.append("pob", pob);
    data.append("dob", dob);
    data.append("country", country);
    interests && data.append("interests", interests);
    topAlbums && data.append("top_albums", topAlbums)
    return from(api.post(`/signup`, data));
  };
  const login = (email: string, pwd: string, socialType: string, socialId: string) => {
    api.setHeader("Accept", "application/json");
    let data = new FormData();
    data.append("socialtype", socialType);
    data.append("device_id", deviceId);
    data.append("devicetype", Platform.OS);
    data.append("email_id", email);
    data.append("password", pwd);
    data.append("social_id", socialId);
    return from(api.post(`/login`, data));
  }
  const getSongByCat = (category: string) => from(api.get(`getsongbycat?song_category=${category}`));

  const getCategories = () => from(api.get(`/getsongcats`));

  const makeFavorite = (songId: string, token: string) => {
    api.setHeader("accesstoken", token)
    let data = new FormData();
    data.append("song_id", songId);
    return from(api.post(`/makeFavourite`, data));
  };
  const getFavoriteSongs = (token: string) => {
    api.setHeader("accesstoken", token)
    return from(api.get(`/getFavouriteSongs`))
  };
  const getMySongs = (token: string) => {
    api.setHeader("accesstoken", token);
    return from(api.get(`/getmySongs`))
  };
  const getProfile = (token: string) => {
    api.setHeader("accesstoken", token);
    return from(api.get(`/getProfile`))
  };
  const uploadSong = (token: string, params: ISongUpload) => {
    const data = new FormData();
    data.append("song_name", params.songName);
    data.append("song_category", params.songCategory);
    data.append("song_image", params.songImage);
    data.append("userfile", params.songFile);
    // data.append("status", params.status);
    data.append("status", "0");
    data.append("song_type", "mp3");
    api.setHeader("accesstoken", token);
    return from(api.post(`/uploadSong`, data))
  };
  const updateProfile = (token: string, params: IUserData) => {
    api.setHeader("accesstoken", token);
    const data = new FormData();
    data.append("name", params.userName);
    data.append("email_id", params.emailId);
    data.append("sex", "undefined");
    data.append("biography", params.biography);
    data.append("image", params.image);
    return from(api.post(`/updateProfile`, data));
  };

  const homeData = () => from(api.get(`homeData`));

  const logout = (token: string) => {
    api.setHeader("accesstoken", token);
    api.deleteHeader("accesstoken");
    return from(api.delete(`/logout`));
  }

  const getArtistProfile = (userId: string) => {
    return from(api.get(`/getArtistProfile?userid=${userId}`))
  }

  const search =  (keyword: string) => {
    return from(api.get(`/search?keyword=${keyword}`))
  }

  const forgotPassword = (email: string) => {
    const data = new FormData();
    data.append("email", email);
    return from (api.post(`/forgotPassword`, data));
  }




  return {
    signup,
    login,
    getSongByCat,
    getCategories,
    makeFavorite,
    getFavoriteSongs,
    getMySongs,
    getProfile,
    uploadSong,
    updateProfile,
    homeData,
    logout,
    getArtistProfile,
    search,
    forgotPassword,
  }
};
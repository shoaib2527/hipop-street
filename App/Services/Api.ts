// This is for the devscreens
import { createAPI } from "./GithubApi";
import { Observable } from "rxjs";
import { ApiResponse } from "apisauce";
import createHipHopApi from "./HipHopApis";
import { IUserData, IUserRequest, ISongUpload } from "../Lib/Interfaces";
import { UserRole } from "../Containers/SignupScreen/SignupScreen";

export default {
    create: {
        hiphop: createHipHopApi(),
    }
};

export interface Api {
    hiphop: HipHopApi,
};

export interface HipHopApi {
    signup: (username: string, email: string, pwd: string, userRole: UserRole,
        pob: string, dob: string, country: string, interests?: string, topAlbums?: string
    ) => Observable<ApiResponse<IUserData>>;
    login: (email: string, pwd: string, socialType: string, socialId: string, device_id: string) => Observable<ApiResponse<IUserData>>;
    getSongByCat: (category: string) => Observable<ApiResponse<any>>;
    getCategories: () => Observable<ApiResponse<any>>;
    makeFavorite: (songId: string, token: string) => Observable<ApiResponse<any>>;
    getFavoriteSongs: (token: string) => Observable<ApiResponse<any>>;
    getMySongs: (token: string) => Observable<ApiResponse<any>>;
    getProfile: (token: string) => Observable<ApiResponse<any>>;
    uploadSong: (token: string, params: ISongUpload) => Observable<ApiResponse<any>>;
    updateProfile: (token: string, params: IUserData) => Observable<ApiResponse<any>>;
    homeData: () => Observable<ApiResponse<any>>;
    logout: (token: string) => Observable<ApiResponse<any>>;
    getArtistProfile: (userId: string) => Observable<ApiResponse<any>>;
    search: (keyword: string) => Observable<ApiResponse<any>>;
    forgotPassword: (email: string) => Observable<ApiResponse<any>>;
}

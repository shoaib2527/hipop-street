import { UserRole } from "../Containers/SignupScreen/SignupScreen";

export interface IUserData{
    userId: string;
    userName: string;
    emailId: string;
    accessToken: string;
    gender?: string;
    biography?: string;
    image?:string;
    user_cat? :UserRole;
}
export interface IUserRequest{
    socialType: string;
    deviecId: string;
    deviceType: string;
    // userName: string;
    emailId: string;
    password: string;
}
export interface ISongUpload {
    songName: string;
    songCategory: string;
    songImage: string;
    songFile: string;
    status: string;
    songType: string;
}
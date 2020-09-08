import { Songs } from "./PlaylistTypes";
import RNTrackPlayer from "react-native-track-player";
import { UserRole } from "../Containers/SignupScreen/SignupScreen";

export const transformSongArray = (songArray: Array<Songs>, userRole?: UserRole) => {
    if (songArray) {
        let newArray = songArray.map((item, index, array) => {
            // dont show unapproved song to normal users
            if (userRole) {
                if (userRole === UserRole.NORMAL && item.status === "0") {
                    return null
                } else {
                    // console.log("Artist =========>>>>>>>>>   ",item.artistName )
                    return {
                        id: item.songid ? item.songid : "0",
                        url: item.song_file,
                        title: item.song_name,
                        artist: item.artistName ? item.artistName : 'UNKNOWN',
                        artwork: item.songimage,
                        userId: item.userid
                    };
                }
            }
            else {
                return {
                    id: item.songid ? item.songid : "0",
                    url: item.song_file,
                    title: item.song_name,
                    artist: item.artistName ? item.artistName : 'UNKNOWN',
                    artwork: item.songimage,
                    userId: item.userid
                };
            }
        });
        const filterdArray = newArray.filter((item) => {
            return item !== null
        });
        return filterdArray;

    }
}

export const transformSongObject = (songObject: any) => {
    return {
        songid: songObject.id,
        song_name: songObject.title,
        song_category: "",
        songimage: songObject.artwork,
        song_file: songObject.url,
        song_type: "mp3",
        artistName: songObject.artist,
        userId: songObject.userId
    }
}

export const getPlayerState = async () => {
    const b = await RNTrackPlayer.getState();
    return b === 3 ? true : false;
}
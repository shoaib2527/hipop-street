export enum PlaylistTypes{
    EXPLORE= "Explore",
    PLAYLIST = "Playlist",
    MYSONGS = "My Songs",
}

export interface Playlist {
    name: string;
    image?: string;
    songs: Songs[];
}
export interface Songs{
    songid: string;
    song_name: string;
    song_category: string;
    songimage: string;
    song_file: string;
    song_type?: string;
    artistName?:string;
}
import { createAction, PayloadAction } from "typesafe-actions";
import * as SI from "seamless-immutable";
import { Reducer } from "redux";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { Playlist, Songs } from "../../Lib/PlaylistTypes";
import { Images } from "../../Themes";

const actions = {
    setIsPlaying: createAction("SET_IS_PLAYING", (isPlaying: boolean) => (
        { type: "SET_IS_PLAYING", payload: isPlaying }
    )),
    showPlaying: createAction("SHOW_PLAYING", (showPlay: boolean) => ({
        type: "SHOW_PLAYING", payload: showPlay,
    })),
    showPlayer: createAction("SHOW_PLAYER", (showPlayer: boolean) => ({
        type: "SHOW_PLAYER", payload: showPlayer,
    })),
    setPlaylist: createAction("SET_PLAYLIST", (playlist: Playlist) => ({
        type: "SET_PLAYLIST", payload: playlist
    })),
    setSong: createAction("SET_SONG", (song: Songs) => ({
        type: "SET_SONG", payload: song,
    })),
    setNextSong: createAction("SET_NEXT_SONG", (isSong: boolean) => ({
        type: "SET_NEXT_SONG", payload: isSong,
    })),
    setPreviousSong: createAction("SET_PREV_SONG", (isSong: boolean) => ({
        type: "SET_PREV_SONG", payload: isSong,
    })),
    void: createAction("VOID_ACTION"),
}

export const SongsActions = actions;

export interface SongsState {
    isPlaying: boolean;
    playlist: Playlist | undefined;
    song: Songs | undefined;
    showPlay: boolean;
    showPlayer: boolean;
}
export type SongsAction = PayloadAction<string, SongsState>;

export type ImmutableSongsState = SI.ImmutableObject<SongsState>;

export const INITIAL_STATE: ImmutableSongsState = SI.from({
    isPlaying: false,
    playlist: undefined,
    song: {
        songid: "",
        song_name: "",
        song_category: "",
        song_file: undefined,
    },
    showPlay: false,
    showPlayer: false
})

export const setIsPlaying: Reducer<ImmutableSongsState> = (state, action) =>
    state.merge({ isPlaying: action.payload, showPlayer: true });

export const setPlaylist: Reducer<ImmutableSongsState> = (state, action) => state.merge({
    playlist: action.payload,
})
export const setSong: Reducer<ImmutableSongsState> = (state, action) => state.merge({
    song: action.payload,
})
export const showPlaying: Reducer<ImmutableSongsState> = (state, action) => state.merge({
    showPlay: action.payload, showPlayer: true
})
export const showPlayer: Reducer<ImmutableSongsState> = (state, action) => state.merge({
    showPlayer: false
})
const reducerMap: ReducerMap<typeof actions, ImmutableSongsState> = {
    setIsPlaying,
    setPlaylist,
    setSong,
    showPlaying,
    showPlayer,
}

export const SongsReducer = mapReducers(INITIAL_STATE, reducerMap, actions);

export default SongsReducer;

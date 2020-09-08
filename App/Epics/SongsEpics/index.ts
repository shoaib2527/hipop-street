import { Epic, ofType } from "redux-observable";
import { getType } from "typesafe-actions";
import { SongsActions } from "../../Reducers/SongsReducer";
import { mergeMap } from "rxjs/operators";
import { findCurrentSongIndex } from "../../Lib/MusicPlayerHelpers";
import { of } from "rxjs";

export const setNextSongEpic: Epic = (action$, state$) => action$.pipe(
    ofType(getType(SongsActions.setNextSong)),
    mergeMap((action) => {
        const currentPlaylist = state$.value.songs.playlist;
        const currentSong = state$.value.songs.song;
        // console.log(currentSong, currentPlaylist);
        const currentIndex = findCurrentSongIndex(currentPlaylist, currentSong);
        // console.log(currentIndex);
        if (currentIndex + 1 <= currentPlaylist.length - 1) {
            return of(SongsActions.setSong(currentPlaylist[currentIndex + 1]),
                SongsActions.showPlaying(true), SongsActions.setIsPlaying(true));
        } else {
            return of(SongsActions.void());
        }
    })
);
export const setPrevSongEpic: Epic = (action$, state$) => action$.pipe(
    ofType(getType(SongsActions.setPreviousSong)),
    mergeMap((action) => {
        const currentPlaylist = state$.value.songs.playlist;
        const currentSong = state$.value.songs.song;
        const currentIndex = findCurrentSongIndex(currentPlaylist, currentSong);
        if (currentIndex > 0) {
            // action.payload && SoundPlayer.playUrl(currentPlaylist[currentIndex-1].song_file)
            return of(SongsActions.setSong(currentPlaylist[currentIndex - 1]),
                SongsActions.showPlaying(true), SongsActions.setIsPlaying(true)
            );
        } else {
            return of(SongsActions.void());
        }
    })
)

export const selectSongEpic: Epic = (action$, state$) => action$.pipe(
    ofType(getType(SongsActions.setPlaylist)),
    mergeMap(() => {
        return of(SongsActions.setSong(state$.value.songs.playlist.songs[0]))
    })
);
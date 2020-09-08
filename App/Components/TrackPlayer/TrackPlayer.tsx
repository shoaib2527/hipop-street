// libs
import RNTrackPlayer, { Event, Capability } from 'react-native-track-player';
import React from "react";
import { connect } from 'react-redux';
import { SongsActions } from '../../Reducers/SongsReducer';
import { Songs } from '../../Lib/PlaylistTypes';
import { transformSongObject } from '../../Lib/SongQueueHelper';

export interface DispatchProps {
    setSong: (song: Songs) => void;
    showPlay: (playing: boolean) => void;
    isPlaying: (playing: boolean) => void;
}

export type Props = DispatchProps;

export const HAS_INSTANCE = "hasInstance";

class TrackPlayer extends React.Component<Props> {
    /** A wrapper API around RNTrackPlayer
     *
     * This API simplifies using RNTrackPlayer by exposing methods to do common things.
     */
    private static instance: TrackPlayer


    public async componentDidMount() {
        // RNTrackPlayer.addEventListener("remote-pause", (event) => {
        //     RNTrackPlayer.pause();
        // });

        // RNTrackPlayer.addEventListener("remote-stop", () => {
        //     console.log("#DEBUG remote stop #");
        //     RNTrackPlayer.destroy();
        // });

        // RNTrackPlayer.addEventListener("remote-play", (event) => {
        //     RNTrackPlayer.play();
        // });


        RNTrackPlayer.addEventListener("playback-track-changed", async (event) => {
            let trackId = await RNTrackPlayer.getCurrentTrack();
            let song = await RNTrackPlayer.getTrack(trackId);
            this.props.setSong(transformSongObject(song));
        });
        RNTrackPlayer.addEventListener("playback-state", (event) => {
            if (event.state === 3 || event.state === 6) {
                this.props.showPlay(true);
                this.props.isPlaying(true);
            } else if (event.state === 2) {
                this.props.showPlay(false);
                this.props.isPlaying(false);
            }
            // else if(event.state === 1 || event.state === 8){
            //     this.init();
            // }
            // else{

            // }
        });
        RNTrackPlayer.addEventListener("remote-next", (event) => {
            console.log("next workinngggg")
            this.props.showPlay(true);
            this.props.isPlaying(true);
            RNTrackPlayer.skipToNext();
        });
        // RNTrackPlayer.addEventListener("remote-pause", (event) => {
        //     console.log("pauseeee workinngggg")
        //     RNTrackPlayer.pause();
        // });
        // RNTrackPlayer.addEventListener("remote-play", (event) => {
        //     console.log("play workinngggg")
        //     RNTrackPlayer.play();
        // });
        RNTrackPlayer.addEventListener(Event.RemotePlay, () => {
            console.log("Remote Play")
            RNTrackPlayer.play()
        })
        RNTrackPlayer.addEventListener(Event.RemotePause, () => {
            console.log("Remote Pause")
            RNTrackPlayer.pause()
        })
        RNTrackPlayer.addEventListener(Event.RemoteNext, () => {
            console.log("next")
            RNTrackPlayer.skipToNext()
            // setTimeout(() => {
            // RNTrackPlayer.pause()
            // RNTrackPlayer.play()
            // }, 3000
            // )
            this.props.showPlay(true);
            this.props.isPlaying(true);
        })
        RNTrackPlayer.addEventListener(Event.RemotePrevious, () => {
            console.log("Previous")
            RNTrackPlayer.skipToPrevious()
            this.props.showPlay(true);
            this.props.isPlaying(true);
        })
        // RNTrackPlayer.addEventListener("remote-previous", () => {
        //     RNTrackPlayer.skipToPrevious();
        //     this.props.showPlay(true);
        //         this.props.isPlaying(true);
        // })
        const b = await RNTrackPlayer.getState().then((item) => {
            if (!TrackPlayer.instance) {
                item !== 3 && this.init();
            }
            // console.log("get state", item, TrackPlayer.instance)
        })

    }


    public async init() {
        // set up the player so we can use it
        RNTrackPlayer.setupPlayer({
            iosCategoryMode: 'spokenAudio',
            maxCacheSize: 5000
        })

        // add support for capabilities
        const capabilities = [
            Capability.Play,
            Capability.Pause,
            // Capability.SeekTo,
            // RNTrackPlayer.CAPABILITY_STOP,
            Capability.SkipToNext,
            Capability.SkipToPrevious
        ]

        // list of options for the player
        const options = {
            stopWithApp: true,
            // An array of media controls capabilities
            capabilities,
            // An array of capabilities that will show up when the notification is in the compact form
            compactCapabilities: capabilities,
            //capabilities for notification bar
            notificationCapabilities: capabilities
        }

        // update the options
        RNTrackPlayer.updateOptions(options);
        // const a = await AsyncStorage.setItem(HAS_INSTANCE, "true");
    }
    public render() {

        return (<>
        </>)
    }
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    setSong: (song) => dispatch(SongsActions.setSong(song)),
    showPlay: (playing) => dispatch(SongsActions.showPlaying(playing)),
    isPlaying: (playing) => dispatch(SongsActions.setIsPlaying(playing)),

})
export const mapStateToProps = (state: RootState): StateProps => ({
    isPlaying: state.songs.isPlaying,
    currentSong: state.songs.song,
    currentPlaylist: state.songs.playlist,
});
export default connect(mapStateToProps, mapDispatchToProps)(TrackPlayer)
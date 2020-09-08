import { Icon } from "native-base";
import React from "react";
import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import RNTrackPlayer from "react-native-track-player";
import { NavigationScreenProps } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import { OpenSong } from "../../Containers/MusicPlayScreen/MusicPlayScreen";
import { Songs } from "../../Lib/PlaylistTypes";
// import SoundPlayer from "react-native-sound-player";
import { RootState } from "../../Reducers";
import { SongsActions } from "../../Reducers/SongsReducer";
import styles from "./MusicPlayerStyles";



export interface OwnProps {
    style?: ViewStyle;
    hide: boolean;
    navigation: NavigationScreenProps;
    // playNextSong? : () => void;
};

export interface DispatchProps {
    playMusic: (shouldPlay: boolean) => void;
    playNext: (isAuto: boolean) => void;
    playPrev: () => void;
    showPlaying: (playing: boolean) => void;
    showPlayer: () => void;
}
export interface State {
    showPause: boolean;

}
export interface StateProps {
    isPlaying: boolean;
    currentSong: Songs;
    currentPlaylist: Songs;
    showPlay: boolean;
}

export type Props = StateProps & OwnProps & DispatchProps & NavigationScreenProps;

class MusicPlayer extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            showPause: false,
        }
    }
    public _onFinishedPlaying: any = null;


    public playSong = () => {
        RNTrackPlayer.play();
        this.props.showPlaying(true);
        this.props.playMusic(true);
        // }
    };
    public pauseSong = () => {
        RNTrackPlayer.pause();
        this.props.showPlaying(false);
    }
    public playNextSong = async (isAuto: boolean) => {
        // this.props.playNext(isAuto);
        const skip = await RNTrackPlayer.skipToNext();
        this.props.showPlaying(true);

    }
    public playPreviousSong = async () => {
        // this.props.playPrev();
        const skip = await RNTrackPlayer.skipToPrevious()
        this.props.showPlaying(true);

    }
    public openSongScrenn = () => {
        if (this.props.currentSong.song_file) {

            this.props.navigation.push("MusicPlayScreen", { songData: "", isSong: true, comingFrom: OpenSong.COMPONENT });
        }
    }
    public render() {
        return (
            <TouchableOpacity
                // activeOpacity={0}
                onPress={this.openSongScrenn}
                style={[styles.mainView, this.props.style]}>
                <Image
                    style={styles.imageView}
                    resizeMode={"cover"}
                    source={{ uri: this.props.currentSong.songimage }} />
                {this.props.currentSong && <View style={styles.textView}>
                    <Text style={styles.heading} numberOfLines={1}>{this.props.currentSong.song_name || " "}</Text>
                    <Text style={styles.subHeading}>
                        {this.props.currentSong.artistName || ""}</Text>
                </View>}
                <View style={{ flexDirection: "row", alignSelf: "center", flex: 0.5, marginLeft: 20 }}>
                    <Icon onPress={this.playPreviousSong} style={styles.icon} name={"stepbackward"} type={"AntDesign"} />
                    {this.props.showPlay && <Icon onPress={this.pauseSong} style={[styles.icon]} name={"pause"} type={"AntDesign"} />}
                    {!this.props.showPlay && <Icon onPress={this.playSong} style={[styles.icon]} name={"caretright"} type={"AntDesign"} />}
                    <Icon onPress={() => this.playNextSong(true)} style={styles.icon} name={"stepforward"} type={"AntDesign"} />
                    <TouchableOpacity onPress={() => this.props.showPlayer()} style={{ paddingHorizontal: 5 }}><Icon style={styles.icon} name={"cross"} type={"Entypo"} /></TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
};
export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    playMusic: (shouldPlay) => dispatch(SongsActions.setIsPlaying(shouldPlay)),
    playNext: (isAuto: boolean) => dispatch(SongsActions.setNextSong(isAuto)),
    playPrev: () => dispatch(SongsActions.setPreviousSong(true)),
    showPlaying: (playing) => dispatch(SongsActions.showPlaying(playing)),
    showPlayer: () => dispatch(SongsActions.showPlayer(false)),
});
export const mapStateToProps = (state: RootState): StateProps => ({
    isPlaying: state.songs.isPlaying,
    currentSong: state.songs.song,
    currentPlaylist: state.songs.playlist,
    showPlay: state.songs.showPlay,
});
export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
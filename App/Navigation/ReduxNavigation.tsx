import * as React from "react";
// import {SafeAreaView} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createAppContainer, NavigationScreenProps, } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import AppNavigation from "./AppNavigation";
import LoginNavigation from "./LoginNavigation";
import { RootState } from "../Reducers";
import { LoginActions } from "../Reducers/LoginReducers";
import { Alert, Platform, Linking } from "react-native";
import { ISongData, OpenSong } from "../Containers/MusicPlayScreen/MusicPlayScreen";
import { SongsActions } from "../Reducers/SongsReducer";
import { setKey, expand } from "react-native-google-shortener";
import { transformSongArray } from "../Lib/SongQueueHelper";
import RNTrackPlayer from "react-native-track-player";
import { Colors } from "../Themes";
// import firebase from "react-native-firebase";


export interface StateProps {
  isLogin: boolean;
}
export interface DispatchProps {
  // checkLogin: () => void;
  checkUserRole: (callback: () => void) => void;
  playSong: (song: ISongData) => void;
  shouldPlay: (play: boolean) => void;
  showPlay: (play: boolean) => void;
}
export type Props = StateProps & DispatchProps & NavigationScreenProps;

// here is our redux-aware smart component
class ReduxNavigation extends React.Component<Props> {
  // const { dispatch, nav } = props;
  // const navigation = ReactNavigation.addNavigationHelpers({
  //   dispatch,
  //   state: nav,
  // });
  public componentDidMount() {
    setKey("AIzaSyCDJLIQ-qeKlvUDfxokL2W4OCIfmD77pM0");
    // this.props.checkLogin();
    this.props.checkUserRole(() => Alert.alert("Error", "no user role"));
    Linking.addEventListener('url', this.handleOpenURL);
    // if (Platform.OS === 'android') {
    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
    // dynamicLinks.dynamicLinks().getInitialLink().then((url) => this.navigate(url));
    // dynamicLinks.dynamicLinks().onLink((url)=>this.navigate())
    // }
  }
  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  public handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }
  public navigate = (url) => { // E
    if (url) {
      RNTrackPlayer.reset()
      let croppedShareUrl = "";
      let n = url.search("song");
      // console.log(n)
      croppedShareUrl = Platform.OS == "ios" ? url.substring(n + 5, url.length) : url.substring(n + 7, url.length)
      console.log(croppedShareUrl)
      let decodedShareUrl = Platform.OS == "ios" ? decodeURI(decodeURI(croppedShareUrl)).split("&apn")[0] : decodeURI(croppedShareUrl)
      // console.log("replaced", `${croppedShareUrl}`.replace(/%26/g, "\",\"").replace(/%3D/g, "\":\"").replace(/%2F/g, "/").replace(/%3A/g, ":").replace(/%20/g, " "))

      let parsedUrl = JSON.parse(decodeURI('{"' + `${decodedShareUrl}`.replace(/%26/g, "\",\"").replace(/%3D/g, "\":\"").replace(/%2F/g, "/").replace(/%3A/g, ":").replace(/%20/g, " ") + '"}'));
      this.props.playSong(parsedUrl);
      this.props.shouldPlay(true);
      RNTrackPlayer.add(transformSongArray([parsedUrl]));
      RNTrackPlayer.play();
      this.props.showPlay(true);
      // this.props.navigation.navigate("MusicPlayScreen", { songData: parsedUrl, isSong: parsedUrl.song_type === "mp3", comingFrom: OpenSong.SCREEN })

    }
  }
  public render() {
    console.log("IS LOGIN +++++++>>>>>>>>> ", this.props.isLogin)
    // console.log("at redux comp", this.props.isLogin);
    const AppContainer = createAppContainer(AppNavigation);
    const LoginContainer = createAppContainer(LoginNavigation)
    return this.props.isLogin ?

      <AppContainer enableURLHandling={false} />

      :

      <LoginContainer />

  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  // checkLogin: () => dispatch(LoginActions.checkIsLogin()),
  checkUserRole: (callback) => dispatch(LoginActions.checkUserRole(callback)),
  playSong: (song) => dispatch(SongsActions.setSong(song)),
  shouldPlay: (play) => dispatch(SongsActions.setIsPlaying(play)),
  showPlay: (showPlay) => dispatch(SongsActions.showPlaying(showPlay)),
})

const mapStateToProps = (state: RootState) => ({
  isLogin: state.login.isLogin,
});
export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigation);

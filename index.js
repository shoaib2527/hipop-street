import "./App/Config/ReactotronConfig"
import { AppRegistry } from 'react-native';
import App from "./App/Containers/App";
import RNTrackPlayer from "react-native-track-player";
import HandleBgMessage from './App/Containers/HandleBgMessage/HandleBgMessage'; // <-- Import the file you created in (2)
// console.disableYellowBox = true

AppRegistry.registerComponent("MusicApp", () => App);

RNTrackPlayer.registerPlaybackService(() => require("./service.js"));

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => HandleBgMessage);
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";
import HomeScreen from "../Containers/HomeScreen/HomeScreen";
import PlaylistScreen from "../Containers/PlaylistScreen/PlaylistScreen";
import SelectAllCategory from "../Containers/AllCategoriesScreen/AllCategoriesScreen";
import BlogScreen from "../Containers/BlogScreen/BlogScreen";
import SettingsScreen from "../Containers/SettingScreen/SettingsScreen";
import AddSongScreen from "../Containers/AddSongScreen/AddSongScreen";
import MusicPlayScreen from "../Containers/MusicPlayScreen/MusicPlayScreen";
import ArtistProfileScreen from "../Containers/ArtistProfileScreen/ArtistProfileScreen";

const home = createStackNavigator({
  Home: { screen: HomeScreen },
  Playlist: { screen: PlaylistScreen },
  SelectAllCategory: { screen: SelectAllCategory },
  MusicPlayScreen: { screen: MusicPlayScreen }
}, {
  headerMode: "none",
  initialRouteName: "Home",
  navigationOptions: {
    headerStyle: styles.header,

  },
});
const playlist = createStackNavigator({
  PlaylistScreen: { screen: PlaylistScreen },
  MusicPlayScreen: { screen: MusicPlayScreen },
  AddSongScreen: { screen: AddSongScreen },
}, {
  headerMode: "none",
  initialRouteName: "PlaylistScreen",
  navigationOptions: {
    headerStyle: styles.header,
  },
})


// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  HomeScreen: { screen: home, },
  PlaylistScreen: { screen: playlist },
  BlogsScreen: { screen: BlogScreen },
  SettingScreen: { screen: SettingsScreen, path: "settings" },
  ArtistProfileScreen: { screen: ArtistProfileScreen },
  MusicPlayScreen: { screen: MusicPlayScreen }
  // SelectAllCategory: {screen: SelectAllCategory},
}, {
  initialRouteName: "HomeScreen",
  headerMode: "none",
});

export default PrimaryNav;

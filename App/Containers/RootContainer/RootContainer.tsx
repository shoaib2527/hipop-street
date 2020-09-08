import * as React from "react";
import { StatusBar, View, Linking, Platform } from "react-native";
import { connect } from "react-redux";
import ReduxPersist from "../../Config/ReduxPersist";
import ReduxNavigation from "../../Navigation/ReduxNavigation";
import { StartupActions } from "../../Reducers/StartupReducers";

// Styles
import styles from "./RootContainerStyles";
import { NavigationScreenProps } from "react-navigation";
import LoaderComponent from "../../Components/LoaderComponent/LoaderComponent";
import PushNotifContainer from "../PushNotifContainer/PushNotifContainer";
import SplashScreen from "react-native-splash-screen";
import TrackPlayer from "../../Components/TrackPlayer/TrackPlayer";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../../Themes";
import { LoginActions } from "../../Reducers/LoginReducers";


interface OwnProps {
  startup: () => void;
  checkLogin: () => void;
}

interface State {

}
export type Props = OwnProps & NavigationScreenProps;

export class RootContainer extends React.Component<Props, State> {
  public componentDidMount() {
    SplashScreen.hide();
    this.props.checkLogin();
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();

    }
    // Linking.addEventListener('url', this.handleOpenURL);
    // if (Platform.OS === 'android') {
    //   Linking.getInitialURL().then(url => {
    //     this.navigate(url);
    //   });
    // }
  }
  // componentWillUnmount() { // C
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }
  // public handleOpenURL = (event) => { // D
  //   this.navigate(event.url);
  // }
  // navigate = (url) => { // E
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   const routeName = route.split('/')[0];

  //   // if (routeName === 'song') {
  //   //   navigate('MusicPlayScreen', { id, name: 'chris' })
  //   // };
  // }

  public render() {
    // console.log("root", this.props.navigation);
    return (
      <View style={styles.applicationView}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle="dark-content" />
            <ReduxNavigation navigation={this.props.navigation} />
            <LoaderComponent />
            <PushNotifContainer />
            <TrackPlayer />
          </SafeAreaView>
        </SafeAreaProvider >
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any): OwnProps => ({
  startup: () => dispatch(StartupActions.startup()),
  checkLogin: () => dispatch(LoginActions.checkIsLogin()),

});

export default connect(null, mapDispatchToProps)(RootContainer);

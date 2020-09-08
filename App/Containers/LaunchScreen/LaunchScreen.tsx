import { Container } from "native-base";
import React, { Component } from "react";
import { ImageBackground, ScrollView, Text, View, Alert } from "react-native";
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import LargeTransparentButton from "../../Components/LargeTransparentButton";
import { IUserData } from "../../Lib/Interfaces";
import { LoginActions } from "../../Reducers/LoginReducers";
import { ProfileAction } from "../../Reducers/ProfileReducers";
import { Images } from "../../Themes";
import colors from "../../Themes/Colors";
// Styles
import styles from "./LaunchScreenStyles";



export interface DispatchProps {
  fbLogin: (email: undefined, pwd: undefined, socialType: "facebook", socialId: string, userData: IUserData) => void;
  setProfileData: (params: IUserData) => void;
  logout: () => void;
}

export type Props = DispatchProps & NavigationScreenProps;

class LaunchScreen extends Component<Props> {
  public openSignup = () => {
    this.props.navigation.navigate("SignUpScreen");
  }
  public openLogin = () => {
    this.props.navigation.navigate("EmailLogin");
  }
  // public fbLogin = (error: any, result: any) => {
  //   if (error) {
  //     console.log("login has error: " + error);
  //     Alert.alert("at fb login error1", error);
  //   } else if (result.isCancelled) {
  //     console.log("login is cancelled.");
  //   } else {
  //     console.log("at else")
  //     AccessToken.getCurrentAccessToken().then(
  //       (data) => {
  //         let req = new GraphRequest('/me', {
  //           httpMethod: 'GET',
  //           version: 'v2.5',
  //           parameters: {
  //               'fields': {
  //                   'string' : 'email,name,friends, picture,'
  //               }
  //           }
  //       }, (err, res) => {
  //           console.log("graph request result", err, res);
  //           Alert.alert("error", err)
  //           if(!err){
  //             this.props.fbLogin(undefined, undefined, "facebook", data.accessToken.toString());
  //             this.props.setProfileData({name: res.name, image: res.picture.data.url})
  //           }
  //       });
  //       new GraphRequestManager().addRequest(req).start();
  //       }
  //     )
  //   }
  // }
  public render() {
    return (
      <Container style={styles.mainContainer}>
        {/* <Content> */}
        <ImageBackground style={{ flex: 1 }} source={Images.backgroundImg}>
          {/* <AppLogo style={{marginTop: 200}} appNameStyle={{color: colors.snow}} appSloganStyle={{color: colors.lightPink}} iconStyle={{color: colors.snow}}/> */}
          <ScrollView style={{ width: "100%", position: "absolute", bottom: 20 }}>
            <Text style={styles.accountText}>Don't have an account? <Text onPress={this.openSignup} style={{ color: colors.maroon, fontWeight: "bold" }}>Sign up</Text></Text>
            {/* <View style={{flexDirection: "row",  paddingHorizontal: 5, paddingVertical: 10, justifyContent: "space-between"}}> */}
            <View style={{ alignSelf: "center", flex: 1, paddingVertical: 10, marginTop: 10 }}>
              <LoginButton
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log("login has error: " + error);
                      Alert.alert("Error", "Unfortunately an error occurred during your login, please try again later")
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {
                      console.log("at else")
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          let userDataFb = { userName: "", biography: "", gender: "", image: "", emailId: "" };
                          let req = new GraphRequest('/me', {
                            accessToken: data.accessToken.toString(),
                            parameters: {
                              fields: {
                                string: 'email,name,first_name,last_name,picture'
                              }
                            }
                          }, (err, res) => {
                            console.log("graph request result", err, res);
                            if (err === undefined || err === null) {
                              // this.props.fbLogin(undefined, undefined, "facebook", data.accessToken.toString());
                              userDataFb = {
                                userName: res.name,
                                image: { uri: res.picture.data.url, type: "image/png", name: "fbimage.png" },
                                gender: "", biography: "-", emailId: "-"
                              };
                              this.props.fbLogin(undefined, undefined, "facebook", data.accessToken.toString(), userDataFb);
                            }
                          });
                          new GraphRequestManager().addRequest(req).start();

                        }
                      )
                    }
                  }
                }
                onLogoutFinished={this.props.logout} />
            </View>
            {/* <View style={{flex: 0.4, alignSelf: "flex-end"}}>
       <LargeButton text={"login with google"} style={{ height: 30}}></LargeButton></View> */}
            {/* </View> */}


            {/* <LargeButton style={{marginTop: 10,  marginHorizontal: 20}} text={"LOGIN WITH FACEBOOK"} iconName={"sc-facebook"} iconType={"EvilIcons"}></LargeButton> */}
            <LargeTransparentButton onPress={this.openLogin} style={{ marginTop: 10 }} text={"LOGIN WITH EMAIL"} iconName={"email"} iconType={"MaterialCommunityIcons"} />
          </ScrollView>
        </ImageBackground>
        {/* </Content> */}
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch): DispatchProps => ({
  fbLogin: (email, pwd, socialType, socialId, userData) => dispatch(LoginActions.loginRequest(email, pwd, socialType, socialId, userData)),
  setProfileData: (params: IUserData) => dispatch(ProfileAction.updateProfileRequest(params)),
  logout: () => dispatch(LoginActions.socialLogout()),
})
export default connect(null, mapDispatchToProps)(LaunchScreen);

import { Card, Col, Container, Content, Icon } from "native-base";
import React from "react";
import { Alert, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, Keyboard } from "react-native";
import { LoginManager } from "react-native-fbsdk";
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import BottomBar from "../../Components/BottomBar";
import CommonHeader from "../../Components/CommonHeader/CommonHeader";
import ModalView from "../../Components/ModalView/ModalView";
import { IUserData } from "../../Lib/Interfaces";
import { RootState } from "../../Reducers";
import { BottomBarActions } from "../../Reducers/BottomBarReducer";
import { LoginActions } from "../../Reducers/LoginReducers";
import { ProfileAction } from "../../Reducers/ProfileReducers";
import { SongsActions } from "../../Reducers/SongsReducer";
import { Images } from "../../Themes";
import colors from "../../Themes/Colors";
import { BottomBarBtns } from "../../Types/BottomBar";
import styles from "./SettingsScreenStyles";

export interface DispatchProps {
    selectBottomTab: (selectedTab: BottomBarBtns) => void;
    updateProfile: (params: IUserData) => void;
    logout: () => void;
    selectSong: (song_file: string) => void;
    playMusic: (shouldPlay: boolean) => void;
}

export interface State {
    visible: boolean;
    profileImage: { uri: string, type: string, name: string } | any;
    userName: string;
    bio: string;
    gender: string;
    emailId: string;
    imgPosition: { x: number, y: number };
}
export interface StateProps {
    profileData: IUserData;
}

export type Props = NavigationScreenProps & DispatchProps & StateProps;

class SettingScreen extends React.Component<Props, State>{
    public emptyImagePath = "http://app.hiphopstreets.com/uploads/";
    public constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // profileImage: { uri: Images.profileImage, type: "image/jpeg", name: "" },
            profileImage: Images.profileImage,
            bio: this.props.profileData ? this.props.profileData.biography : "Say something about yourself",
            // gender: this.props.profileData ? this.props.profileData.sex : "Specify your gender",
            userName: this.props.profileData ? this.props.profileData.name : "your username",
            emailId: this.props.profileData ? this.props.profileData.email_id : "your email address",
            imgPosition: { x: 0, y: 0 }
        }
    }
    // public onBackPress: any = null;
    public handleBack = () => {
        this.props.navigation.navigate("HomeScreen");
    }
    public async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
        } catch (e) {
            console.log("error occured in camera and storage permission")
        }
        this.props.selectBottomTab(BottomBarBtns.SETTINGS);
    }
    public componentWillUnmount() {
    }
    public renderItem = (initials?: boolean, title: string, onPress: () => void, icon?: string) => {
        return (
            <TouchableOpacity style={styles.listView}>
                <Card style={{ padding: 20 }}>
                    <View style={{ flexDirection: "row" }}><Text style={styles.text}>{title}</Text>
                        <Col></Col>
                        <Icon name={"plus-circle"} type={"Feather"} style={styles.plusIcon}></Icon>
                    </View>
                </Card>
            </TouchableOpacity>


        )
    }
    public showModal = () => this.setState({ visible: true });
    public renderTopProfileView = () => {
        let data = this.props.profileData;
        return (<View style={styles.profileView}>
            {data ? data.image === this.emptyImagePath ?
                <Image source={Images.profileImage} style={styles.roundView}></Image>
                : <Image source={{ uri: data.image }} style={styles.roundView}></Image> : <Image
                    style={styles.roundView}
                    source={Images.profileImage}></Image>
            }

            <View style={styles.profileInfo}>
                <Text style={styles.userNameHeading}>{data ? data.name : "Username"}</Text>
                <Text style={styles.bioHeading} numberOfLines={4}>{data ? data.email_id : "Email id"}</Text>
                <Text style={styles.bioHeading} numberOfLines={4}>{data ? data.biography : "Biography"}</Text>
                {/* <Text style={styles.bioHeading} numberOfLines={1}>{data ? data.sex : "Gender" }</Text> */}
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={this.showModal}>
                    <Text style={[styles.userNameHeading, { fontWeight: "normal", fontSize: 15, color: colors.lightMaroon }]}>Edit Profile</Text>
                    <Icon name={"edit-3"} type={"Feather"} style={styles.editIcon}></Icon>
                </TouchableOpacity>
                {/* <LargeTransparentButton text={"Edit Profile"} textStyle= {styles.editBtnText} style={styles.editBtn}/> */}
            </View>
        </View>)
    };

    public logout = () => {
        this.props.playMusic(false);
        LoginManager.logOut()
        this.props.logout();
    }

    public renderListView = () => (
        <ScrollView style={{ maxHeight: "65%" }}>
            {/* <FlatList data={SettingsData} renderItem={this.renderSettingsItems} style={{ marginBottom: 90 }} /> */}
            <View style={styles.itemRow}>
                <Icon name={"info-outline"} type={"MaterialIcons"}
                    style={[styles.editIcon, { padding: 0, alignSelf: "flex-start", fontSize: 20 }]} />
                <View style={styles.settingsItemView}>
                    <Text style={styles.text}>About Us</Text>
                    <Text style={styles.descriptionText}>We have one mission at HipHop Streets...Inspire aspiring artists to go for their dreams. We use our custom music app, our relationships  and our various platforms to give deserving artists the exposure and opportunities they need. Learn more about us at <Text
                        style={{ color: colors.maroon }} onPress={() => Linking.openURL("https://www.hiphopstreets.com")}>https://www.hiphopstreets.com</Text></Text>
                    <View style={styles.caretLine}></View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <Icon name={"ios-call"} type={"Ionicons"}
                    style={[styles.editIcon, { padding: 0, alignSelf: "flex-start", fontSize: 20 }]} />
                <View style={styles.settingsItemView}>
                    <Text style={styles.text}>Contact Us</Text>
                    <Text style={styles.descriptionText}>Reach out to us via email at
                <Text style={{ color: colors.maroon }}
                            onPress={() => Linking.openURL("mailto:hiphopstreets2016@gmail.com")}> hiphopstreets2016@gmail.com</Text></Text>
                    <View style={styles.caretLine}></View>
                </View>
            </View>
            <View style={styles.itemRow}>
                <Icon name={"logout"} type={"MaterialCommunityIcons"}
                    style={[styles.editIcon, { padding: 0, alignSelf: "flex-start", fontSize: 20 }]} />
                <View style={styles.settingsItemView}>
                    <Text style={styles.text} onPress={this.askLogout}>Logout</Text>
                    <View style={styles.caretLine}></View>
                </View>
            </View>
        </ScrollView>
    )
    public askLogout = () => {
        Alert.alert("Confirmation", "Are you sure you want to log out?", [
            {
                text: "Yes",
                onPress: this.logout,
            },
            {
                text: "Cancel",
            }
        ])
    }

    public renderSettingsItems = ({ item }) => (

        <View style={styles.itemRow}>
            <Icon name={item.iconName} type={item.iconType} style={[styles.editIcon, { padding: 0, alignSelf: "flex-start", fontSize: 20 }]} />
            <TouchableOpacity style={styles.settingsItemView} onPress={() => this.askLogout(item.title)}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <View style={styles.caretLine}></View>
            </TouchableOpacity>
        </View>
    )
    public onLayoutImg = (e) => {
        this.setState({
            imgPosition: { x: e.nativeEvent.layout.width, y: e.nativeEvent.layout.height }
        })
    }
    public selectImage = () => {
        const options = {
            title: "Pick your profile picture"
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({ profileImage: { uri: response.uri, type: response.type, name: response.fileName } });
            }
        });
    }
    updateProfile = () => {
        if (this.state.userName && this.state.emailId && this.state.profileImage !== undefined
            && this.state.bio) {
            this.setState({ visible: false });
            this.props.updateProfile({
                userName: this.state.userName, emailId: this.state.emailId, gender: "undefined",
                image: this.state.profileImage, biography: this.state.bio
            })
        } else {
            Alert.alert("Error", "Please enter all fields to update your profile!")
        }
    }
    public render() {
        return (
            <Container>
                <CommonHeader title={"Profile & Settings"} />
                {/* {this.props.profileData ?  */}
                <Content style={{}}>
                    {this.renderTopProfileView()}
                    {this.renderListView()}
                </Content>
                {/* : */}
                {/* <Text style={{padding: 30, alignSelf: "center", marginTop: 50}}>Unfortunately, your profile data is not available at the moment! Please try again later</Text> */}
                {/* } */}
                <ModalView content={
                    <ScrollView style={styles.modalContent}>
                        {this.state.profileImage.uri ? <Image
                            source={{ uri: this.state.profileImage.uri }} style={styles.roundView} onLayout={this.onLayoutImg} /> :
                            <Image
                                source={Images.profileImage} style={styles.roundView} onLayout={this.onLayoutImg}
                            />
                        }

                        <TouchableOpacity style={[styles.cameraView, { top: this.state.imgPosition.y - 140, left: this.state.imgPosition.x - 30, }]}
                            onPress={this.selectImage}
                        >
                            <Icon name={"camera"} type={"FontAwesome"} style={styles.camIcon}></Icon>
                        </TouchableOpacity>
                        <TextInput style={{ color: 'black' }} value={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} underlineColorAndroid={colors.maroon} placeholder={"Enter your username"} />
                        <TextInput style={{ color: 'black' }} value={this.state.emailId} onChangeText={(text) => this.setState({ emailId: text })} underlineColorAndroid={colors.maroon} placeholder={"Enter your email id"} />
                        <TextInput style={{ color: 'black' }} value={this.state.bio} onChangeText={(text) => this.setState({ bio: text })}
                            underlineColorAndroid={colors.maroon} placeholder={"Enter your biography"}
                            multiline={true}
                            maxLength={100}
                            onBlur={() => Keyboard.dismiss()}
                        />
                        {this.state.bio && this.state.bio.length === 100 &&
                            <Text style={[styles.descriptionText, { color: colors.lightMaroon, fontSize: 12, margin: 0 }]}>Oops! You have reached maximum word limit</Text>}
                        {/* <TextInput value={this.state.gender} onChangeText={(text) => this.setState({ gender: text })} underlineColorAndroid={colors.maroon} placeholder={"Enter your gender"}/> */}
                    </ScrollView>
                }
                    visible={this.state.visible}
                    title={"Edit your profile"}
                    cancel={() => { this.setState({ visible: false }) }}
                    done={this.updateProfile}
                />
                <BottomBar navigation={this.props.navigation} />
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    selectBottomTab: (tab) => dispatch(BottomBarActions.setSelectedTab(tab)),
    updateProfile: (params: IUserData) => dispatch(ProfileAction.updateProfileRequest(params)),
    logout: () => dispatch(LoginActions.logout()),
    selectSong: (song) => dispatch(SongsActions.setSong(song)),
    playMusic: () => dispatch(SongsActions.setIsPlaying(false)),
})
const mapStateToProps = (state: RootState): StateProps => ({
    profileData: state.profile.profileData,
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
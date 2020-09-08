import { Container, Icon } from "native-base";
import React from "react";
import { FlatList, ActivityIndicator, TouchableOpacity, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import BottomBar from "../../Components/BottomBar";
import CommonHeader from "../../Components/CommonHeader/CommonHeader";
import { Blogs } from "../../Lib/BlogData";
import { BottomBarBtns } from "../../Types/BottomBar";
import { WebView } from "react-native-webview";
import { connect, Dispatch } from "react-redux";
import { BottomBarActions } from "../../Reducers/BottomBarReducer";
import colors from "../../Themes/Colors";

export interface DispatchProps {
    selectBottomTab: (tab: BottomBarBtns) => void;
}

export type Props = NavigationScreenProps & DispatchProps;

class BlogScreen extends React.Component<Props>{
    public webViewRef: WebView;
    public componentDidMount() {
        this.props.selectBottomTab(BottomBarBtns.BLOGS);
    }
    public showLoader = () => {
        return (
            <View style={{alignSelf: "center"}}>
                <ActivityIndicator color={colors.lightMaroon} size={"small"} />
            </View>
            
        )
    }
    public render() {
        return (
            <Container>
                <CommonHeader
                    title={""}
                    leftItem={
                        <TouchableOpacity onPress={() => this.webViewRef.goBack()} style={{ flexDirection: "row", marginTop: 5 }}>
                            <Icon name={"ios-arrow-back"} style={{ fontSize: 12, color: colors.lightMaroon, padding: 10 }} />
                            {/* <Text style={{ fontFamily: "serif", fontSize: 10, color: colors.lightMaroon, alignSelf: "center" }}>Previous page</Text> */}
                            <Text style={{  fontSize: 10, color: colors.lightMaroon, alignSelf: "center" }}>Previous page</Text>

                        </TouchableOpacity>
                    }
                    rightItem={<TouchableOpacity onPress={() => this.webViewRef.goForward()} style={{ flexDirection: "row" }}>
                        {/* <Text style={{ fontFamily: "serif", fontSize: 10, color: colors.lightMaroon, alignSelf: "center" }}>Next page</Text> */}
                        <Text style={{ fontSize: 10, color: colors.lightMaroon, alignSelf: "center" }}>Next page</Text>
                        <Icon name={"ios-arrow-forward"} style={{ fontSize: 12, color: colors.lightMaroon, padding: 10,  }} />

                    </TouchableOpacity>}
                />
                <WebView
                    ref={(a) => this.webViewRef = a}
                    source={{ uri: 'https://www.hiphopstreets.com/Blog' }}
                    startInLoadingState={true}
                    renderLoading={this.showLoader}
                // style={{marginTop: 20}}
                />
                <BottomBar navigation={this.props.navigation} />
            </Container>
        )
    }
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    selectBottomTab: (btnName) => dispatch(BottomBarActions.setSelectedTab(btnName)),
})

export default connect(null, mapDispatchToProps)(BlogScreen);
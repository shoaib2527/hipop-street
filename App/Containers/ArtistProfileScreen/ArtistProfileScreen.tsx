import { connect, Dispatch } from "react-redux"
import React from "react";
import { Container, Icon, ListItem, Row, Col } from "native-base";
import { RootState } from "../../Reducers";
import CommonHeader from "../../Components/CommonHeader/CommonHeader";
import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import colors from "../../Themes/Colors";
import { NavigationScreenProps } from "react-navigation";
import styles from "./ArtistProfileScreenStyles";


// export interface DispatchProps{
//     getArtistProfile: () => 
// }

export interface StateProps {
    artistData: any;
}
export type Props = StateProps & NavigationScreenProps;

class ArtistProfileScreen extends React.Component<Props>{

    public render() {
        return (
            <Container>
                <CommonHeader
                    title={"Artist Profile"}
                    leftItem={<TouchableOpacity style={{ marginTop: 10, paddingRight: 5 }}>
                        <Icon name={"ios-arrow-back"} style={{ fontSize: 16, color: colors.lightMaroon }} onPress={() => this.props.navigation.pop()} />
                    </TouchableOpacity>}
                />
                {this.props.artistData ? <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
                    <Image
                        source={{ uri: this.props.artistData.image }} style={{
                            borderRadius: 5, height: 250,
                            width: 250, alignSelf: "center"
                        }} ></Image>
                    {/* <Text style={{ alignSelf: "center", color: colors.lightMaroon, fontFamily: "serif", fontSize: 25, marginTop: 10, fontWeight: "bold" }}> */}
                    <Text style={{ alignSelf: "center", color: colors.lightMaroon, fontSize: 25, marginTop: 10, fontWeight: "bold" }}>
                        {this.props.artistData.name}</Text>
                    <ScrollView style={{ maxHeight: "50%", }} contentContainerStyle={{ paddingBottom: Platform.OS == "ios" ? 20 : 100 }}>
                        <View style={styles.listView}>
                            <Text style={styles.headingText}>About {this.props.artistData.name}</Text>
                            <Text style={styles.valueText}>{this.props.artistData.biography || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>
                        <View style={styles.listView}>
                            <Text style={styles.headingText}>Top Albums</Text>
                            <Text style={styles.valueText}>{this.props.artistData.top_albums || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>
                        <View style={styles.listView}>
                            <Text style={styles.headingText}>Interests</Text>
                            <Text style={styles.valueText}>{this.props.artistData.interests || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>

                        <View style={styles.listView}>
                            <Text style={styles.headingText}>Gender</Text>
                            <Text style={styles.valueText}>{this.props.artistData.sex || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>

                        <View style={styles.listView}>
                            <Text style={styles.headingText}>Birthday</Text>
                            <Text style={styles.valueText}>{this.props.artistData.dob || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>
                        <View style={styles.listView}>
                            <Text style={styles.headingText}>Country</Text>
                            <Text style={styles.valueText}>{this.props.artistData.country || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>
                        <View style={styles.listView}>
                            <Text style={styles.headingText}>Contact Email</Text>
                            <Text style={styles.valueText}>{this.props.artistData.email_id || "-"}</Text>
                        </View>
                        <View style={styles.caret}></View>
                    </ScrollView>

                </View> :
                    <Text style={{ paddingHorizontal: 40, marginTop: 100, alignSelf: "center" }}>
                        Currently we dont have any data to display for this artist! Please try again later</Text>}
            </Container>
        )
    }

}

// const mapDispatchToProps = (dispatch: Dispatch):DispatchProps => ({

// });

const mapStateToProps = (state: RootState): StateProps => ({
    artistData: state.artist.artistData,
})

export default connect(mapStateToProps, null)(ArtistProfileScreen)
import React from "react";
import { Container, Content, Icon } from "native-base";
import InputText from "../../Components/InputText/InputText";
import LargeButton from "../../Components/LargeButton";
import {Text, TouchableOpacity, Linking} from "react-native";
import colors from "../../Themes/Colors";
import styles from "./AddSongScreenStyles";
import CommonHeader from "../../Components/CommonHeader/CommonHeader";
import { NavigationScreenProps } from "react-navigation";

export interface OwnProps {

}
export type Props = OwnProps & NavigationScreenProps;

class AddSongScreen extends React.Component<Props>{
    public render() {
        return (
            <Container>
                <CommonHeader title={"Add your song"}
                     leftItem={
                        <TouchableOpacity style={{ marginTop: 10, paddingRight: 5 }} onPress={() => this.props.navigation.pop()}>
                            <Icon name={"ios-arrow-back"} style={{ fontSize: 16, color: colors.lightMaroon, padding: 10 }}></Icon>
                        </TouchableOpacity>}
                ></CommonHeader>
                <TouchableOpacity onPress = {() => Linking.openURL("https://app.hiphopstreets.com")} >
                <Text style={[styles.descriptionText, {paddingHorizontal: 15}]}>
                     Thanks for joining the HipHopstreets Streaming App. Go to 
                     <Text
                        style={{ color: colors.maroon }} 
                        > app.hiphopstreets.com <Text style={{color: colors.coal}}>to upload your song or video</Text></Text>
                    </Text>
                </TouchableOpacity>
            
       
                
            </Container>
        )
    }
}

export default AddSongScreen;
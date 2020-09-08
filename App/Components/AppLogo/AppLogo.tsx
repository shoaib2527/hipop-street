import React from "react";
import {View, Text, ViewStyle, TextStyle, Image} from "react-native";
import {Icon} from "native-base";
import styles from "./AppLogoStyles";
import { Images } from "../../Themes";

export interface Props{
    style?: ViewStyle;
    iconStyle?:TextStyle;
    appNameStyle?:TextStyle;
    appSloganStyle?:TextStyle;
}

const AppLogo: React.SFC<Props> = ({style, appNameStyle, appSloganStyle, iconStyle}: Props) => (
    <View style={[styles.centerView, style]}>
       {/* <Icon style={[styles.guitarIcon, iconStyle]} name={"guitar"} type={"FontAwesome5"} /> */}
       <Image resizeMode={"cover"} source={Images.appLogo} style={styles.logoStyle}/>
       <Text style={[styles.appNameText, appNameStyle]}>Hiphop Streets</Text>
       {/* <Text style={[styles.appSloganText, appSloganStyle]}>Scream it louder</Text> */}
       </View>
)

export default AppLogo;
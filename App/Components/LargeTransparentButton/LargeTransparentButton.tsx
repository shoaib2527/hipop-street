import React from "react";
import {Button, Icon} from "native-base";
import {ViewStyle, Text, TextStyle} from "react-native";
import styles from "./LargeTransparentStyles";
import colors from "../../Themes/Colors";

export interface props {
    onPress?: () => void;
    style?: ViewStyle;
    text: string;
    iconName?: string;
    iconType?: string;
    textStyle? : TextStyle;
}
const LargeTransparentButton = ({onPress, style, text, iconName, iconType, textStyle}: props) => (
<Button transparent={true} style={[styles.btnView, style]} onPress={onPress}>
    {iconName && <Icon style={{padding: 0, fontSize: 20, color: colors.snow}} name={iconName} type={iconType}/>}
    <Text style={[styles.btnText, textStyle]}>{text}</Text>
</Button>
) ;

export default LargeTransparentButton;
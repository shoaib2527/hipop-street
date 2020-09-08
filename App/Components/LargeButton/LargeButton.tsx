import React from "react";
import {Button, Icon} from "native-base";
import {ViewStyle, Text} from "react-native";
import styles from "./LargeButtonStyles";
import colors from "../../Themes/Colors";

export interface props {
    onPress?: () => void;
    style?: ViewStyle;
    text: string;
    iconName?: string;
    iconType?: string;
    disabled?: boolean;
}
const LargeButton = ({onPress, style, text, iconName, iconType, disabled}: props) => (
<Button style={[styles.btnView, style, { backgroundColor: disabled ? colors.steel :  colors.maroon,}]} onPress={onPress} disabled={disabled}>
    {iconName && <Icon style={{padding: 0, fontSize: 25}} name={iconName} type={iconType}/>}
    <Text style={styles.btnText}>{text}</Text>
</Button>
) ;

export default LargeButton;
import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import styles from "./InputTextStyles";
import colors from "../../Themes/Colors";
import { Icon } from "native-base";

export interface Props{
    placeHolder: string;
    style?: any;
    onChangeText: (text: string) => void;
    error? : boolean;
    errorText?: string;
    isPwd? : boolean;
}
export interface State {
    showPwd: boolean;
}

class InputText  extends React.Component<Props, State> {
    public constructor(props: Props){
        super(props);
        this.state={
            showPwd: false
        }
    }
    public render(){
    return (
    <View>
    <TextInput
    style={[styles.textField, this.props.style, {borderColor: this.props.error ? colors.lightMaroon : colors.silver, borderWidth: this.props.error ? 1 : 0}]}
    placeholder={this.props.placeHolder} placeholderTextColor={colors.charcoal}
    onChangeText={this.props.onChangeText}
    secureTextEntry={!this.state.showPwd && this.props.isPwd}
    ></TextInput>
    { this.props.error && <Text style={styles.errorText}>{this.props.errorText}</Text>}
    { this.props.isPwd && 
    <TouchableOpacity style={styles.eyeView}>
        { (this.state.showPwd) ? 
            <Icon name={"eye-off"} type={"Feather"} style={styles.eye} onPress={() => this.setState({showPwd: false})}/> :
            <Icon name={"eye"} type={"Feather"} style={styles.eye} onPress={() => this.setState({showPwd: true}) }/>}
    </TouchableOpacity>
    }
    </View>);
}}

export default InputText;
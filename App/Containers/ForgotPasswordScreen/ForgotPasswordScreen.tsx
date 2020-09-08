import { NavigationScreenProps } from "react-navigation";
import React from "react";
import { connect, Dispatch } from "react-redux";
import { Container, Icon } from "native-base";
import CommonHeader from "../../Components/CommonHeader/CommonHeader";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import colors from "../../Themes/Colors";
import { LoginActions } from "../../Reducers/LoginReducers";
import { RootState } from "../../Reducers";
import InputText from "../../Components/InputText/InputText";
import LargeButton from "../../Components/LargeButton";

export interface DispatchProps {
    resetPwd: (email: string) => void
}
export interface State {
    email: string
}
export type Props = DispatchProps & NavigationScreenProps;
class ForgotPasswordScreen extends React.Component<Props, State>{

    public constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
        }
    }
    public render() {
        return (
            <Container>
                <CommonHeader title={"Reset Password"}
                    leftItem={<TouchableOpacity style={{ marginTop: 10, paddingRight: 5 }}>
                        <Icon name={"ios-arrow-back"} style={{ fontSize: 16, color: colors.lightMaroon }} onPress={() => this.props.navigation.pop()} />
                    </TouchableOpacity>}
                />
                <View style={{ padding: 40 }}>
                    {/* <Text style={{fontFamily: "serif"}} */}
                    <Text style={{}}
                    >We will send a password to your email address. Login with the new password and make sure to change it after you have logged in.</Text>
                    <InputText
                    style={{marginTop: 30}}
                        placeHolder={"Email"}
                        onChangeText={(text: string) => this.setState({ email: text })}
                        value={this.state.email}
                    ></InputText>
                    <LargeButton text={"Reset Password"} style={{marginTop: 50}}
                    disabled={this.state.email.length === 0}
                    onPress={() => this.props.resetPwd(this.state.email)}
                    ></LargeButton>
                </View>
            </Container>
        )
    }
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    resetPwd: (email) => dispatch(LoginActions.forgotPassword(email))
})

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);
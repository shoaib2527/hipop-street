import { createStackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import SignupScreen from "../Containers/SignupScreen";
import EmailLogin from "../Containers/EmailLogin/EmailLogin";
import styles from "./Styles/NavigationStyles";
import ForgotPasswordScreen from "../Containers/ForgotPasswordScreen/ForgotPasswordScreen";


const LoginNav = createStackNavigator({
    LaunchScreen: { screen: LaunchScreen },
    EmailLogin: { screen: EmailLogin },
    SignUpScreen: { screen: SignupScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
}, {
    headerMode: "none",
    initialRouteName: "EmailLogin",
    navigationOptions: {
        headerStyle: styles.header,
    },
})

export default LoginNav;
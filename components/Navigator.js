import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from "react-navigation";

import Splash from "../screens/Splash";
import Welcome from "../screens/login/Welcome";
import CreateAccount from "../screens/login/CreateAccount";
import EnterPhone from "../screens/login/EnterPhone";
import Otp from "../screens/login/Otp";
import Login from "../screens/login/Login";
import MainScreen from "../screens/MainScreens";

const Navigator = createStackNavigator({
    splash:Splash,
    welcome:Welcome,
    createAccount:CreateAccount,
    phone:EnterPhone,
    otp:Otp,
    login:Login,
    mainScreen :MainScreen,

},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: true,
  },
  defaultNavigationOptions: () => ({
    cardStyle: {
        backgroundColor: "white",
    },
}),
 });

export default createAppContainer(Navigator);
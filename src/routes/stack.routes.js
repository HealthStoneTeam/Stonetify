import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import About from "../screens/About";
import Presentation from "../screens/Presentation";
import PrivacyPolicy from "../screens/PrivacyPolicy";

const Stack = createStackNavigator();
const headerStyle = {
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#121212',
    shadowOpacity: 0,
    elevation: 0,
  }
};
export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="About" component={About} options={headerStyle} />
      <Stack.Screen name="Presentation" component={Presentation} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}
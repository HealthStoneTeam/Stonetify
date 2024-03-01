import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import About from "../screens/About";
import Presentation from "../screens/Presentation";
import PrivacyPolicy from "../screens/PrivacyPolicy";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Presentation" component={Presentation} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}

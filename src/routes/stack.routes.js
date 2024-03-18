import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import About from "../screens/About";
import Presentation from "../screens/Presentation";

const Stack = createStackNavigator();
const headerStyle = {
  headerTitle: "",
  headerTintColor: '#FFF',
  headerTitleStyle: {
    color: "#FFF",
  },
  headerTransparent: true,
  headerShadowVisible: false,
};
export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Presentation"
        component={Presentation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="About" component={About} options={headerStyle} />
    </Stack.Navigator>
  );
}

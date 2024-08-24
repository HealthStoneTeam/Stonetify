import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import About from "../screens/About";
import Share from "../screens/Share";
import Presentation from "../screens/Presentation";
import { Pages } from "../models/enums/pages";

const Stack = createStackNavigator();
const headerStyle = {
  headerTitle: "",
  headerTintColor: "#FFF",
  headerTransparent: true,
  headerShadowVisible: false,
};
export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Pages.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Pages.PRESENTATION}
        component={Presentation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Pages.SHARE}
        component={Share}
        options={headerStyle}
      />
      <Stack.Screen
        name={Pages.ABOUT}
        component={About}
        options={headerStyle}
      />
    </Stack.Navigator>
  );
}

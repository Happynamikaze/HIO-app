import * as React from "react";

// Screens
import Login from "../screens/Login";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Type
import RightDrawer from "./RightDrawer";
import BottomTabs from "./BottomTabs";
import Verify from "../screens/Verify";
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";


import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderEffect from "../components/InitLoaderEffect";
import Register from "../screens/Register";
import ReminderScreen from "../screens/ReminderScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: '#FFF'
          },
          headerShown: false
        }}
        initialRouteName={'loader'}
        // initialRouteName={'main'}
      >
        
        <Stack.Screen name="loader" component={LoaderEffect} />
        <Stack.Screen name="main" component={RightDrawer} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="verifyPage" component={Verify} />
        <Stack.Screen name="register" component={Register} />
        
         <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

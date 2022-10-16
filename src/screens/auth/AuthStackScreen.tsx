import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import React from "react";

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
  const options = { headerShown: false };
  return (<AuthStack.Navigator initialRouteName="SignInScreen">
    <AuthStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={options}
    />
    <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={options}
    />
    </AuthStack.Navigator>
    );
};

export default AuthStackScreen;

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: "20%",
  },
  textInput: {
    marginVertical: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    padding: 15,
  },
  screenSwitchButton: {
    marginTop: 20,
  },
});
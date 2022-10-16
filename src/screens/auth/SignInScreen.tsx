import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, TextInput, View } from "react-native";
import { AuthStackParamList, authStyles } from "./AuthStackScreen";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils";
import ErrorModal from "./ErrorModal";
import React from "react";

type Props = NativeStackScreenProps<AuthStackParamList, "SignInScreen">;

const SignInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignInWithEmail, setLoadingSignInWithEmail] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const signInWithEmail = async () => {
    if (!email && !password) {
      setModalMessage("Email and password missing");
      setShowModal(true);
      return;
    } else if (!email) {
      setModalMessage("Email missing");
      setShowModal(true);
      return;
    } else if (!password) {
      setModalMessage("Password missing");
      setShowModal(true);
      return;
    }
    setLoadingSignInWithEmail(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoadingSignInWithEmail(false);
    } catch (error: any) {
      setModalMessage(error.toString());
      setShowModal(true);
      setLoadingSignInWithEmail(false);
    }
  };
  const resetPassword = async () => {
    if (!email) {
      setModalMessage("Email is missing");
      setShowModal(true);
      return;
    }
    setLoadingResetPassword(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setLoadingResetPassword(false);
    } catch (error: any) {
      setModalMessage(error.toString());
      setShowModal(true);
      setLoadingResetPassword(false);
    }
  };
  return (
    <View style={authStyles.container}>
      <ErrorModal
        modalMessage={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <TextInput
        placeholder="Email"
        value={email}
        autoComplete="off"
        onChangeText={setEmail}
        style={authStyles.textInput}
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        autoComplete="off"
        onChangeText={setPassword}
        style={authStyles.textInput}
        autoCapitalize="none"
        textContentType="password"
      />
      <Button
        title="Sign In With Email"
        onPress={signInWithEmail}
        disabled={loadingSignInWithEmail}
      />
      <Button
        title="Reset Password"
        onPress={resetPassword}
        disabled={loadingResetPassword}
      />
      <View style={authStyles.screenSwitchButton}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
      </View>
    </View>
  );
};

export default SignInScreen;
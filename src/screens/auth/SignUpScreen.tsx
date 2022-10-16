import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { auth } from "../../../utils";
import ErrorModal from "./ErrorModal";
import { AuthStackParamList, authStyles } from "./AuthStackScreen";

type Props = NativeStackScreenProps<AuthStackParamList, "SignUpScreen">;

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignUpWithEmail, setLoadingSignUpWithEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const signUpWithEmail = async () => {
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
    setLoadingSignUpWithEmail(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoadingSignUpWithEmail(false);
    } catch (error: any) {
      setModalMessage(error.toString());
      setShowModal(true);
      setLoadingSignUpWithEmail(false);
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
        title="Sign Up With Email"
        onPress={signUpWithEmail}
        disabled={loadingSignUpWithEmail}
      />
      <View style={authStyles.screenSwitchButton}>
        <Button
          title="Sign In Instead"
          onPress={() => navigation.navigate("SignInScreen")}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
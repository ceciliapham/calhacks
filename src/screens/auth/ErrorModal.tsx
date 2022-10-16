import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

type ErrorModalProps = {
  modalMessage: string;
  showModal: boolean;
  setShowModal: (val: boolean) => void;
};

const ErrorModal = ({
  modalMessage,
  showModal,
  setShowModal,
}: ErrorModalProps) => {
  // can also log error message to console here
  // console.error(modalMessage);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
});
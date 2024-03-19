import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";
import I18n from "../../../translations";

export default function Logout({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const { logout } = useContext(AuthContext);

  async function onLogout() {
    try {
      await logout();
      onClose();
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(I18n.t("error"), I18n.t("logoutError"));
    }
  }

  return (
    <>
      <Icon
        as={MaterialCommunityIcons}
        name="logout"
        size={10}
        color={"blue.400"}
        onPress={() => setIsOpen(!isOpen)}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={isOpen}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{I18n.t("leaveConfirmation")}</Text>
            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.confirmButton }}
                onPress={onLogout}
              >
                <Text style={styles.textStyle}>{I18n.t("confirm")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.cancelButton }}
                onPress={onClose}
              >
                <Text style={styles.textStyle}>{I18n.t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

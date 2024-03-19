import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";

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
      console.log("Alguma coisa no logout deu ruim");
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
            <Text style={styles.modalText}>
              Are you sure that you want to leave?
            </Text>
            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.confirmButton }}
                onPress={onLogout}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.cancelButton }}
                onPress={onClose}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

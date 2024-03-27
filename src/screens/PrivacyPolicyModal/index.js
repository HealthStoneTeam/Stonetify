import React from "react";
import { Text, View, TouchableOpacity, Modal, Linking } from "react-native";
import { useToast } from "native-base";
import styles from "./styles";
import I18n from "../../../translations";

export default function PrivacyPolicyModal({ modalVisible, setModalVisible }) {
  const toast = useToast();
  const toastId = "alert-toast";

  async function redirectToUrl() {
    const url = "https://support.spotify.com/us/article/spotify-on-other-apps/";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("redirectError"),
        });
      }
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{I18n.t("privacyPolicyTitle")}</Text>
          <Text style={styles.modalText}>{I18n.t("privacyPolicyText1")}</Text>
          <Text style={styles.modalText}>{I18n.t("privacyPolicyText2")}</Text>
          <Text style={styles.modalText}>{I18n.t("privacyPolicyText3")}</Text>
          <Text style={styles.modalText}>
            <Text style={styles.linkText} onPress={redirectToUrl}>
              {I18n.t("detailedGuide")}
            </Text>
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeButtonText}>{I18n.t("close")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

import React from "react";
import { Text, View, TouchableOpacity, Modal, Linking } from "react-native";
import { useToast } from "native-base";
import styles from "./styles";
import I18n from "../../../translations";
import { GenericDataProps } from "../../models/types/genericData";
import { PrivacyPolicyModalProps } from "../../models/types/privacyPolicyModal";
import { Toast } from "../../models/enums/toast";

export default function PrivacyPolicyModal({
  data,
}: GenericDataProps<PrivacyPolicyModalProps>) {
  const toast = useToast();
  const toastId = Toast.ID;

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
      visible={data.modalVisible}
      onRequestClose={() => {
        data.setModalVisible(!data.modalVisible);
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
            onPress={() => data.setModalVisible(!data.modalVisible)}
          >
            <Text style={styles.closeButtonText}>{I18n.t("close")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

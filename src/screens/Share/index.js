import React, { useState, useRef } from "react";
import { Text, View, Image, ScrollView, Alert, StatusBar } from "react-native";
import styles from "./styles";
import I18n from "../../../translations";
import ItemsList from "../../components/itemsList";
import { captureRef } from "react-native-view-shot";
import { useToast, Icon } from "native-base";
import * as Sharing from "expo-sharing";
import { MaterialIcons } from "@expo/vector-icons";

export default function Share({ route, navigation }) {
  const [isSharing, setIsSharing] = useState(false);
  const toast = useToast();
  const toastId = "alert-toast";
  const shareBodyRef = useRef();
  const { data, profileData, type, range } = route.params;

  async function shareImage() {
    if (isSharing) {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("shareInProgress"),
        });
      }
      return;
    }

    setIsSharing(true);
    try {
      const uri = await captureRef(shareBodyRef.current, {
        format: "png",
        quality: 1,
      });
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(I18n.t("error"), I18n.t("shareNotAvailable"));
      } else {
        await Sharing.shareAsync(uri);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(I18n.t("error"), I18n.t("shareError"));
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingTop: StatusBar.currentHeight + 5 }}
        style={[styles.container, styles.mainBg]}
      >
        <Icon
          style={styles.shareButton}
          as={MaterialIcons}
          name="share"
          size={10}
          color={"#fff"}
          onPress={shareImage}
        />
        <ScrollView ref={shareBodyRef} style={[styles.mainBg]}>
          <View style={styles.titleList}>
            <Text style={styles.textTitleList}>
               {I18n.t('shareTitle', { username: profileData?.username, type: type?.value })}
            </Text>
            <Text style={styles.textTitleList}>{range?.value}</Text>
          </View>

          <ItemsList data={data} showSpotify={false} />
          <View style={styles.containerSpotify}>
            <Image
              style={styles.logoSpotify}
              source={require("../../../assets/spotifyLogo.png")}
              alt="Spotify"
            />
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}

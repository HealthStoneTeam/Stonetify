import React, { useState, useRef } from "react";
import { Text, View, ScrollView, Alert, StatusBar, Image } from "react-native";
import Profile from "../../components/profile";
import styles from "./styles";
import I18n from "../../../translations";
import ItemsList from "../../components/itemsList";
import { captureRef } from "react-native-view-shot";
import { useToast, Icon } from "native-base";
import * as Sharing from "expo-sharing";
import { MaterialIcons } from "@expo/vector-icons";
import { ShareProps } from "../../models/types/share";
import { NavigationProps } from "../../models/types/navigation";
import TitleList from "../../components/titleList";
import FooterList from "../../components/footerList";
import FilterModes from "../../components/filterModes";
import { Filters } from "../../models/enums/filters";
import { Toast } from "../../models/enums/toast";

export default function Share({
  route,
  navigation,
}: ShareProps & NavigationProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [mode, setMode] = useState(Filters.NORMAL_MODE);
  const toast = useToast();
  const toastId = Toast.ID;
  const shareBodyRef = useRef(null);
  const { items, profileData, type, range } = route.params;

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
      if (shareBodyRef.current) {
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
      }
    } catch (error) {
      Alert.alert(I18n.t("error"), I18n.t("shareError"));
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingTop: (StatusBar?.currentHeight ?? 0) + 5,
        }}
        style={[styles.container, styles.mainBg]}
      >
        <Icon
            style={{ marginTop: 4, alignSelf: "flex-end"}}
            as={MaterialIcons}
            name="share"
            size={10}
            color={"#fff"}
            onPress={shareImage}
          />
        <View style={styles.headerContainer}>
          <View>
            <FilterModes
              data={{
                setMode,
                selected:{ value: mode, label: I18n.t('normalMode') },
              }}
            />
          </View>
        </View>
        <ScrollView ref={shareBodyRef} style={[styles.mainBg]}>
          <View style={styles.titleList}>
            <TitleList
              data={{
                type: type?.label,
                username: profileData?.username,
              }}
            ></TitleList>
            <Text style={styles.textTitleList}>{range?.label}</Text>
          </View>
          <View style={styles.appIconContainer}>
            <Image
              style={styles.appIcon}
              source={require("../../../assets/icon.png")}
              alt="App Icon"
            />
            <Text style={styles.appName}>Stonetify</Text>
          </View>
          <ItemsList
            data={{
              items: items,
              showSpotify: false,
              mode: mode,
            }}
          />
          <FooterList />
        </ScrollView>
      </ScrollView>
    </>
  );
}

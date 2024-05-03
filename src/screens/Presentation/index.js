import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useToast, Icon } from "native-base";
import * as Sharing from "expo-sharing";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import Profile from "../../components/profile";
import Dropdown from "../../components/dropdown";
import ItemsList from "../../components/itemsList";
import Logout from "../../components/logout";
import { getProfile, getTopItems } from "../../domains/user";
import { AuthContext } from "../../contexts/auth";
import Loading from "../../components/loading";
import I18n from "../../../translations";
import { captureRef } from "react-native-view-shot"; // biblioteca para capturar a imagem da tela

export default function Presentation({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const toast = useToast();
  const toastId = "alert-toast";
  const shareBodyRef = useRef(); // Referência para o componente que queremos capturar

  const metricOptions = [
    {
      keyValue: "tracks",
      value: I18n.t("topTracks"),
    },
    {
      keyValue: "artists",
      value: I18n.t("topArtist"),
    },
  ];

  const periodOptions = [
    {
      keyValue: "short_term",
      value: I18n.t("lastMonth"),
    },
    {
      keyValue: "medium_term",
      value: I18n.t("last6Months"),
    },
    {
      keyValue: "long_term",
      value: I18n.t("allTime"),
    },
  ];

  const [type, setType] = useState(null);
  const [range, setRange] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getProfileData() {
      try {
        setLoading(true);
        const response = await getProfile(getAccessToken);
        setLoading(false);
        setProfileData(response);
      } catch (error) {
        setLoading(false);
        Alert.alert(I18n.t("error"), I18n.t("validationError"));
      }
    }

    getProfileData();
  }, []);

  async function getItems() {
    try {
      if (type && range) {
        setLoading(true);
        setData(null);
        const defaultData = {
          limit: 10,
          offset: 0,
        };

        const filterData = {
          ...defaultData,
          ...{ type: type?.keyValue, range: range?.keyValue },
        };

        const response = await getTopItems(getAccessToken, filterData);
        setLoading(false);

        setData(response);
      } else {
        if (!toast.isActive(toastId)) {
          toast.show({
            id: toastId,
            description: I18n.t("incompleteRequest"),
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(I18n.t("error"), I18n.t("validationError"));
    }
  }

  async function shareImage() {
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
    } catch (error) {
      console.log(error);
      Alert.alert(I18n.t("error"), I18n.t("shareError"));
    }
  }

  return (
    <>
      <Loading isLoading={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: StatusBar.currentHeight + 5 }}
        style={[styles.container, styles.mainBg]}
      >
        <View style={styles.header}>
          <Profile data={profileData} />
          <Logout navigation={navigation} />
        </View>
        <View style={styles.filterSection}>
          <Dropdown
            options={metricOptions}
            onSelect={(option) => setType(option)}
          />
          <Dropdown
            options={periodOptions}
            onSelect={(option) => setRange(option)}
          />
          <TouchableOpacity onPress={getItems} style={styles.searchButton}>
            <Text style={styles.textSearchButton}>{I18n.t("search")}</Text>
          </TouchableOpacity>
        </View>
        {data && (
          <ScrollView ref={shareBodyRef} style={[styles.mainBg]}>
            <View style={styles.titleList}>
              <Text style={styles.textTitleList}>
                {profileData?.username}: {type?.value}
              </Text>
            </View>
            <View style={styles.containerLogoSpotify}>
              <Image
                style={styles.logoSpotify}
                source={require("../../../assets/spotifyLogo.png")}
                alt="Spotify"
              />
              <Icon
                as={MaterialIcons}
                name="share"
                size={10}
                color={"#FFF"}
                onPress={shareImage}
              />
            </View>
            <ItemsList data={data} />
          </ScrollView>
        )}
      </ScrollView>
    </>
  );
}

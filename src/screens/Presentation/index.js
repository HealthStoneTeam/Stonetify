import React, { useEffect, useState, useContext } from "react";
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
import { ErrorAuthenticating, ErrorGetting } from "../../errors";

export default function Presentation({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const toast = useToast();
  const toastId = "alert-toast";

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
        setProfileData(response);
      } catch (error) {
        if (error instanceof ErrorAuthenticating) {
          Alert.alert(I18n.t("error"), error.message);
        } else {
          Alert.alert(I18n.t("error"), I18n.t("validationError"));
        }
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }

    getProfileData();
  }, []);

  async function getItems(options) {
    try {
      setType(options.type);
      setRange(options.range);
      
      if (options.type && options.range) {
        setLoading(true);
        setData(null);
        const defaultData = {
          limit: 10,
          offset: 0,
        };

        const filterData = {
          ...defaultData,
          ...{ type: options.type?.keyValue, range: options.range?.keyValue },
        };

        const response = await getTopItems(getAccessToken, filterData);
        setLoading(false);

        setData(response);
      }
    } catch (error) {
      if (error instanceof ErrorAuthenticating) {
        Alert.alert(I18n.t("error"), error.message);
        navigation.goBack();
      } else if (error instanceof ErrorGetting) {
        Alert.alert(I18n.t("error"), error.message);
      } else {
        Alert.alert(I18n.t("error"), I18n.t("validationError"));
      }
    } finally {
      setLoading(false);
    }
  }

  async function goPreviewShareImage() {
    if (data?.data?.length) {
      navigation.navigate("Share", { data, profileData, type, range });
    } else {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("noDataToShare"),
        });
      }
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
            onSelect={(option) => getItems({type: option, range})}
          />
          <Dropdown
            options={periodOptions}
            onSelect={(option) => getItems({range: option, type})}
          />
        </View>
        {data && (
          <>
            <View style={styles.titleList}>
              <Text style={styles.textTitleList}>
               {I18n.t('shareTitle', { username: profileData?.username, type: type?.value })}
              </Text>
            </View>
            <View style={styles.containerLogoSpotify}>
              <Image
                style={styles.logoSpotify}
                source={require("../../../assets/spotifyLogo.png")}
                alt="Spotify"
              />
              <TouchableOpacity
                style={styles.shareButton}
                onPress={goPreviewShareImage}
              >
                <Icon
                  as={MaterialIcons}
                  name="mobile-screen-share"
                  size={7}
                  color={"#FFFFFF"}
                />
                <Text style={styles.shareButtonText}> {I18n.t("share")}</Text>
              </TouchableOpacity>
            </View>
            <ItemsList data={data} showSpotify={true} />
          </>
        )}
      </ScrollView>
    </>
  );
}

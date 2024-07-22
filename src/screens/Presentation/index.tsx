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
import { ProfileProps } from "../../models/types/profile";
import { DropdownItemProps, FilterOptions } from "../../models/types/dropdown";
import { NavigationProps } from "../../models/types/navigation";
import { Items } from "../../models/types/items";

export default function Presentation({ navigation }: NavigationProps) {
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

  const [type, setType] = useState<DropdownItemProps>({} as DropdownItemProps);
  const [range, setRange] = useState<DropdownItemProps>({} as DropdownItemProps);
  const [profileData, setProfileData] = useState<ProfileProps>({} as ProfileProps);
  const [itemsData, setItemsData] = useState<Items[]>();

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

  async function getItems(options: FilterOptions) {
    try {
      setType(options.type);
      setRange(options.range);

      if (options.type?.keyValue && options.range?.keyValue) {
        setLoading(true);
        setItemsData([]);
        const defaultData = {
          limit: 10,
          offset: 0,
        };

        const filterData = {
          ...defaultData,
          ...{ type: options.type?.keyValue, range: options.range?.keyValue },
        };

        const response = await getTopItems({ getAccessToken, filterData });
        setLoading(false);
        setItemsData(response.data);
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
    if (itemsData?.length) {
      navigation.navigate("Share", { items: itemsData, profileData, type, range });
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
      <Loading data={{
        isLoading: loading
      }} />
      <ScrollView
        contentContainerStyle={{ paddingTop: (StatusBar.currentHeight ?? 0) + 5 }}
        style={[styles.container, styles.mainBg]}
      >
        <View style={styles.header}>
          <Profile data={profileData} />
          <Logout navigation={navigation}/>
        </View>
        <View style={styles.filterSection}>
          <Dropdown
            data={{
              options: metricOptions,
              onSelect: (option: DropdownItemProps) => getItems({ type: option, range }),
            }}
          />
          <Dropdown
            data={{
              options: periodOptions,
              onSelect: (option: DropdownItemProps) => getItems({ range: option, type }),
            }}
          />
        </View>
        {itemsData && (
          <>
            <View style={styles.titleList}>
              <Text style={styles.textTitleList}>
                {I18n.t("shareTitle", {
                  username: profileData?.username,
                  type: type?.value,
                })}
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
            <ItemsList data={{
              items: itemsData,
              showSpotify: true
            }} />
          </>
        )}
      </ScrollView>
    </>
  );
}

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
import ItemsList from "../../components/itemsList";
import { getProfile, getTopItems } from "../../domains/user";
import { AuthContext } from "../../contexts/auth";
import Loading from "../../components/loading";
import I18n from "../../../translations";
import { ErrorAuthenticating, ErrorGetting } from "../../errors";
import { ProfileProps } from "../../models/types/profile";
import { DropdownItemProps } from "../../models/types/dropdown";
import { NavigationProps } from "../../models/types/navigation";
import { Items } from "../../models/types/items";
import TitleList from "../../components/titleList";
import FooterList from "../../components/footerList";
import Header from "../../components/header";
import Filter from "../../components/filter";
import { Pages } from "../../models/enums/pages";
import { Toast } from "../../models/enums/toast";
import { Filters } from "../../models/enums/filters";
import { TopItemsLimit } from "../../models/types/filter";
import { ShareLimit } from "../../models/types/share";
import { widthPercentageToDP } from "../../utils";

const wp = widthPercentageToDP;

function getDefaultType(): DropdownItemProps {
  return {
    value: Filters.TRACKS,
    label: I18n.t("topTracks"),
  };
}

function getDefaultRange(): DropdownItemProps {
  return {
    value: Filters.LAST_SIX_MONTHS,
    label: I18n.t("last6Months"),
  };
}

function getShareLimit(limit: TopItemsLimit): ShareLimit {
  return limit === 5 || limit === 10 ? limit : 20;
}

export default function Presentation({ navigation }: NavigationProps) {
  const defaultType = getDefaultType();
  const defaultRange = getDefaultRange();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<DropdownItemProps>(defaultType);
  const [range, setRange] = useState<DropdownItemProps>(defaultRange);
  const [limit, setLimit] = useState<TopItemsLimit>(20);
  const [profileData, setProfileData] = useState<ProfileProps>(
    {} as ProfileProps
  );
  const [itemsData, setItemsData] = useState<Items[]>();
  const { getAccessToken } = useContext(AuthContext);
  const toast = useToast();
  const toastId = Toast.ID;

  useEffect(() => {
    async function getInitialData() {
      try {
        setLoading(true);
        const profile = await getProfile(getAccessToken);
        setProfileData(profile);
        const response = await fetchItems(defaultType.value, defaultRange.value, 20);
        setItemsData(response);
      } catch (error) {
        if (error instanceof ErrorAuthenticating) {
          Alert.alert(I18n.t("error"), error.message);
          navigation.goBack();
        } else {
          Alert.alert(I18n.t("error"), I18n.t("validationError"));
        }
      } finally {
        setLoading(false);
      }
    }

    getInitialData();
  }, []);

  async function fetchItems(
    typeValue: string,
    rangeValue: string,
    limitValue: TopItemsLimit
  ) {
    const filterData = {
      limit: limitValue,
      offset: 0,
      type: typeValue,
      range: rangeValue,
    };

    const response = await getTopItems({ getAccessToken, filterData });
    return response.data;
  }

  function handleFetchError(error: unknown) {
    if (error instanceof ErrorAuthenticating) {
      Alert.alert(I18n.t("error"), error.message);
      navigation.goBack();
    } else if (error instanceof ErrorGetting) {
      Alert.alert(I18n.t("error"), error.message);
    } else {
      Alert.alert(I18n.t("error"), I18n.t("fetchError"));
    }
  }

  async function loadItems(
    nextType: DropdownItemProps,
    nextRange: DropdownItemProps,
    nextLimit: TopItemsLimit
  ) {
    try {
      setLoading(true);
      setItemsData([]);
      const response = await fetchItems(
        nextType.value,
        nextRange.value,
        nextLimit
      );
      setType(nextType);
      setRange(nextRange);
      setLimit(nextLimit);
      setItemsData(response);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleTypeSelect(option: DropdownItemProps) {
    loadItems(option, range, limit);
  }

  function handleRangeSelect(option: DropdownItemProps) {
    loadItems(type, option, limit);
  }

  function handleLimitSelect(nextLimit: TopItemsLimit) {
    loadItems(type, range, nextLimit);
  }

  async function goPreviewShareImage() {
    if (itemsData?.length) {
      const shareLimit = getShareLimit(limit);
      const shareItems = limit === 50 ? itemsData.slice(0, 20) : itemsData;

      navigation.navigate(Pages.SHARE, {
        items: shareItems,
        profileData,
        type,
        range,
        customization: {
          template: "list",
          theme: "classic",
          limit: shareLimit,
          showImages: true,
        },
      });
    } else {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("noDataToShare"),
        });
      }
    }
  }

  async function goFestivalShareImage() {
    if (!range?.value) {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("incompleteRequest"),
        });
      }
      return;
    }

    try {
      setLoading(true);
      const artistType = {
        value: Filters.ARTISTS,
        label: I18n.t("topArtist"),
      };
      const response = await fetchItems(artistType.value, range.value, 20);

      if (response?.length) {
        setType(artistType);
        setLimit(20);
        setItemsData(response);
        navigation.navigate(Pages.SHARE, {
          items: response,
          profileData,
          type: artistType,
          range,
          customization: {
            template: "festival",
            theme: "classic",
            limit: 20,
            showImages: true,
          },
        });
      } else if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("noDataToShare"),
        });
      }
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Loading
        data={{
          isLoading: loading,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: (StatusBar.currentHeight ?? 0) + 5,
          paddingBottom: 28,
        }}
        style={[styles.container, styles.mainBg]}
      >
        <Header
          data={{
            navigation: navigation,
            profileData: profileData,
          }}
        />
        <Filter
          data={{
            type,
            range,
            limit,
            onTypeSelect: handleTypeSelect,
            onRangeSelect: handleRangeSelect,
            onLimitSelect: handleLimitSelect,
          }}
        />
        {itemsData && (
          <>
            <View style={styles.titleList}>
              <TitleList
                data={{
                  type: type?.label,
                  username: profileData?.username,
                }}
              />
              <Text style={styles.rangeSummary}>
                {range?.label} -{" "}
                {I18n.t("topItemsCount", { count: limit })}
              </Text>
            </View>
            <View style={styles.headerContent}>
              <View style={styles.appIconContainer}>
                <Image
                  style={styles.appIcon}
                  source={require("../../../assets/stonetifyNewLogo.png")}
                  alt="App Icon"
                />
                <Text style={styles.appName}>Stonetify</Text>
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={goPreviewShareImage}
              >
                <Icon
                  as={MaterialIcons}
                  name="mobile-screen-share"
                  size={wp("6%")}
                  color={"#FFFFFF"}
                />
                <Text
                  style={styles.shareButtonText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {I18n.t("share")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.festivalActionButton]}
                onPress={goFestivalShareImage}
              >
                <Icon
                  as={MaterialIcons}
                  name="confirmation-number"
                  size={wp("6%")}
                  color={"#FFFFFF"}
                />
                <Text
                  style={styles.shareButtonText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {I18n.t("festival")}
                </Text>
              </TouchableOpacity>
            </View>
            {limit === 50 && (
              <Text style={styles.shareHint}>{I18n.t("top50ShareHint")}</Text>
            )}
            <View style={styles.listCard}>
              <ItemsList
                data={{
                  items: itemsData,
                  type: type.value,
                  showSpotify: true,
                  mode: Filters.NORMAL_MODE,
                }}
              />
            </View>
            <FooterList />
          </>
        )}
      </ScrollView>
    </>
  );
}

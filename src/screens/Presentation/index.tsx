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
import { DropdownItemProps, FilterOptions } from "../../models/types/dropdown";
import { NavigationProps } from "../../models/types/navigation";
import { Items } from "../../models/types/items";
import TitleList from "../../components/titleList";
import FooterList from "../../components/footerList";
import Header from "../../components/header";
import Filter from "../../components/filter";
import { Pages } from "../../models/enums/pages";
import { Toast } from "../../models/enums/toast";
import { Filters } from "../../models/enums/filters";

export default function Presentation({ navigation }: NavigationProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<DropdownItemProps>({} as DropdownItemProps);
  const [range, setRange] = useState<DropdownItemProps>(
    {} as DropdownItemProps
  );
  const [profileData, setProfileData] = useState<ProfileProps>(
    {} as ProfileProps
  );
  const [itemsData, setItemsData] = useState<Items[]>();
  const { getAccessToken } = useContext(AuthContext);
  const toast = useToast();
  const toastId = Toast.ID;

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

      if (options.type?.value && options.range?.value) {
        setLoading(true);
        setItemsData([]);
        const defaultData = {
          limit: 10,
          offset: 0,
        };

        const filterData = {
          ...defaultData,
          ...{ type: options.type?.value, range: options.range?.value },
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
      navigation.navigate(Pages.SHARE, {
        items: itemsData,
        profileData,
        type,
        range,
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
            getItems: getItems,
            range,
            type,
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
              ></TitleList>
            </View>
            <View style={styles.headerContent}>
              <View style={styles.appIconContainer}>
                <Image
                  style={styles.appIcon}
                  source={require("../../../assets/icon.png")}
                  alt="App Icon"
                />
                <Text style={styles.appName}>Stonetify</Text>
              </View>
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
            <ItemsList
              data={{
                items: itemsData,
                type: type.value,
                showSpotify: true,
                mode: Filters.NORMAL_MODE,
              }}
            />
            <FooterList />
          </>
        )}
      </ScrollView>
    </>
  );
}

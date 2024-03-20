import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableOpacity, StatusBar, Alert, ScrollView } from "react-native";
import styles from "./styles";
import Profile from "../../components/profile";
import Dropdown from "../../components/dropdown";
import ItemsList from "../../components/itemsList";
import Logout from "../../components/logout";
import { getProfile, getTopItems } from "../../domains/user";
import { AuthContext } from "../../contexts/auth";
import Loading from "../../components/loading";
import I18n from "../../../translations";

export default function Presentation({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);

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

  const [type, setType] = useState(metricOptions[0]);
  const [range, setRange] = useState(periodOptions[0]);
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
    } catch (error) {
      setLoading(false);
      Alert.alert(I18n.t("error"), I18n.t("validationError"));
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: StatusBar.currentHeight + 15 }}
      style={[
        styles.container,
        { paddingTop: StatusBar.currentHeight + 15 },
      ]}
    >
      <Loading isLoading={loading} />
      <View style={styles.header}>
        <Profile data={profileData} />
        <Logout navigation={navigation} />
      </View>
      <View style={styles.filterSection}>
        <Dropdown
          options={metricOptions}
          selected={metricOptions[0]}
          onSelect={(option) => setType(option)}
        />
        <Dropdown
          options={periodOptions}
          selected={periodOptions[0]}
          onSelect={(option) => setRange(option)}
        />
        <TouchableOpacity onPress={getItems} style={styles.searchButton}>
          <Text style={styles.textSearchButton}>{I18n.t("search")}</Text>
        </TouchableOpacity>
      </View>
      {data && (
        <>
          <View style={styles.titleList}>
            <Text style={styles.textTitleList}>
              {profileData?.username} {type?.value}
            </Text>
          </View>
          <ItemsList data={data} />
        </>
      )}
    </ScrollView>
  );
}

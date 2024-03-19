import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import styles from "./styles";
import Profile from "../../components/profile";
import Dropdown from "../../components/dropdown";
import ItemsList from "../../components/itemsList";
import Logout from "../../components/logout";
import { getProfile, getTopItems } from "../../domains/user";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Presentation({ navigation }) {
  const { getAccessToken } = useContext(AuthContext);

  const metricOptions = [
    {
      keyValue: "tracks",
      value: "Top Tracks",
    },
    {
      keyValue: "artists",
      value: "Top Artist",
    },
  ];

  const periodOptions = [
    {
      keyValue: "short_term",
      value: "Last Month",
    },
    {
      keyValue: "medium_term",
      value: "Last 6 Months",
    },
    {
      keyValue: "long_term",
      value: "All Time",
    },
  ];

  const [type, setType] = useState(metricOptions[0]);
  const [range, setRange] = useState(periodOptions[0]);
  const [profileData, setProfileData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getProfileData() {
      try {
        const response = await getProfile(getAccessToken);
        setProfileData(response);
      } catch (error) {
        setLoading(false);
      }
    }

    getProfileData();
  }, []);

  async function getItems() {
    try {
      const defaultData = {
        limit: 10,
        offset: 0,
      };

      const filterData = {
        ...defaultData,
        ...{ type: type?.keyValue, range: range?.keyValue },
      };

      const response = await getTopItems(getAccessToken, filterData);

      setData(response);
    } catch (error) {
      console.log("Erro ao buscar as informações");
    }
  }

  return (
    <View
      style={[styles.container, { paddingTop: StatusBar.currentHeight + 15 }]}
    >
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
          <Text style={styles.textSearchButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {data && (
        <View style={styles.titleList}>
          <Text style={styles.textTitleList}>
            {profileData?.username} {type?.value}
          </Text>
        </View>
      )}
      <ItemsList data={data} />
    </View>
  );
}

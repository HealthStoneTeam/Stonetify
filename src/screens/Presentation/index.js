import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
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

  const metricOptions = ["Top Tracks", "Top Artist"];
  const periodOptions = ["Last Month", "Last 6 Months", "All Time"];
  const profileData = {
    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    username: "Matlops027",
  };
  const musicData = [
    {
      id: 1,
      title: "Song Title 1",
      artist: "Artist 1",
      time: "5:55",
      albumCover:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      title: "Song Title 2",
      artist: "Artist 2",
      time: "5:55",
      albumCover:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];
  const filterData = {
    type: "artists",
    range: "short_term",
    limit: 10,
    offset: 0,
  };

  return (
    <View
      style={[styles.container, { paddingTop: StatusBar.currentHeight + 15 }]}
    >
      <View style={styles.header}>
        <Profile data={profileData} />
        <Logout navigation={navigation} />
      </View>
      <View style={styles.filterSection}>
        <Dropdown options={metricOptions} onSelect={() => {}} />
        <Dropdown options={periodOptions} onSelect={() => {}} />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.textSearchButton}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleList}>
        <Text style={styles.textTitleList}>
          {profileData.username} Top Tracks
        </Text>
      </View>
      <ItemsList data={musicData} />

      <Pressable
        onPress={async () => {
          await getProfile(getAccessToken);
        }}
        style={{
          backgroundColor: "#1DB954",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <Text>Perfilzim?</Text>
      </Pressable>

      <Pressable
        onPress={async () => {
          await getTopItems(getAccessToken, filterData);
        }}
        style={{
          backgroundColor: "#1DB954",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <Text>Topzim?</Text>
      </Pressable>
    </View>
  );
}

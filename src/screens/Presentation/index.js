import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../../components/profile";
import Dropdown from "../../components/dropdown";
import ItemsList from "../../components/ItemsList";

export default function Presentation() {
  const metricOptions = ["Top Tracks", "Top Artist", "Top Genres", "Stats"];
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile data={profileData} />
        <Icon
          as={MaterialCommunityIcons}
          name="logout"
          size={10}
          color={"blue.400"}
        />
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
    </View>
  );
}

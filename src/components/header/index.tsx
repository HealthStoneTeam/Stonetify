import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Profile from "../profile";
import Logout from "../logout";
import { NavigationProps } from "../../models/types/navigation";
import { GenericDataProps } from "../../models/types/genericData";
import { HeaderProps } from "../../models/types/header";

export default function Header({
  data,
}: GenericDataProps<HeaderProps & NavigationProps>) {
  return (
    <View style={styles.header}>
      <Profile data={data.profileData} />
      <Logout navigation={data.navigation} />
    </View>
  );
}

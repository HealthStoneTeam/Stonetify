import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "native-base";
import styles from "./styles";
import { GenericDataProps } from "../../models/types/genericData";
import { ProfileProps } from "../../models/types/profile";

export default function AvatarProfile({ data }: GenericDataProps<ProfileProps>) {
  function getInitials(name: string) {
    if (!name) return "";

    const initials = name.charAt(0).toUpperCase();

    return initials;
  }


  if (data.userImage) {
    return (
      <Avatar
        size="md"
        source={{
          uri: data.userImage,
        }}
      />
    );
  } else {
    const initials = getInitials(data.username);

    return (
      <Avatar
        size="md"
        children={
          <View style={[styles.avatarContainer]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        }
      />
    );
  }
}

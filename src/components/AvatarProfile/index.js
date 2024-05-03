import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "native-base";
import styles from "./styles";

export default function AvatarProfile({ name, photoUrl }) {
  function getInitials(name) {
    if (!name) return "";

    const initials = name.charAt(0).toUpperCase();

    return initials;
  }


  if (photoUrl) {
    return (
      <Avatar
        size="md"
        source={{
          uri: photoUrl,
        }}
      />
    );
  } else {
    const initials = getInitials(name);

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

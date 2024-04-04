import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "native-base";

export default function AvatarProfile({ name, photoUrl }) {
  function getInitials(name) {
    if (!name) return "";

    const initials = name.charAt(0).toUpperCase();

    return initials;
  }

  function getColor() {
    return "#FFC107";
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
    const backgroundColor = getColor();

    return (
      <Avatar
        size="md"
        children={
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24 }}>{initials}</Text>
          </View>
        }
      />
    );
  }
}

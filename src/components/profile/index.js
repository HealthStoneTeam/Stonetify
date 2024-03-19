import { Text, View } from "react-native";
import { Avatar } from "native-base";
import styles from "./styles";

export default function Profile({ data }) {
  return (
    <View style={styles.avatar}>
      <Avatar
        size="md"
        source={{
          uri: data?.userImage,
        }}
      />
      <Text style={styles.username}>{data?.username}</Text>
    </View>
  );
}

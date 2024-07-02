import { Text, View } from "react-native";
import AvatarProfile from "../avatarProfile";
import styles from "./styles";

export default function Profile({ data }) {
  return (
    <View style={styles.avatar}>
      <AvatarProfile photoUrl={data?.userImage} name={data?.username} />
      <Text style={styles.username}>{data?.username}</Text>
    </View>
  );
}

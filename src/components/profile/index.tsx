import { Text, View } from "react-native";
import AvatarProfile from "../avatarProfile";
import styles from "./styles";
import { ProfileProps } from "../../models/types/profile";
import { GenericDataProps } from "../../models/types/genericData";

export default function Profile({ data }: GenericDataProps<ProfileProps>) {
  return (
    <View style={styles.avatar}>
      <AvatarProfile data={data} />
      <Text style={styles.username}>{data?.username}</Text>
    </View>
  );
}

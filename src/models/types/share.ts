import { RouteProp } from "@react-navigation/native";
import { NavigationProps } from "./navigation";
import { Items } from "./items";
import { ProfileProps } from "./profile";
import { DropdownItemProps } from "./dropdown";

export type ShareProps = NavigationProps & {
  route: RouteProp<
    {
      params: {
        items: Items[];
        profileData: ProfileProps;
        type: DropdownItemProps;
        range: DropdownItemProps;
      };
    },
    "params"
  > &
    any;
};

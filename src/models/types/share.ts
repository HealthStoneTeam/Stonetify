import { RouteProp } from "@react-navigation/native";
import { NavigationProps } from "./navigation";
import { Items } from "./items";
import { ProfileProps } from "./profile";
import { DropdownItemProps } from "./dropdown";

export type ShareTemplate = "list" | "festival";

export type ShareTheme = "classic" | "neon" | "sunset" | "monochrome";

export type ShareLimit = 5 | 10 | 20;

export type ShareCustomization = {
  template: ShareTemplate;
  theme: ShareTheme;
  limit: ShareLimit;
  showImages: boolean;
  festivalName: string;
  festivalCity: string;
  festivalDate: string;
};

export type ShareProps = NavigationProps & {
  route: RouteProp<
    {
      params: {
        items: Items[];
        profileData: ProfileProps;
        type: DropdownItemProps;
        range: DropdownItemProps;
        customization?: Partial<ShareCustomization>;
      };
    },
    "params"
  > &
    any;
};

import React from "react";
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import I18n from "../../../translations";
import SpotifyAttribution from "../spotifyAttribution";
import { DropdownItemProps } from "../../models/types/dropdown";
import { Items } from "../../models/types/items";
import { ProfileProps } from "../../models/types/profile";
import { ShareCustomization } from "../../models/types/share";
import { getShareTheme } from "../../utils/shareTheme";
import styles from "./styles";

type ListPosterProps = {
  items: Items[];
  profileData: ProfileProps;
  type: DropdownItemProps;
  range: DropdownItemProps;
  customization: ShareCustomization;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function openSpotify(item: Items) {
  const target = item.uri || item.link;

  if (!target) {
    return;
  }

  Linking.canOpenURL(target).then((supported) => {
    if (supported) {
      Linking.openURL(target);
    } else if (item.link) {
      Linking.openURL(item.link);
    }
  });
}

export default function ListPoster({
  items,
  profileData,
  type,
  range,
  customization,
}: ListPosterProps) {
  const theme = getShareTheme(customization.theme);
  const visibleItems = items.slice(0, customization.limit);

  return (
    <View
      style={[
        styles.poster,
        {
          backgroundColor: theme.posterBackground,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.appMark,
            {
              backgroundColor: theme.panelBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Image
            style={styles.appIcon}
            source={require("../../../assets/icon.png")}
            resizeMode="contain"
            alt="App Icon"
          />
          <Text style={[styles.appName, { color: theme.text }]}>
            Stonetify
          </Text>
        </View>
      </View>

      <View style={styles.titleList}>
        <Text
          style={[styles.textTitleList, { color: theme.text }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
        >
          {I18n.t("shareTitle", {
            username: profileData?.username,
            type: type?.label,
          })}
        </Text>
        <Text style={[styles.textRange, { color: theme.accent }]}>
          {range?.label}
        </Text>
      </View>

      <View
        style={[
          styles.listPanel,
          {
            backgroundColor: theme.panelBackground,
            borderColor: theme.border,
          },
        ]}
      >
        {visibleItems.map((item, index) => (
          <TouchableOpacity
            key={`${item.spotifyId || item.title}-${index}`}
            style={[
              styles.listRow,
              {
                borderColor: theme.border,
                backgroundColor: theme.isDark
                  ? "rgba(255,255,255,0.04)"
                  : "#F8F5EF",
              },
            ]}
            onPress={() => openSpotify(item)}
          >
            <Text style={[styles.rowNumber, { color: theme.accent }]}>
              {String(index + 1).padStart(2, "0")}
            </Text>

            {customization.showImages && (
              <View
                style={[
                  styles.imageBox,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.controlBackground,
                  },
                ]}
              >
                {item.image ? (
                  <Image
                    style={styles.itemImage}
                    source={{ uri: item.image }}
                    resizeMode="contain"
                    alt={item.title}
                  />
                ) : (
                  <Text style={[styles.initials, { color: theme.accent }]}>
                    {getInitials(item.title)}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.rowText}>
              <Text
                style={[styles.itemTitle, { color: theme.text }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
              {!!item.subtitle && (
                <Text
                  style={[styles.itemSubtitle, { color: theme.muted }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.subtitle}
                </Text>
              )}
            </View>

            <Text
              style={[styles.extraInfo, { color: theme.accent2 }]}
              numberOfLines={1}
            >
              {item.extraInfo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.spotifyBadge}>
        <SpotifyAttribution tone={theme.logoTone} />
      </View>
    </View>
  );
}

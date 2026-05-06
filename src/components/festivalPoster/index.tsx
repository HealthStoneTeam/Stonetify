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

type FestivalPosterProps = {
  items: Items[];
  profileData: ProfileProps;
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
    } else {
      Linking.openURL(item.link);
    }
  });
}

export default function FestivalPoster({
  items,
  profileData,
  range,
  customization,
}: FestivalPosterProps) {
  const theme = getShareTheme(customization.theme);
  const visibleItems = items.slice(0, customization.limit);
  const headliners = visibleItems.slice(0, 3);
  const secondary = visibleItems.slice(3, Math.min(10, visibleItems.length));
  const supporting = visibleItems.slice(10);
  const genreLine = visibleItems
    .flatMap((item) => item.genres || [])
    .filter(Boolean)
    .slice(0, 4)
    .join(" / ");

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
            source={require("../../../assets/stonetifyNewLogo.png")}
            resizeMode="contain"
            alt="App Icon"
          />
          <Text style={[styles.appName, { color: theme.text }]}>
            Stonetify
          </Text>
        </View>
      </View>

      <View style={styles.topBar}>
        <Text style={[styles.kicker, { color: theme.accent }]}>
          {I18n.t("festivalPoster")}
        </Text>
        <Text style={[styles.range, { color: theme.muted }]}>
          {range?.label}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.accent }]} />

      <Text
        style={[styles.festivalName, { color: theme.text }]}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.55}
      >
        {customization.festivalName}
      </Text>

      <Text
        style={[styles.meta, { color: theme.accent2 }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        {customization.festivalCity} - {customization.festivalDate}
      </Text>

      {customization.showImages && headliners.length > 0 && (
        <View style={styles.imageStrip}>
          {headliners.map((item) => (
            <TouchableOpacity
              key={item.spotifyId || item.title}
              style={[
                styles.imageCard,
                {
                  backgroundColor: theme.panelBackground,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => openSpotify(item)}
            >
              {item.image ? (
                <Image
                  style={styles.artistImage}
                  source={{ uri: item.image }}
                  resizeMode="contain"
                  alt={item.title}
                />
              ) : (
                <Text style={[styles.initials, { color: theme.accent }]}>
                  {getInitials(item.title)}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View
        style={[
          styles.lineup,
          {
            backgroundColor: theme.panelBackground,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.lineupLabel, { color: theme.accent }]}>
          LINEUP
        </Text>
        {headliners.map((item) => (
          <TouchableOpacity
            key={item.spotifyId || item.title}
            onPress={() => openSpotify(item)}
          >
            <Text
              style={[styles.headliner, { color: theme.text }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}

        {secondary.length > 0 && (
          <View style={styles.secondaryLineup}>
            {secondary.map((item) => (
              <TouchableOpacity
                key={item.spotifyId || item.title}
                style={styles.secondaryArtist}
                onPress={() => openSpotify(item)}
              >
                <Text
                  style={[styles.secondaryName, { color: theme.accent }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {supporting.length > 0 && (
          <View style={styles.supportingLineup}>
            {supporting.map((item) => (
              <TouchableOpacity
                key={item.spotifyId || item.title}
                style={styles.supportingArtist}
                onPress={() => openSpotify(item)}
              >
                <Text
                  style={[styles.supportingName, { color: theme.muted }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {!!genreLine && (
        <Text
          style={[styles.genres, { color: theme.accent2 }]}
          numberOfLines={1}
        >
          {genreLine}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={[styles.generatedBy, { color: theme.muted }]}>
          {I18n.t("festivalBy", { username: profileData?.username })}
        </Text>
        <SpotifyAttribution tone={theme.logoTone} />
      </View>
    </View>
  );
}

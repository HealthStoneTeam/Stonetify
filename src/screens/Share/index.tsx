import React, { useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, useToast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import I18n from "../../../translations";
import FestivalPoster from "../../components/festivalPoster";
import ListPoster from "../../components/listPoster";
import { Toast } from "../../models/enums/toast";
import { NavigationProps } from "../../models/types/navigation";
import {
  ShareCustomization,
  ShareLimit,
  ShareProps,
  ShareTemplate,
  ShareTheme,
} from "../../models/types/share";
import { getShareTheme } from "../../utils/shareTheme";
import styles from "./styles";

const limitOptions: ShareLimit[] = [5, 10, 20];

const themeSwatches: Record<ShareTheme, string[]> = {
  classic: ["#17110E", "#D9A441", "#A23E2C"],
  neon: ["#07111F", "#35F2F2", "#FF4FB8"],
  sunset: ["#241038", "#FF8C42", "#7BDFF2"],
  monochrome: ["#F4F1EA", "#111111", "#C9C3B8"],
};

function asShareLimit(value?: string | number): ShareLimit {
  const parsed = Number(value);
  return parsed === 5 || parsed === 10 ? parsed : 20;
}

export default function Share({
  route,
  navigation,
}: ShareProps & NavigationProps) {
  const [isSharing, setIsSharing] = useState(false);
  const toast = useToast();
  const toastId = Toast.ID;
  const shareBodyRef = useRef<View>(null);
  const { items, profileData, type, range, customization } = route.params;
  const currentYear = new Date().getFullYear();

  const templateOptions: { value: ShareTemplate; label: string }[] = [
    { value: "list", label: I18n.t("listTemplate") },
    { value: "festival", label: I18n.t("festivalTemplate") },
  ];
  const themeOptions: { value: ShareTheme; label: string }[] = [
    { value: "classic", label: I18n.t("classicTheme") },
    { value: "neon", label: I18n.t("neonTheme") },
    { value: "sunset", label: I18n.t("sunsetTheme") },
    { value: "monochrome", label: I18n.t("monochromeTheme") },
  ];

  const [template, setTemplate] = useState<ShareTemplate>(
    customization?.template || "list"
  );
  const [theme, setTheme] = useState<ShareTheme>(
    customization?.theme || "neon"
  );
  const [limit, setLimit] = useState<ShareLimit>(
    asShareLimit(customization?.limit || 20)
  );
  const [showImages, setShowImages] = useState<boolean>(
    customization?.showImages ?? true
  );
  const [festivalName, setFestivalName] = useState(
    customization?.festivalName ||
      I18n.t("festivalNameDefault", {
        username: profileData?.username || "Stonetify",
      })
  );
  const [festivalCity, setFestivalCity] = useState(
    customization?.festivalCity || I18n.t("festivalCityDefault")
  );
  const [festivalDate, setFestivalDate] = useState(
    customization?.festivalDate ||
      I18n.t("festivalDateDefault", { year: currentYear })
  );

  const selectedTheme = getShareTheme(theme);
  const activeControlText = selectedTheme.isDark
    ? selectedTheme.posterBackground
    : selectedTheme.panelBackground;
  const shareCustomization: ShareCustomization = {
    template,
    theme,
    limit,
    showImages,
    festivalName,
    festivalCity,
    festivalDate,
  };

  async function shareImage() {
    if (isSharing) {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          description: I18n.t("shareInProgress"),
        });
      }
      return;
    }

    setIsSharing(true);
    try {
      if (shareBodyRef.current) {
        const uri = await captureRef(shareBodyRef.current, {
          format: "png",
          quality: 1,
        });
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert(I18n.t("error"), I18n.t("shareNotAvailable"));
        } else {
          await Sharing.shareAsync(uri);
        }
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(I18n.t("error"), I18n.t("shareError"));
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingTop: (StatusBar?.currentHeight ?? 0) + 5,
        paddingBottom: 28,
      }}
      style={[styles.container, styles.mainBg]}
    >
      <View style={styles.editorHeader}>
        <View>
          <Text style={styles.editorEyebrow}>{I18n.t("share")}</Text>
          <Text style={styles.editorTitle}>{I18n.t("customizeShare")}</Text>
        </View>
        <TouchableOpacity style={styles.shareAction} onPress={shareImage}>
          <Icon as={MaterialIcons} name="ios-share" size={6} color={"#fff"} />
          <Text style={styles.shareActionText}>{I18n.t("share")}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.controls,
          {
            backgroundColor: selectedTheme.isDark
              ? "#181818"
              : selectedTheme.panelBackground,
            borderColor: selectedTheme.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.sectionLabel,
              { color: selectedTheme.isDark ? "#DADADA" : selectedTheme.muted },
            ]}
          >
            {I18n.t("templateLabel")}
          </Text>
          <View style={styles.segmentedControl}>
            {templateOptions.map((option) => {
              const isSelected = template === option.value;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.segmentButton,
                    {
                      borderColor: isSelected
                        ? selectedTheme.accent
                        : selectedTheme.border,
                      backgroundColor: isSelected
                        ? selectedTheme.accent
                        : selectedTheme.controlBackground,
                    },
                  ]}
                  onPress={() => setTemplate(option.value)}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        color: isSelected
                          ? activeControlText
                          : selectedTheme.text,
                      },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.sectionLabel,
              { color: selectedTheme.isDark ? "#DADADA" : selectedTheme.muted },
            ]}
          >
            {I18n.t("themeLabel")}
          </Text>
          <View style={styles.themeGrid}>
            {themeOptions.map((option) => {
              const isSelected = theme === option.value;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.themeCard,
                    {
                      borderColor: isSelected
                        ? selectedTheme.accent
                        : selectedTheme.border,
                      backgroundColor: selectedTheme.controlBackground,
                    },
                  ]}
                  onPress={() => setTheme(option.value)}
                >
                  <View style={styles.swatchRow}>
                    {themeSwatches[option.value].map((color) => (
                      <View
                        key={color}
                        style={[styles.swatch, { backgroundColor: color }]}
                      />
                    ))}
                  </View>
                  <Text
                    style={[
                      styles.themeLabel,
                      { color: selectedTheme.text },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.inlineControls}>
          <View style={styles.limitGroup}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color: selectedTheme.isDark
                    ? "#DADADA"
                    : selectedTheme.muted,
                },
              ]}
            >
              {I18n.t("quantity")}
            </Text>
            <View style={styles.chipRow}>
              {limitOptions.map((option) => {
                const isSelected = limit === option;

                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.limitChip,
                      {
                        borderColor: isSelected
                          ? selectedTheme.accent
                          : selectedTheme.border,
                        backgroundColor: isSelected
                          ? selectedTheme.accent
                          : selectedTheme.controlBackground,
                      },
                    ]}
                    onPress={() => setLimit(option)}
                  >
                    <Text
                      style={[
                        styles.limitChipText,
                        {
                          color: isSelected
                            ? activeControlText
                            : selectedTheme.text,
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.imageToggle,
              {
                borderColor: showImages
                  ? selectedTheme.accent
                  : selectedTheme.border,
                backgroundColor: showImages
                  ? selectedTheme.accent
                  : selectedTheme.controlBackground,
              },
            ]}
            onPress={() => setShowImages((current) => !current)}
          >
            <Icon
              as={MaterialIcons}
              name={showImages ? "visibility" : "visibility-off"}
              size={5}
              color={showImages ? activeControlText : selectedTheme.text}
            />
            <Text
              style={[
                styles.toggleText,
                {
                  color: showImages
                    ? activeControlText
                    : selectedTheme.text,
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {I18n.t("showImages")}
            </Text>
          </TouchableOpacity>
        </View>

        {template === "festival" && (
          <View
            style={[
              styles.festivalFields,
              {
                backgroundColor: selectedTheme.controlBackground,
                borderColor: selectedTheme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.sectionLabel,
                { color: selectedTheme.text },
              ]}
            >
              {I18n.t("festivalDetails")}
            </Text>
            <View style={styles.fieldRow}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: selectedTheme.border,
                    color: selectedTheme.text,
                  },
                ]}
                value={festivalName}
                onChangeText={setFestivalName}
                placeholder={I18n.t("festivalName")}
                placeholderTextColor={selectedTheme.muted}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: selectedTheme.border,
                    color: selectedTheme.text,
                  },
                ]}
                value={festivalCity}
                onChangeText={setFestivalCity}
                placeholder={I18n.t("festivalCity")}
                placeholderTextColor={selectedTheme.muted}
              />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: selectedTheme.border,
                  color: selectedTheme.text,
                },
              ]}
              value={festivalDate}
              onChangeText={setFestivalDate}
              placeholder={I18n.t("festivalDate")}
              placeholderTextColor={selectedTheme.muted}
            />
          </View>
        )}
      </View>

      <View style={styles.previewFrame}>
        <View ref={shareBodyRef} collapsable={false} style={styles.preview}>
          {template === "festival" ? (
            <FestivalPoster
              items={items}
              profileData={profileData}
              range={range}
              customization={shareCustomization}
            />
          ) : (
            <ListPoster
              items={items}
              profileData={profileData}
              type={type}
              range={range}
              customization={shareCustomization}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

import React, { useEffect, useState, useRef } from "react";
import styles from "./styles";
import { View, ScrollView, TouchableOpacity, Text, Dimensions } from "react-native";
import { Image } from "native-base";
import I18n from "../../../translations";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { captureScreen } from 'react-native-view-shot';


const { width: windowWidth } = Dimensions.get('window');

export default function ItemsList({ data }) {
  const [finalArray, setFinalArray] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    function objectMapper() {
      if (data?.data?.length) {
        if (data?.type == "tracks") {
          setFinalArray(objectMapperTracks());
        } else if (data?.type == "artists") {
          setFinalArray(objectMapperArtist());
        }
      } else {
        setFinalArray([]);
      }
    }

    objectMapper();
  }, []);

  function objectMapperTracks() {
    return data?.data?.map((track) => {
      return {
        image: track?.albumCover,
        title: track?.title,
        subtitle: track?.artist,
        extraInfo: track?.time,
      };
    });
  }

  function objectMapperArtist() {
    return data?.data?.map((artist) => {
      return {
        image: artist?.artistCover,
        title: artist?.title,
        extraInfo: artist?.popularity,
      };
    });
  }

  const viewRef = useRef();

  const handlePrint = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(
        async (uri) => {
          console.log('Imagem salva em', uri);
          if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
          }
          await Sharing.shareAsync(uri);
        },
        (error) => console.error('Oops, snapshot failed', error)
      );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} size={"sm"} alt="Ilustration" />
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode='tail'>{item.subtitle}</Text>
          )}
        </View>
        <Text style={styles.subtitle}>{item.extraInfo}</Text>
      </View>
    </View>
  );

  return finalArray?.length ? (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} ref={viewRef}>
        <ScrollView style={{ width: windowWidth }}>
          {finalArray.map((item, index) => (
            <View key={index.toString()} style={{ width: windowWidth }}>
              {renderItem({ item })}
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePrint}
      >
        <Text style={styles.buttonText}>Imprimir</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>{I18n.t('noDataFound')}</Text>
    </View>
  );
}
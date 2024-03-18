import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import styles from './styles';
import PrivacyPolicyModal from '../PrivacyPolicyModal/index';
import I18n from '../../../translations';

export default function About({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !modalVisible
    });
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <View style={[styles.card]}>
        <Text style={styles.title}>{I18n.t('aboutTitle')}</Text>
        <Text style={styles.text}>{I18n.t('aboutText')}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.link}>{I18n.t('privacyPolicyLink')}</Text>
        </TouchableOpacity>

        <PrivacyPolicyModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </View>
  );
}
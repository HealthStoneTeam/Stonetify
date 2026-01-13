import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import styles from './styles';
import PrivacyPolicyModal from '../PrivacyPolicyModal/index';
import i18n from '../../../translations';
import { NavigationProps } from '../../models/types/navigation';

export default function About({ navigation }: NavigationProps) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !modalVisible
    });
  }, [modalVisible]);

  return (
    <View style={styles.container} testID="about-container">
      <View style={[styles.card]}>
        <Text style={styles.title} testID="about-title">{i18n.t('aboutTitle')}</Text>
        <Text style={styles.text} testID="about-text">{i18n.t('aboutText')}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} testID="privacy-link-button">
          <Text style={styles.link} testID="privacy-link-text">{i18n.t('privacyPolicyLink')}</Text>
        </TouchableOpacity>

        <PrivacyPolicyModal data={{
          modalVisible: modalVisible,
          setModalVisible: setModalVisible
        }}/>
      </View>
    </View>
  );
}
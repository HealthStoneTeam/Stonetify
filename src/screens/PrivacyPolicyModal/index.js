import React from 'react';
import { Text, View, TouchableOpacity, Modal, Linking } from "react-native";
import styles from './styles';
import I18n from '../../../translations';

export default function PrivacyPolicyModal({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{I18n.t('privacyPolicyTitle')}</Text>
          <Text style={styles.modalText}>
            {I18n.t('privacyPolicyText1')}
          </Text>
          <Text style={styles.modalText}>
            {I18n.t('privacyPolicyText2')}
          </Text>
          <Text style={styles.modalText}>
            {I18n.t('privacyPolicyText3')} <TouchableOpacity onPress={() => Linking.openURL('https://support.spotify.com/us/article/spotify-on-other-apps/')}>
              <Text style={styles.linkText}>{I18n.t('detailedGuide')}</Text>
            </TouchableOpacity>
          </Text>

          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeButtonText}>{I18n.t('close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
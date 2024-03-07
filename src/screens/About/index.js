import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
import styles from './styles';

export default function About() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
     
      <View style={[styles.card]}>
        <Text style={styles.title}>About SpotStats</Text>
        <Text style={styles.text}>
          Inspired by @Receiptify, Spotstats is a tool that displays a user's 10
          most-played tracks from the last month, last 6 months, and all time
          in a friendly list. You can share and tell all the people about your metrics.
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>

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
              <Text style={styles.title}>Privay Policy</Text>
              <Text style={styles.modalText}>
                Spotify was developed as an open source app powered by the developer.spotify Web API. By choosing to use this app, you agree to the use of your Spotify account username and data for your top artists and tracks.
              </Text>
              <Text style={styles.modalText}>
                None of the data used by Spotstats is stored or collected anywhere, and it is NOT shared with any third parties. All information is used solely for displaying your Spotstats.
              </Text>
              <Text style={styles.modalText}>
                Although you can rest assured that your data is not being stored or used maliciously, if you would like to revoke Spotstats's permissions, you can visit your apps page and click "REMOVE ACCESS" on Spotstats. Here is a more detailed guide for doing so.
              </Text>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import I18n from '../../../translations';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/logo.png')}
      />
      <TouchableOpacity style={styles.loginButton}
        onPress={() => navigation.navigate('Presentation')}>
        <Text style={styles.buttonText}>{I18n.t('loginWithSpotify')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.buttonText}>{I18n.t('about')}</Text>
      </TouchableOpacity>

      <View style={styles.watermarkContainer}>
        <Text style={styles.watermarkText}>{I18n.t('madeBy')}</Text>
      </View>
    </View>
  );
}
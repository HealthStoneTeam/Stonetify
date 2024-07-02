import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1DB954" />
    </View>
  );
}

export default Loading;
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { GenericDataProps } from '../../models/types/genericData';
import { LoadingProps } from '../../models/types/Loading';

const Loading = ({ data }: GenericDataProps<LoadingProps>) => {
  if (!data.isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1DB954" />
    </View>
  );
}

export default Loading;
import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';

test('smoke environment', () => {
  const { getByTestId } = render(
    <View testID="container">
      <Text testID="text-ok">OK</Text>
    </View>
  );
  expect(getByTestId('container')).toBeTruthy();
  expect(getByTestId('text-ok')).toBeTruthy();
});

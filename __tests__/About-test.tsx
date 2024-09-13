import React from 'react';
import { render } from '@testing-library/react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import About from '../src/screens/About';
import I18n from '../translations';
import { jest } from '@jest/globals';

describe('About Component', () => {
  test('Text renders correctly on About screen', () => {
    const navigationMock: Partial<StackNavigationProp<any>> = {
      setOptions: jest.fn(),
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    const { getByText } = render(<About navigation={navigationMock as StackNavigationProp<any>} />);

    expect(getByText(I18n.t('aboutTitle'))).toBeTruthy();
    expect(getByText(I18n.t('aboutText'))).toBeTruthy();
    expect(getByText(I18n.t('privacyPolicyLink'))).toBeTruthy();
  });
});
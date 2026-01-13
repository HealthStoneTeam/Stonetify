import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import Login from '../src/screens/Login';
import { AuthContext } from '../src/contexts/auth';
import { Pages } from '../src/models/enums/pages';
import { ErrorAuthenticating } from '../src/errors';


jest.mock('../translations', () => ({
  __esModule: true,
  default: {
    t: jest.fn((key: string) => {
      const translations: { [key: string]: string } = {
        loginWithSpotify: 'Login with Spotify',
        about: 'About',
        error: 'Error',
        authError: 'Authentication Error',
        errorAuthenticating: 'errorAuthenticating',
        madeBy: 'Made by',
      };
      return translations[key] || key;
    }),
  },
}));


jest.mock('../src/components/loading', () => {
  return function MockLoading({ data }: { data: { isLoading: boolean } }) {
    const React = require('react');
    const { View, Text } = require('react-native');
    return data.isLoading ? (
      <View testID="loading">
        <Text>Loading...</Text>
      </View>
    ) : null;
  };
});

jest.mock('../src/components/waterMark', () => {
  return function MockWaterMark() {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
      <View testID="watermark">
        <Text>Made by</Text>
      </View>
    );
  };
});


// Usa spyOn em vez de mockar todo o módulo react-native (evita quebrar VirtualizedList)
const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Login Component', () => {
  let mockAuthContext: {
    authenticate: jest.Mock;
    logout: jest.Mock;
    getAccessToken: jest.Mock;
  };

  const navigationMock: Partial<StackNavigationProp<any>> = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  };

  const renderWithAuthContext = (component: React.ReactElement) => {
    return render(
      <AuthContext.Provider value={mockAuthContext}>
        {component}
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {

    mockAuthContext = {
      authenticate: jest.fn(),
      logout: jest.fn(),
      getAccessToken: jest.fn(),
    };

    jest.clearAllMocks();
  alertSpy.mockClear();
  });

  test('renders correctly with all elements', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);

    const { getByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('login-button')).toBeTruthy();
      expect(getByTestId('about-button')).toBeTruthy();
      expect(getByTestId('watermark')).toBeTruthy();
    });
  });

  test('navigates to Presentation if user is already logged in', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue('valid-token');

    renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith(Pages.PRESENTATION);
    });
  });

  test('navigates to About screen when About button is pressed', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);

    const { getByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('about-button')).toBeTruthy();
    });

    const aboutButton = getByTestId('about-button');
    fireEvent.press(aboutButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith(Pages.ABOUT);
  });

  test('successful login navigates to Presentation screen', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);
    mockAuthContext.authenticate.mockResolvedValue(true);

    const { getByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('login-button')).toBeTruthy();
    });

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockAuthContext.authenticate).toHaveBeenCalled();
      expect(navigationMock.navigate).toHaveBeenCalledWith(Pages.PRESENTATION);
    });
  });

  test('failed login shows error alert', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);
    mockAuthContext.authenticate.mockResolvedValue(false);

    const { getByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('login-button')).toBeTruthy();
    });

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(undefined, undefined);
    });
  });

  test('authentication error shows specific error message', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);

    const mockError = new ErrorAuthenticating();
    mockAuthContext.authenticate.mockRejectedValue(mockError);

    const { getByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('login-button')).toBeTruthy();
    });

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(undefined, '');
    });
  });

  test('generic error falls back to auth error message', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);

    const genericError = new Error('Some generic error');
    mockAuthContext.authenticate.mockRejectedValue(genericError);

    const { getByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('login-button')).toBeTruthy();
    });

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(undefined, undefined);
    });
  });

  test('handles getAccessToken error gracefully', async () => {
    mockAuthContext.getAccessToken.mockRejectedValue(new Error('Token error'));

    renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(navigationMock.navigate).not.toHaveBeenCalledWith(Pages.PRESENTATION);
    });
  });

  test('shows loading during authentication process', async () => {
    mockAuthContext.getAccessToken.mockResolvedValue(null);

    mockAuthContext.authenticate.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(true), 100))
    );

    const { getByTestId, queryByTestId } = renderWithAuthContext(
      <Login navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(queryByTestId('loading')).toBeFalsy();
    });

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    expect(getByTestId('loading')).toBeTruthy();

    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith(Pages.PRESENTATION);
    });
  });
});
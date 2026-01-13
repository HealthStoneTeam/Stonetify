import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import Presentation from '../src/screens/Presentation';
import { AuthContext } from '../src/contexts/auth';
import { Pages } from '../src/models/enums/pages';
import { ErrorAuthenticating, ErrorGetting } from '../src/errors';
import { getProfile, getTopItems } from '../src/domains/user';
import { Filters } from '../src/models/enums/filters';

// Mock das dependências apenas para este teste
jest.mock('../translations', () => ({
  t: jest.fn((key: string) => {
    const translations: { [key: string]: string } = {
      error: 'Error',
      validationError: 'Validation Error',
      noDataToShare: 'No data to share',
      share: 'Share',
      topTracks: 'Top Tracks',
      topArtist: 'Top Artists',
      lastMonth: 'Last Month',
      last6Months: 'Last 6 Months',
      allTime: 'All Time',
    };
    return translations[key] || key;
  }),
}));

jest.mock('../src/domains/user', () => ({
  getProfile: jest.fn(),
  getTopItems: jest.fn(),
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

jest.mock('../src/components/header', () => {
  return function MockHeader() {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
      <View testID="header">
        <Text>Header</Text>
      </View>
    );
  };
});

jest.mock('../src/components/filter', () => {
  return function MockFilter({ data }: any) {
    const React = require('react');
    const { View, TouchableOpacity, Text } = require('react-native');
    const { Filters } = require('../src/models/enums/filters');
    
    return (
      <View testID="filter">
        <TouchableOpacity 
          testID="tracks-filter"
          onPress={() => data.getItems({ 
            type: { value: Filters.TRACKS, label: 'Top Tracks' },
            range: { value: Filters.LAST_MONTH, label: 'Last Month' }
          })}
        >
          <Text>Top Tracks</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

jest.mock('../src/components/itemsList', () => {
  return function MockItemsList({ data }: any) {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
      <View testID="items-list">
        <Text>Items: {data.items?.length || 0}</Text>
      </View>
    );
  };
});

jest.mock('../src/components/titleList', () => {
  return function MockTitleList() {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
      <View testID="title-list">
        <Text>Title List</Text>
      </View>
    );
  };
});

jest.mock('../src/components/footerList', () => {
  return function MockFooterList() {
    const React = require('react');
    const { View, Text } = require('react-native');
    return (
      <View testID="footer-list">
        <Text>Footer</Text>
      </View>
    );
  };
});

// Mock simplificado do native-base
jest.mock('native-base', () => ({
  useToast: () => ({
    show: jest.fn(),
    isActive: jest.fn(() => false),
  }),
  Icon: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement('Text', {}, 'Icon');
  },
}));

describe('Presentation Component', () => {
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

  const mockProfileData = {
    username: 'Test User',
    userID: 'test123',
    userImage: 'http://test-image.com',
  };

  const mockItemsData = [
    {
      id: 1,
      title: 'Test Song',
      subtitle: 'Test Artist',
      extraInfo: '3:45',
      image: 'http://test.com/image.jpg',
      uri: 'spotify:track:test',
      link: 'https://open.spotify.com/track/test',
    },
  ];

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
    (Alert.alert as jest.Mock).mockClear();
    (getProfile as jest.Mock).mockClear();
    (getTopItems as jest.Mock).mockClear();
  });

  test('renders correctly and loads profile data on mount', async () => {
    (getProfile as jest.Mock).mockResolvedValue(mockProfileData);

    const { getByTestId } = renderWithAuthContext(
      <Presentation navigation={navigationMock as StackNavigationProp<any>} />
    );

    expect(getByTestId('loading')).toBeTruthy();

    await waitFor(() => {
      expect(getProfile).toHaveBeenCalledWith(mockAuthContext.getAccessToken);
      expect(getByTestId('header')).toBeTruthy();
      expect(getByTestId('filter')).toBeTruthy();
    });
  });

  test('handles profile loading error and navigates back', async () => {
    const mockError = new ErrorAuthenticating();
    (getProfile as jest.Mock).mockRejectedValue(mockError);

    renderWithAuthContext(
      <Presentation navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(undefined, '');
      expect(navigationMock.goBack).toHaveBeenCalled();
    });
  });

  test('loads items when filter is selected', async () => {
    (getProfile as jest.Mock).mockResolvedValue(mockProfileData);
    (getTopItems as jest.Mock).mockResolvedValue({ data: mockItemsData });

    const { getByTestId } = renderWithAuthContext(
      <Presentation navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('filter')).toBeTruthy();
    });

    const tracksFilter = getByTestId('tracks-filter');
    fireEvent.press(tracksFilter);

    await waitFor(() => {
      expect(getTopItems).toHaveBeenCalledWith({
        getAccessToken: mockAuthContext.getAccessToken,
        filterData: {
          limit: 10,
          offset: 0,
          type: Filters.TRACKS,
          range: Filters.LAST_MONTH,
        },
      });
    });
  });

  test('displays items list when data is loaded', async () => {
    (getProfile as jest.Mock).mockResolvedValue(mockProfileData);
    (getTopItems as jest.Mock).mockResolvedValue({ data: mockItemsData });

    const { getByTestId } = renderWithAuthContext(
      <Presentation navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(getByTestId('filter')).toBeTruthy();
    });

    const tracksFilter = getByTestId('tracks-filter');
    fireEvent.press(tracksFilter);

    await waitFor(() => {
      expect(getByTestId('items-list')).toBeTruthy();
      expect(getByTestId('title-list')).toBeTruthy();
      expect(getByTestId('footer-list')).toBeTruthy();
    });
  });

  test('handles generic error during profile loading', async () => {
    const genericError = new Error('Generic error');
    (getProfile as jest.Mock).mockRejectedValue(genericError);

    renderWithAuthContext(
      <Presentation navigation={navigationMock as StackNavigationProp<any>} />
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(undefined, undefined);
      expect(navigationMock.goBack).toHaveBeenCalled();
    });
  });
});
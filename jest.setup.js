require('@testing-library/jest-native/extend-expect');
const { configure } = require('@testing-library/react-native');

// Configurar host components manualmente para evitar detecção automática problemática
configure({
  hostComponentNames: [
    'View',
    'Text',
    'TextInput',
    'Image',
    'ScrollView',
    'FlatList',
    'SectionList',
    'TouchableOpacity',
    'TouchableWithoutFeedback',
    'TouchableHighlight',
    'Pressable',
    'Button',
    'ActivityIndicator',
  ]
});

// Definir variáveis de ambiente necessárias para testes
process.env.SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'test-client-id';
global.__DEV__ = true;
global.__TEST__ = true;

jest.mock('@expo/metro-runtime', () => ({}));

jest.mock('@env', () => ({
  SPOTIFY_CLIENT_ID: 'test-client-id',
}));

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: ({ name, onPress, ...props }) => {
    const React = require('react');
    const { TouchableOpacity } = require('react-native');
    return React.createElement(TouchableOpacity, { onPress, testID: 'icon-' + name, ...props });
  },
  MaterialCommunityIcons: ({ name, onPress, ...props }) => {
    const React = require('react');
    const { TouchableOpacity } = require('react-native');
    return React.createElement(TouchableOpacity, { onPress, testID: 'icon-' + name, ...props });
  },
  Entypo: ({ name, onPress, ...props }) => {
    const React = require('react');
    const { TouchableOpacity } = require('react-native');
    return React.createElement(TouchableOpacity, { onPress, testID: 'icon-' + name, ...props });
  },
}));

jest.mock('expo-constants', () => ({
  default: {
    platform: { ios: { platform: 'ios' } },
    appOwnership: 'standalone',
    expoVersion: '50.0.0',
    manifest: { extra: { SPOTIFY_CLIENT_ID: 'test-client-id' } },
  },
}));

jest.mock('expo-modules-core', () => ({
  NativeModule: jest.fn(),
  requireNativeModule: jest.fn(),
  EventEmitter: jest.fn(),
}));

jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(() => ({})),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}));

jest.mock('expo-auth-session', () => ({
  makeRedirectUri: jest.fn(() => 'http://localhost:19006'),
  useAuthRequest: jest.fn(() => [null, { promptAsync: jest.fn() }, null]),
  AuthRequest: { promptAsync: jest.fn() },
  ResponseType: { Code: 'code' },
  fetchDiscoveryAsync: jest.fn(),
  loadAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  shareAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-view-shot', () => ({
  captureRef: jest.fn(() => Promise.resolve('mock-uri')),
}));

jest.mock('native-base', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  const passthrough = (name) => (props) => React.createElement(View, { accessibilityLabel: name, ...props }, props.children);
  return {
    NativeBaseProvider: ({ children }) => React.createElement(View, { testID: 'nb-provider' }, children),
    useToast: () => ({ show: jest.fn(), isActive: jest.fn(() => false) }),
    Icon: ({ name, onPress }) => React.createElement(Text, { onPress }, name || 'icon'),
    Box: passthrough('Box'),
    HStack: passthrough('HStack'),
    VStack: passthrough('VStack'),
    Pressable: ({ children, onPress }) => React.createElement(TouchableOpacity, { onPress }, children),
    Avatar: passthrough('Avatar'),
    Image: passthrough('Image'),
    Divider: passthrough('Divider'),
    extendTheme: (t) => t,
  };
});

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return mockComponent('react-native/Libraries/Components/Switch/Switch');
});

jest.mock('../assets/logo.png', () => 'logo.png');
jest.mock('../assets/icon.png', () => 'icon.png');
jest.mock('../assets/spotifyIcon.png', () => 'spotifyIcon.png');
jest.mock('../assets/spotifyLogo.png', () => 'spotifyLogo.png');

// Mock i18n-js globally para todos os testes
jest.mock('i18n-js', () => {
  const translations = {
    loginWithSpotify: 'Login with Spotify',
    about: 'About',
    error: 'Error',
    authError: 'Authentication Error',
    errorAuthenticating: 'errorAuthenticating',
    errorGetting: 'Validation Error',
    madeBy: 'Made by',
  };
  
  return {
    __esModule: true,
    I18n: jest.fn().mockImplementation(() => ({
      t: (key) => translations[key] || key,
      locale: 'en',
    })),
  };
});

jest.setTimeout(15000);

const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  if (typeof args[0] === 'string' && /extracted from react-native core/.test(args[0])) return;
  originalWarn(...args);
};

console.error = (...args) => {
  if (typeof args[0] === 'string') {
    if (/Element type is invalid/.test(args[0])) return;
    if (/ForwardRef\(Switch\)/.test(args[0])) return;
    if (/The above error occurred/.test(args[0])) return;
    if (/Consider adding an error boundary/.test(args[0])) return;
  }
  originalError(...args);
};

// Mock minimalista para evitar acesso a getters complexos de VirtualizedList / ProgressBarAndroid
const actual = jest.requireActual('react-native');

const Alert = { alert: jest.fn() };

const AppRegistry = {
  registerComponent: jest.fn(),
  getAppKeys: jest.fn(() => ['main']),
  unmountApplicationComponentAtRootTag: jest.fn(),
  setWrapperComponentProvider: jest.fn(),
  registerRunnable: jest.fn(),
  getRegistry: jest.fn(() => ({ main: { component: jest.fn() } })),
};

// Escolher apenas módulos necessários explicitamente + fallback via Proxy quando acessados
const exported = {
  Alert,
  AppRegistry,
  View: actual.View,
  Text: actual.Text,
  Image: actual.Image,
  TouchableOpacity: actual.TouchableOpacity,
  Platform: actual.Platform,
  StyleSheet: actual.StyleSheet,
};

module.exports = new Proxy(exported, {
  get(target, prop) {
    if (prop in target) return target[prop];
    // Lazy fallback para outros exports reais se necessários
    return actual[prop];
  },
});

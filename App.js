import AuthProvider from "./src/config/auth";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import { NativeBaseProvider } from 'native-base';
import I18n from './translations';
import * as Localization from 'expo-localization';

I18n.locale = Localization.region === 'BR' ? 'pt' : 'en';

export default function App() {
  return (
    <NativeBaseProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </NativeBaseProvider>
  );
  }

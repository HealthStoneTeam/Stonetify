import AuthProvider from "./src/config/auth";
import "react-native-gesture-handler";
import Routes from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
    
  );
}

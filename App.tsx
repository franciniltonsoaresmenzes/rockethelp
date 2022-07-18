import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';

import { SingIn } from './src/screens/Signin';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});
  return (
    <NativeBaseProvider theme={THEME} >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontLoaded ? <SingIn/> : <Loading/>  }
    </NativeBaseProvider>
  );
}


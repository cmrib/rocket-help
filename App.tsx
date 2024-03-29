import { NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';
import { Register } from './src/screens/Register';
import { THEME } from './src/styles/theme';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle='light-content' backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}


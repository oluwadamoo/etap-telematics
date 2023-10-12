import { useFonts } from "expo-font";
import { useCallback } from 'react';

import { NavigationHandler } from './src/routes/navigation.handlers';
import { StatusBar } from "expo-status-bar";

export default function App() {

  const [fontsLoaded] = useFonts({
    "pacifico": require("./src/assets/fonts/Pacifico-Regular.ttf"),
    'dm-sans': require("./src/assets/fonts/DMSans.ttf"),
    'dm-sans-b': require("./src/assets/fonts/DMSans-Bold.ttf"),
    'dm-sans-xb': require("./src/assets/fonts/DMSans-ExtraBold.ttf"),
    'dm-sans-sb': require("./src/assets/fonts/DMSans-SemiBold.ttf"),
    'dm-sans-black': require("./src/assets/fonts/DMSans-Black.ttf"),
    'spacemono': require("./src/assets/fonts/SpaceMono-Bold.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {

    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <>
      <NavigationHandler onReady={onLayoutRootView} />
      <StatusBar style='light' />
    </>
  );
}


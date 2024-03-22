const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Splash from "./screens/Splash";
import Splash2 from "./screens/Splash2";
import CheckMarkIcon from "./components/CheckMarkIcon";
import Vector from "./components/Vector";
import Vector1 from "./components/Vector1";
import Settings from "./screens/Settings";
import Ranking from "./screens/Ranking";
import Validation from "./screens/Validation";
import Theme from "./screens/Theme";
import PlayersList from "./screens/PlayersList";
import Slide1 from "./screens/Slide1";
import Slide2 from "./screens/Slide2";
import Slide3 from "./screens/Slide3";
import { Provider } from 'react-redux';
import Store from './Store/ConfigStore'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.otf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Validation"
              component={Validation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Splash2"
              component={Splash2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Slide1"
              component={Slide1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Slide2"
              component={Slide2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Slide3"
              component={Slide3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Ranking"
              component={Ranking}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Theme"
              component={Theme}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlayersList"
              component={PlayersList}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </Provider>
  );
};
export default App;

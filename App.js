// third parties libraries
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
// application libraries
import { AuthNavigator, TabNavigator, Theme } from "./App/Navigation";
import { navigationRef } from "./App/Navigation/rootNavigation";
import OfflineNotice from "./App/components/OfflineNotice";
import { Notify } from "./App/components";
import AuthContext from "./App/auth/context";
import authStorage from "./App/auth/storage";

import { LogBox } from "react-native";
import { errorApi } from "./App/api";

LogBox.ignoreLogs([
  "expo-app-loading is deprecated in favor of expo-splash-screen",
  "EventEmitter.removeListener",
  "onAnimatedValueUpdate",
  "expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScren.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/",
  "EventEmitter.removeListener('keyboardWillHide', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
  "EventEmitter",
]);

export default App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    errorApi.sendLog();
  }, [user]);
  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = await authStorage.getUser();
      setUser(user);
    };
    if (!user && !isReady) {
      checkAuthStatus();
      setIsReady(true);
    }
  }, [user]);

  if (!isReady) return <AppLoading />;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Notify message={message} setMessage={setMessage} />
      <StatusBar style={"auto"} />
      <NavigationContainer ref={navigationRef} theme={Theme}>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <OfflineNotice />
    </AuthContext.Provider>
  );
};

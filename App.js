// third parties libraries
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
// application libraries
import { AuthNavigator, TabNavigator, Theme } from "./App/Navigation";
import { navigationRef } from "./App/Navigation/rootNavigation";
import OfflineNotice from "./App/components/OfflineNotice";
import AuthContext from "./App/auth/context";
import authStorage from "./App/auth/storage";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ViewPropTypes will be removed from React Native",
  "expo-app-loading is deprecated in favor of expo-splash-screen",
  "EventEmitter.removeListener",
]);

export default App = () => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

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
      <StatusBar style={"auto"} />
      <NavigationContainer ref={navigationRef} theme={Theme}>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <OfflineNotice />
    </AuthContext.Provider>
  );
};

//import { Text, View } from "react-native";

//  <View
//       style={{
//         backgroundColor: "black",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text
//         style={{
//           color: "white",
//           fontSize: 50,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         Hi
//       </Text>
//     </View>

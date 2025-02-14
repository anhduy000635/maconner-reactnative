import "~/global.css";

import { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import SiteHeader from "~/app/Header/header";
import { CartProvider } from "./Cart/CartContext";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <CartProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar
          animated={true}
          backgroundColor={isDarkColorScheme ? "transparent" : "white"}
          networkActivityIndicatorVisible
          style={isDarkColorScheme ? "light" : "dark"}
          translucent
        />
        <Stack screenOptions={{ headerBackVisible: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => <SiteHeader />,
              headerTitleAlign: "center",
              headerLeft: () => null,
              // Thay thế tiêu đề bằng SiteHeader
            }}
          />
          <Stack.Screen
            name="test" // ✅ Thêm trang test
            options={{
              headerTitle: () => <SiteHeader />, // Thay thế tiêu đề bằng SiteHeader
              headerTitleAlign: "center",
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Home/sliderShow" // ✅ Thêm trang test
            options={{
              headerTitle: () => <SiteHeader />, // Thay thế tiêu đề bằng SiteHeader
              headerTitleAlign: "center",
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Products/[id]" // ✅ Thêm trang test
            options={{
              headerTitle: () => <SiteHeader />,
              headerTitleAlign: "center",
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Cart/CartPages" // ✅ Thêm trang test
            options={{
              headerTitle: () => <SiteHeader />,
              headerTitleAlign: "center",
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Checkout/Checkout" // ✅ Thêm trang test
            options={{
              headerTitle: () => <SiteHeader />,
              headerTitleAlign: "center",
              headerLeft: () => null,
            }}
          />
        </Stack>

        <PortalHost />
      </ThemeProvider>
    </CartProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

import { useColorScheme } from "@/hooks/use-color-scheme";
import { getToken } from "@/storage/tokenManager";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = await getToken();
        setToken(savedToken);
      } catch (error) {
        console.log("failed to find token ", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {token ? (
          <>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen
              name='modal'
              options={{ presentation: "modal", title: "Modal" }}
            />
          </>
        ) : (
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        )}
      </Stack>
      <StatusBar style='light' />
    </ThemeProvider>
  );
}

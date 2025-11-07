import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { VerifyToken } from "@/services/Login";
import { getToken } from "@/storage/tokenManager";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = await getToken();
        setToken(savedToken);

        if (token) {
          const tokenResponse = await VerifyToken();
          if (!tokenResponse.success) router.replace("/(auth)/login");
        }
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
      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [fontsLoaded, loading, token]);

  if (!fontsLoaded || loading) return <LoadingScreen />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.defaultColors.background },
          animation: "slide_from_right",
        }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='modal'
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(pages)' options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='light' />
    </ThemeProvider>
  );
}

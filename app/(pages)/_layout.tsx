import { HapticTab } from "@/components/haptic-tab";
import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { getToken } from "@/storage/tokenManager";
import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

export default function PagesLayout() {
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState(true);

  const INACTIVE_COLOR = Colors.defaultColors.gray100;
  const ACTIVE_COLOR = Colors.defaultColors.green300;
  const TAB_BACKGROUND = Colors.defaultColors.black300;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = await getToken();
        setToken(savedToken);
      } catch (error) {
        console.log(error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  if (!token) {
    return <Redirect href='/login' />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: TAB_BACKGROUND,
          height: 0,
          paddingBottom: 5,
          paddingTop: 4,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen name='cats/[id]' />
      <Tabs.Screen name='cats/cat-register' />
      <Tabs.Screen name='profile/index' />
    </Tabs>
  );
}

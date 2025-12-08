import { CameraCard } from "@/components/ui/cameras";
import { AppHeader } from "@/components/ui/headers";
import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { ICamera } from "@/interfaces/api/Cameras";
import { getCameras } from "@/services/Cameras";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CamerasScreen() {
  const router = useRouter();

  const [cameras, setCameras] = useState<ICamera[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCameras = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCameras();
      if (response.data) {
        setCameras(response.data);
      } else {
        setCameras([]);
      }
    } catch (err) {
      console.error("Erro ao buscar câmeras:", err);
      setError("fail to find cameras, try again later");
      setCameras([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCameras();
      return () => {};
    }, [fetchCameras])
  );

  const navigateToDetails = (id: number) => {
    return null;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View style={styles.safeContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <AppHeader
          title='cameras'
          onNotificationPress={() => {}}
          onProfilePress={() => {}}
        />
        <View style={styles.emptyContainer}>
          <Ionicons
            name='alert-circle-outline'
            size={40}
            color={Colors.defaultColors.danger}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCameras}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!cameras || cameras.length === 0) {
    return (
      <View style={styles.safeContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <AppHeader
          title='Cameras'
          onNotificationPress={() => {}}
          onProfilePress={() => {}}
        />
        <View style={styles.emptyContainer}>
          <Ionicons
            name='videocam-off-outline'
            size={60}
            color={Colors.defaultColors.gray300}
          />
          <Text style={styles.emptyText}>
            Nenhuma câmera cadastrada ou encontrada.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCameras}>
            <Text style={styles.retryButtonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      <AppHeader
        title='Cameras'
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentGrid}>
          {cameras.map((cam) => (
            <CameraCard
              key={cam.id}
              camera={cam}
              onPress={() => navigateToDetails(cam.id)}
            />
          ))}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  contentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.defaultColors.background,
  },
  emptyText: {
    color: Colors.defaultColors.gray100,
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
  errorText: {
    color: Colors.defaultColors.danger,
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.defaultColors.green300,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.defaultColors.black300,
    fontWeight: "bold",
  },
});

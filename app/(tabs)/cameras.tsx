// app/(tabs)/cameras/index.tsx

import { CameraCard } from "@/components/ui/cameras";
import { AppHeader } from "@/components/ui/headers"; // Seu componente Header
import { Colors } from "@/constants/theme";
import { ICamera } from "@/interfaces/api/Cameras";
import { Stack, useRouter } from "expo-router";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

// --- Dados Mockados ---
const MOCK_CAMERAS: ICamera[] = [
  {
    id: 1,
    name: "Dormitório Principal",
    url: "rtsp://...",
    thumbnail: "https://via.placeholder.com/300/409C6D/FFFFFF?text=Dorm+P",
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  },
  {
    id: 2,
    name: "Área de Lazer Interna",
    url: "rtsp://...",
    thumbnail: null, // Sem thumbnail, para testar o placeholder
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  },
  {
    id: 3,
    name: "Portão de Entrada",
    url: "rtsp://...",
    thumbnail: "https://via.placeholder.com/300/2196F3/FFFFFF?text=Portao",
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  },
  {
    id: 4,
    name: "Recepção",
    url: "rtsp://...",
    thumbnail: "https://via.placeholder.com/300/E91E63/FFFFFF?text=Recep",
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  },
  {
    id: 5,
    name: "Quarentena 1",
    url: "rtsp://...",
    thumbnail: "https://via.placeholder.com/300/FF5722/FFFFFF?text=Quar+1",
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  },
  {
    id: 6,
    name: "Quarentena 2",
    url: "rtsp://...",
    thumbnail: "https://via.placeholder.com/300/795548/FFFFFF?text=Quar+2",
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  },
];

export default function CamerasScreen() {
  const router = useRouter();

  const navigateToDetails = (id: number) => {
    // Navega para a rota de detalhes da câmera: /cameras/[id]
    // router.push({
    //   pathname: "/cameras/[id]",
    //   params: { id: id.toString() },
    // });
    Alert.alert("clicou em detalhes");
  };

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      <AppHeader
        title='Câmeras'
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentGrid}>
          {MOCK_CAMERAS.map((cam) => (
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
});

import { CameraCard } from "@/components/ui/cameras";
import { AppHeader } from "@/components/ui/headers"; // Seu componente Header
import { LoadingScreen } from "@/components/ui/loading"; // Assumindo que você tem este componente
import { Colors } from "@/constants/theme";
import { ICamera } from "@/interfaces/api/Cameras"; // Sua interface ICamera
import { getCameras } from "@/services/Cameras";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mocks removidos.

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
        // Supondo que a resposta da API seja { data: ICamera[] }
        setCameras(response.data);
      } else {
        // Se a chamada retornar sucesso, mas os dados vierem vazios (ex: response.data === [])
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

  // Usa useFocusEffect para recarregar sempre que a tela estiver em foco
  useFocusEffect(
    useCallback(() => {
      fetchCameras();
      // O cleanup aqui pode ser usado se houvesse algum listener de real-time
      return () => {};
    }, [fetchCameras])
  );

  const navigateToDetails = (id: number) => {
    // Alerta temporário substituído pela navegação real
    // router.push({
    //   pathname: "/cameras/[id]",
    //   params: { id: id.toString() },
    // });
    // Se quiser manter o alerta para debug: Alert.alert("clicou em detalhes");

    Alert.alert("clicou em camera");
  };

  // --- Renderização de Estado ---
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Tratamento de Erro de Fetch
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

  // Tratamento de Lista Vazia
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
  // ------------------------------

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
              // Você precisará adicionar as props 'status' e 'location' ao ICamera, ou adaptá-las
              // Aqui estamos apenas passando o objeto cam completo
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
  // Estilos para estados de Vazio/Erro
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

import { CatCard } from "@/components/ui/cats";
import { AppHeader } from "@/components/ui/headers";
import { Colors } from "@/constants/theme";
import { ICamera } from "@/interfaces/api/Cameras"; // Importando sua interface ICamera
import { ICat } from "@/interfaces/api/Cats";
import { getCameras } from "@/services/Cameras"; // Importando serviço de câmeras
import { getCats } from "@/services/Cats";
import { getUserData } from "@/storage/userDataManager";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image"; // Para renderizar a thumbnail da câmera
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mocks e interface local de Câmera removidos.

// --- Componente de Item da Câmera para a Home ---
const HomeCameraItem = ({
  camera,
  onPress,
}: {
  camera: ICamera;
  onPress: () => void;
}) => (
  <TouchableOpacity key={camera.id} style={styles.cameraItem} onPress={onPress}>
    <View style={styles.cameraImageContainer}>
      {camera.thumbnail ? (
        <Image
          source={{ uri: camera.thumbnail }}
          style={styles.cameraImage}
          contentFit='cover'
        />
      ) : (
        <View style={styles.cameraImagePlaceholder}>
          <Ionicons
            name='videocam-outline'
            size={30}
            color={Colors.defaultColors.gray300}
          />
        </View>
      )}
    </View>
    <Text style={styles.cameraText} numberOfLines={1}>
      {camera.name}
    </Text>
    {/* Adicione um indicador de status se a ICamera tiver o campo status */}
  </TouchableOpacity>
);

// --- Componente de Item de Serviço ---
const ServiceItem = ({
  icon,
  title,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={serviceStyles.item} onPress={onPress}>
    <Ionicons
      name={icon}
      size={24}
      color={Colors.defaultColors.white100}
      style={serviceStyles.icon}
    />
    <Text style={serviceStyles.title}>{title}</Text>
    <Ionicons
      name='chevron-forward-outline'
      size={24}
      color={Colors.defaultColors.gray200}
    />
  </TouchableOpacity>
);

// --- Tela Principal ---
export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  // Estados dos Gatos
  const [isLoadingCats, setIsLoadingCats] = useState(true);
  const [errorCats, setErrorCats] = useState<string | null>(null);
  const [cats, setCats] = useState<ICat[] | null>(null);

  // NOVOS Estados das Câmeras
  const [cameras, setCameras] = useState<ICamera[] | null>(null);
  const [isLoadingCameras, setIsLoadingCameras] = useState(true);
  const [errorCameras, setErrorCameras] = useState<string | null>(null);

  const navigateToRegister = () =>
    router.push({ pathname: "/(pages)/cats/cat-register" });
  const navigateToStats = () => console.log("Visualizar Estatísticas");
  const navigateToReports = () => console.log("Visualizar Relatórios");
  const navigateToSubscription = () => console.log("Gerenciar Assinatura");

  // --- Lógica de Fetch ---

  const handleGetUserData = async () => {
    const userData = await getUserData();
    if (userData) setUserName(userData.name);
  };

  const fetchCats = async () => {
    setIsLoadingCats(true);
    setErrorCats(null);
    try {
      const catsList = await getCats();
      if (catsList.data) {
        const favoriteCats: ICat[] = [];
        const nonFavoriteCats: ICat[] = [];
        for (const cat of catsList.data) {
          if (cat.favorite) {
            favoriteCats.push(cat);
          } else {
            nonFavoriteCats.push(cat);
          }
        }
        setCats([...favoriteCats]);
      } else {
        setCats([]); // Dados vieram, mas vazios
      }
    } catch (err) {
      setErrorCats("Não foi possível carregar os gatos.");
      console.log(err);
    } finally {
      setIsLoadingCats(false);
    }
  };

  const fetchCamerasHome = async () => {
    setIsLoadingCameras(true);
    setErrorCameras(null);
    try {
      const response = await getCameras();
      if (response.data) {
        // Exibimos apenas as 6 primeiras câmeras na home
        setCameras(response.data.slice(0, 6));
      } else {
        setCameras([]);
      }
    } catch (err) {
      console.error("Erro ao buscar câmeras para a Home:", err);
      setErrorCameras("Falha ao carregar câmeras.");
      setCameras([]);
    } finally {
      setIsLoadingCameras(false);
    }
  };

  useEffect(() => {
    handleGetUserData();
    fetchCats();
    fetchCamerasHome(); // Chamando o fetch de câmeras
  }, []);

  // --- Funções Auxiliares de Renderização ---

  const renderCameraContent = () => {
    if (isLoadingCameras) {
      return (
        <View style={styles.loadingPlaceholder}>
          <Ionicons
            name='refresh'
            size={24}
            color={Colors.defaultColors.gray300}
          />
          <Text style={styles.loadingText}>Carregando Câmeras...</Text>
        </View>
      );
    }

    if (errorCameras) {
      return (
        <View style={styles.emptyErrorContainer}>
          <Ionicons
            name='alert-circle-outline'
            size={30}
            color={Colors.defaultColors.danger}
          />
          <Text style={styles.errorTextHome}>{errorCameras}</Text>
        </View>
      );
    }

    if (!cameras || cameras.length === 0) {
      return (
        <View style={styles.emptyErrorContainer}>
          <Ionicons
            name='videocam-off-outline'
            size={30}
            color={Colors.defaultColors.gray300}
          />
          <Text style={styles.emptyTextHome}>Nenhuma câmera instalada.</Text>
        </View>
      );
    }

    return (
      <View style={styles.camerasGrid}>
        {cameras.map((cam) => (
          <HomeCameraItem
            key={cam.id}
            camera={cam}
            onPress={() => Alert.alert("clicou na cam")}
            // onPress={() => router.push({ pathname: "/cameras/[id]", params: { id: cam.id.toString() } })}
          />
        ))}
      </View>
    );
  };

  // Apenas o loading dos gatos é prioritário para a tela inteira (se necessário)
  // if (isLoadingCats) return <LoadingScreen />;

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title='Home'
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greetingText}>Welcome, {userName || "User"}!</Text>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorite cats</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/(tabs)/cats-list" })}>
              <Text style={styles.moreText}>see more →</Text>
            </TouchableOpacity>
          </View>

          {isLoadingCats ? (
            <View style={styles.loadingPlaceholderHorizontal}>
              <Ionicons
                name='refresh'
                size={24}
                color={Colors.defaultColors.gray300}
              />
              <Text style={styles.loadingText}>Carregando Gatos...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.favoritesContainer}>
              {cats && cats.length > 0 ? (
                cats.map((cat) => (
                  <View key={cat.id} style={styles.favoriteCardWrapper}>
                    <CatCard cat={cat} />
                  </View>
                ))
              ) : (
                <View style={styles.emptyErrorContainerHorizontal}>
                  <Ionicons
                    name='paw-outline'
                    size={30}
                    color={Colors.defaultColors.gray300}
                  />
                  <Text style={styles.emptyTextHome}>
                    Nenhum gato encontrado.
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>

        {/* --- SEÇÃO INSTALLED CAMERAS (Refatorada) --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Installed cameras</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/(tabs)/cameras" })}>
              <Text style={styles.moreText}>see more →</Text>
            </TouchableOpacity>
          </View>

          {renderCameraContent()}
        </View>

        {/* --- SEÇÃO SERVICES --- */}
        <View style={styles.section}>
          <Text style={styles.servicesSection}>Services</Text>

          <View style={serviceStyles.container}>
            <ServiceItem
              icon='paw-outline'
              title='Register a new cat'
              onPress={navigateToRegister}
            />
            <ServiceItem
              icon='stats-chart-outline'
              title='View statistics'
              onPress={navigateToStats}
            />
            <ServiceItem
              icon='document-text-outline'
              title='View reports'
              onPress={navigateToReports}
            />
            <ServiceItem
              icon='wallet-outline'
              title='Manage subscription'
              onPress={navigateToSubscription}
            />
          </View>
        </View>
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
    paddingBottom: 20,
  },
  greetingText: {
    fontSize: 18,
    color: Colors.defaultColors.gray100,
    fontWeight: "400",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.defaultColors.white100,
  },
  servicesSection: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.defaultColors.white100,
    paddingLeft: 18,
    paddingBottom: 8,
  },
  moreText: {
    fontSize: 14,
    color: Colors.defaultColors.green400,
  },
  // Gatos Favoritos
  favoritesContainer: {
    paddingHorizontal: 8,
  },
  favoriteCardWrapper: {
    width: 180,
    marginRight: 0,
  },
  // Câmeras
  camerasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 10, // Espaçamento entre os itens
  },
  cameraItem: {
    width: "48%", // Duas colunas com espaço no meio
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  cameraImageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: Colors.defaultColors.black300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 5,
  },
  cameraImage: {
    width: "100%",
    height: "100%",
  },
  cameraImagePlaceholder: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultColors.black300,
  },
  cameraText: {
    color: Colors.defaultColors.white100,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "left",
  },
  // Estados de Carregamento/Vazio/Erro
  loadingPlaceholder: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultColors.black300,
    marginHorizontal: 16,
    borderRadius: 8,
    opacity: 0.8,
  },
  loadingPlaceholderHorizontal: {
    height: 180, // Altura aproximada do carrossel
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultColors.black300,
    marginHorizontal: 16,
    borderRadius: 8,
    opacity: 0.8,
  },
  loadingText: {
    color: Colors.defaultColors.gray100,
    marginTop: 5,
    fontSize: 14,
  },
  emptyErrorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyErrorContainerHorizontal: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTextHome: {
    color: Colors.defaultColors.gray100,
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  errorTextHome: {
    color: Colors.defaultColors.danger,
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});

const serviceStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.defaultColors.purple300,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    flex: 1,
    color: Colors.defaultColors.white100,
    fontSize: 16,
    fontWeight: "500",
  },
});

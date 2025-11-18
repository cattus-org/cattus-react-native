import { CatCard } from "@/components/ui/cats";
import { AppHeader } from "@/components/ui/headers";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCats } from "@/services/Cats";
import { getUserData } from "@/storage/userDataManager";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Camera {
  id: number;
  name: string;
  image: string;
}

const MOCK_CAMERAS: Camera[] = [
  {
    id: 1,
    name: "Dormitório 2",
    image: "https://via.placeholder.com/150/000000?text=Cam+2",
  },
  {
    id: 2,
    name: "Dormitório 3",
    image: "https://via.placeholder.com/150/000000?text=Cam+3",
  },
  {
    id: 3,
    name: "Dormitório 4",
    image: "https://via.placeholder.com/150/000000?text=Cam+4",
  },
  {
    id: 4,
    name: "Dormitório 5",
    image: "https://via.placeholder.com/150/000000?text=Cam+5",
  },
  {
    id: 5,
    name: "Dormitório 6",
    image: "https://via.placeholder.com/150/000000?text=Cam+6",
  },
  {
    id: 6,
    name: "Área de lazer 1",
    image: "https://via.placeholder.com/150/000000?text=Area+1",
  },
];

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

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cats, setCats] = useState<ICat[] | null>(null);

  const navigateToRegister = () =>
    router.push({ pathname: "/(pages)/cats/cat-register" });
  const navigateToStats = () => console.log("Visualizar Estatísticas");
  const navigateToReports = () => console.log("Visualizar Relatórios");
  const navigateToSubscription = () => console.log("Gerenciar Assinatura");

  const handleGetUserData = async () => {
    const userData = await getUserData();
    console.log(userData);
    if (userData) setUserName(userData.name);
  };

  const fetchCats = async () => {
    setIsLoading(true);
    setError(null);
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
        setCats([...favoriteCats, ...nonFavoriteCats]);
      } else {
        setError("fail to find cats");
      }
    } catch (err) {
      setError("fail to find cats");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserData();
    fetchCats();
  }, []);

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title='Home'
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greetingText}>Welcome, {userName}!</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorite cats</Text>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/(tabs)/cats-list" })}>
              <Text style={styles.moreText}>see more →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoritesContainer}>
            {cats &&
              cats.length > 0 &&
              cats.map((cat) => (
                <View key={cat.id} style={styles.favoriteCardWrapper}>
                  <CatCard cat={cat} />
                </View>
              ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Installed cameras</Text>
            <TouchableOpacity onPress={() => console.log("Ver mais câmeras")}>
              <Text style={styles.moreText}>see more →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.camerasGrid}>
            {MOCK_CAMERAS.slice(0, 6).map((cam) => (
              <TouchableOpacity
                key={cam.id}
                style={styles.cameraItem}
                onPress={() => console.log(`Ver câmera ${cam.name}`)}>
                <View style={styles.cameraImagePlaceholder}>
                  <Text style={styles.cameraText}>{cam.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  cameraImagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.defaultColors.black300,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
    padding: 5,
  },
  cameraText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
    backgroundColor: Colors.defaultColors.purple300, // Use a cor roxa da imagem
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

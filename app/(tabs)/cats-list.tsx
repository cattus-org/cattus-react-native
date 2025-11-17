import { CatCard } from "@/components/ui/cats";
import { ExpandableFab } from "@/components/ui/fab";
import { AppHeader } from "@/components/ui/headers";
import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCats } from "@/services/Cats";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

export default function CatsList() {
  const [cats, setCats] = useState<ICat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const flatListRef = useRef(null);

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

  // jogar as funções disso num arquivo separado pra importar e usar?
  const handleNotification = () => {
    Alert.alert("clicou em notificações");
  };

  const handleProfile = () => {
    Alert.alert("clicou em perfil");
  };

  const handleCatRegister = () => {
    router.push({ pathname: "/(pages)/cats/cat-register" });
  };

  const fabOptions = [
    {
      iconName: "search-outline" as const,
      onPress: handleCatRegister,
      color: Colors.defaultColors.gray100, // Cinza
    },
    {
      iconName: "options-outline" as const,
      onPress: () => {},
      color: Colors.defaultColors.alert, // Vermelho/Alerta
    },
    {
      iconName: "paw-outline" as const, // Ícone de adicionar para gatos
      onPress: () => {},
      color: Colors.defaultColors.green400, // Verde
    },
  ].reverse();

  useEffect(() => {
    fetchCats();
  }, []);

  const renderCat = ({ item }: { item: ICat }) => <CatCard cat={item} />;

  //se não tiver gato, retornar um "nenhum gato encontrado"
  //TODO - adicionar safeareaview em todas as telas
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Gatos", headerShown: false }} />
      <AppHeader
        onNotificationPress={handleNotification}
        onProfilePress={handleProfile}
        title='Gatos'
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          ref={flatListRef}
          data={cats}
          renderItem={renderCat}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={fetchCats}
        />
      )}
      <ExpandableFab options={fabOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
  },
  header: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});

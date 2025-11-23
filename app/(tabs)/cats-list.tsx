import { CatCard } from "@/components/ui/cats";
import { ExpandableFab } from "@/components/ui/fab";
import { AppHeader } from "@/components/ui/headers";
import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCats } from "@/services/Cats";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

export default function CatsList() {
  const [cats, setCats] = useState<ICat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const flatListRef = useRef(null);

  const fetchCats = useCallback(async () => {
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
        setError("Falha ao carregar a lista de gatos. Tente novamente.");
      }
    } catch (err) {
      setError("Erro de conexão. Não foi possível buscar os gatos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCats();
      return () => {};
    }, [fetchCats])
  );

  const handleNotification = () => {
    Alert.alert("Notificações", "Você clicou em notificações");
  };

  const handleProfile = () => {
    Alert.alert("Perfil", "Você clicou em perfil");
  };

  const handleCatRegister = () => {
    router.push({ pathname: "/(pages)/cats/cat-register" });
  };

  const fabOptions = [
    {
      iconName: "paw-outline" as const,
      onPress: handleCatRegister,
      color: Colors.defaultColors.gray100,
    },
  ].reverse();

  const renderCat = ({ item }: { item: ICat }) => <CatCard cat={item} />;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.emptySubtitle}>
            Verifique sua conexão ou tente recarregar.
          </Text>
        </View>
      );
    }

    if (cats.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>Nenhum gato cadastrado</Text>
          <Text style={styles.emptySubtitle}>
            Parece que você ainda não adicionou nenhum gatinho. Use o botão +
            abaixo para começar!
          </Text>
        </View>
      );
    }

    return (
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
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Cats", headerShown: false }} />
      <AppHeader
        onNotificationPress={handleNotification}
        onProfilePress={handleProfile}
        title='Cats'
      />
      {renderContent()}
      <ExpandableFab options={fabOptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.defaultColors.background,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.defaultColors.gray300,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.defaultColors.gray200,
    textAlign: "center",
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.defaultColors.danger,
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});

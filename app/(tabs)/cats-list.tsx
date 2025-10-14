import { DefaultButton } from "@/components/ui/buttons";
import { CatCard } from "@/components/ui/cats";
import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/Cats";
import { getCats } from "@/services/Cats";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CatsList() {
  const [cats, setCats] = useState<ICat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const catsList = await getCats();
      if (catsList.data) {
        setCats(catsList.data);
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
    fetchCats();
  }, []);

  const renderCat = ({ item }: { item: ICat }) => <CatCard cat={item} />;

  //se não tiver gato, retornar um "nenhum gato encontrado"
  //TODO - adicionar safeareaview em todas as telas
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Gatos", headerShown: false }} />
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Gatos</Text>
        <DefaultButton text='Todos' onPress={() => {}} />
        <Text style={styles.resultsText}>
          Exibindo {cats.length} resultados
        </Text>
      </View>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={cats}
          renderItem={renderCat}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={fetchCats}
        />
      )}
    </SafeAreaView>
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

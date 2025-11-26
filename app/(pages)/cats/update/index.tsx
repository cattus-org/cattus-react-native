import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCats } from "@/services/Cats";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UpdateList() {
  const [cats, setCats] = useState<ICat[]>([]);
  const router = useRouter();

  const fetchCats = useCallback(async () => {
    try {
      const res = await getCats();
      if (res.data) setCats(res.data);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const renderItem = ({ item }: { item: ICat }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/cats/update/${item.id}`)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Editar gato" }} />
      <FlatList
        data={cats}
        renderItem={renderItem}
        keyExtractor={(c) => String(c.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.defaultColors.background,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: Colors.defaultColors.black200,
  },
  itemText: { color: Colors.defaultColors.gray100, fontSize: 16 },
});

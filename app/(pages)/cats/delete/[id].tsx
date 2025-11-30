import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { deleteCatById, getCatById } from "@/services/Cats";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DeleteCatScreen() {
  const { id } = useLocalSearchParams();
  const catId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [cat, setCat] = useState<ICat | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getCatById(Number(catId)).then((res) => {
      setCat(res.data || null);
      setLoading(false);
    });
  }, [catId]);

  const handleDelete = async () => {
    setDeleting(true);
    const ok = await deleteCatById(Number(catId));
    setDeleting(false);
    if (ok) {
      router.replace("/cats-list");
    } else {
      alert("Erro ao deletar o gato.");
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size='large'
        color={Colors.defaultColors.green300}
      />
    );

  if (!cat)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Gato não encontrado.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Confirmar exclusão", headerShown: true }}
      />
      <View style={styles.contentBox}>
        <Image
          source={{ uri: cat.picture }}
          style={styles.image}
          contentFit='cover'
        />
        <Text style={styles.name}>{cat.name}</Text>
        <Text style={styles.confirmText}>
          Tem certeza que deseja excluir este gato?
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.replace("/(tabs)/cats-list")}
            disabled={deleting}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            disabled={deleting}>
            <Text style={styles.deleteText}>
              {deleting ? "Excluindo..." : "Excluir"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    width: "90%",
    backgroundColor: Colors.defaultColors.black300,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  confirmText: {
    fontSize: 16,
    color: Colors.defaultColors.gray200,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    backgroundColor: Colors.defaultColors.gray300,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: Colors.defaultColors.danger,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

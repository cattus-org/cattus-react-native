import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCatById } from "@/services/Cats";
import { calculateAge, formatValue } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CatDetailsScreen() {
  const handleDelete = async () => {
    if (!cat) return;
    // Confirmação simples
    if (window.confirm) {
      const confirmed = window.confirm(
        `Tem certeza que deseja deletar o gato ${cat.name}?`
      );
      if (!confirmed) return;
    } else {
      // RN Alert
      // @ts-ignore
      if (global.Alert) {
        // @ts-ignore
        global.Alert.alert(
          "Deletar gato",
          `Tem certeza que deseja deletar o gato ${cat.name}?`,
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Deletar",
              style: "destructive",
              onPress: async () => await deleteCat(),
            },
          ]
        );
        return;
      }
    }
    await deleteCat();
  };

  const deleteCat = async () => {
    try {
      // Importação direta
      const ok = await import("@/services/Cats").then((mod) =>
        mod.deleteCatById(Number(catId))
      );
      if (ok) {
        router.replace("/cats-list");
      } else {
        // @ts-ignore
        if (global.Alert) {
          // @ts-ignore
          global.Alert.alert("Erro", "Não foi possível deletar o gato.");
        } else {
          console.log("Não foi possível deletar o gato.");
        }
      }
    } catch (error) {
      // @ts-ignore
      if (global.Alert) {
        // @ts-ignore
        global.Alert.alert("Erro", "Não foi possível deletar o gato.");
      } else {
        console.log(error);
      }
    }
  };
  const { id } = useLocalSearchParams();
  const catId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [cat, setCat] = useState<ICat | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCat = async () => {
    try {
      const catData = await getCatById(Number(catId));
      if (catData.data) {
        setCat(catData.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(() => {
    getCat();
  });

  if (isLoading) return <LoadingScreen />;

  if (!cat) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Gato não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const catAge = calculateAge(cat.birthDate);
  const catWeight = cat.weight ? `${cat.weight} kg` : "Não informado";
  const catVaccines = formatValue(cat.vaccines);
  const catCommorbidities = formatValue(cat.commorbidities);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: Colors.defaultColors.black300,
          },
          headerTintColor: Colors.defaultColors.green300,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}>
              <Ionicons
                name='arrow-back'
                size={24}
                color={Colors.defaultColors.green300}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: cat.picture }}
          style={styles.detailImage}
          contentFit='cover'
        />

        <View style={styles.infoBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={styles.nameDetail}>{cat.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push(`/cats/update/${cat.id}`)}>
                <Ionicons
                  name='create-outline'
                  size={24}
                  color={Colors.defaultColors.green300}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}>
                <Ionicons
                  name='trash-outline'
                  size={24}
                  color={Colors.defaultColors.danger}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='time-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Idade: {catAge}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name='body-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Sexo: {formatValue(cat.sex)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='scale-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Peso: {catWeight}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name='ribbon-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>
              Status: {formatValue(cat.status)}
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Saúde e cuidados</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name='bandage-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Vacinas: {catVaccines}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='medkit-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>
              Comorbidades: {catCommorbidities}
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Sobre {cat.name}</Text>
          <Text style={styles.descriptionText}>
            {formatValue(cat.observations)}
          </Text>
          <Text style={styles.auditText}>
            Registrado em:{" "}
            {formatValue(cat.createdAt ? new Date(cat.createdAt) : undefined)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.defaultColors.black300,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.defaultColors.black300,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    color: "white",
  },
  detailImage: {
    width: "100%",
    height: 350,
  },
  infoBox: {
    padding: 20,
  },
  nameDetail: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: Colors.defaultColors.gray100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 30,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.defaultColors.gray200,
    lineHeight: 24,
  },
  auditText: {
    fontSize: 12,
    color: Colors.defaultColors.gray300,
    marginTop: 20,
    textAlign: "right",
  },
});

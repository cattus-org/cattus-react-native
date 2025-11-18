import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCatById } from "@/services/Cats";
import { calculateAge, formatValue } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
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
              onPress={() => router.back()} // Ação Voltar
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
          <Text style={styles.nameDetail}>{cat.name}</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name='time-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Age: {catAge}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name='body-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Sex: {formatValue(cat.sex)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='scale-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Weight: {catWeight}</Text>
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
          <Text style={styles.sectionTitle}>Health and Care</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name='bandage-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>Vaccines: {catVaccines}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='medkit-outline'
              size={16}
              color={Colors.defaultColors.gray100}
            />
            <Text style={styles.detailText}>
              Commorbidities: {catCommorbidities}
            </Text>
          </View>
          <Text style={styles.sectionTitle}>About {cat.name}</Text>
          <Text style={styles.descriptionText}>
            {formatValue(cat.observations)}
          </Text>
          <Text style={styles.auditText}>
            Registered in:{" "}
            {formatValue(cat.createdAt ? new Date(cat.createdAt) : undefined)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

import { AppHeader } from "@/components/ui/headers";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddOptionsScreen() {
  const router = useRouter();

  const handleStartNewRegistration = () => {
    // abrir a rota do wizard de registro
    router.push("/cats/register/wizard");
  };

  const handleGoBack = () => {
    router.replace("/(tabs)/cats-list");
  };

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <AppHeader
        title='Register a Cat'
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/green_cat.png")}
            style={styles.illustrationImage}
            contentFit='contain'
          />
        </View>

        <Text style={styles.mainTitle}>Cadastrar gato</Text>

        {/* <Text style={styles.description}>
          The cat registration process has 5 steps. The first two are
          **MANDATORY** and add the cat to the system, while the last three are
          optional.
        </Text> */}

        <View style={styles.spacer} />
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleStartNewRegistration}
          activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
          <Ionicons
            name='paw'
            size={20}
            color='white'
            style={styles.buttonIcon}
          />
          <Ionicons name='add' size={20} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGoBack}
          activeOpacity={0.7}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  imageContainer: {
    marginVertical: 30,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imagePlaceholder: {
    color: "white",
    fontSize: 20,
    backgroundColor: Colors.defaultColors.black300,
    padding: 20,
    borderRadius: 10,
  },
  illustrationImage: {
    width: "80%",
    height: "100%",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.defaultColors.gray100,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.defaultColors.gray200,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 15,
  },
  instruction: {
    fontSize: 14,
    color: Colors.defaultColors.gray200,
    textAlign: "center",
    lineHeight: 20,
    fontStyle: "italic",
    marginBottom: 30,
  },
  spacer: {
    flex: 1,
  },
  button: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: Colors.defaultColors.green400,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: Colors.defaultColors.green400,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginRight: 4,
  },
});

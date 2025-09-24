import { DefaultButton } from "@/components/ui/buttons";
import { DefaultTextInput } from "@/components/ui/textInputs";
import { Colors } from "@/constants/theme";
import { Authenticate } from "@/services/Login";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const cattusLogo = require("@/assets/images/logo/tipo.png");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const auth = await Authenticate(email, password);
      if (!auth.success) {
        Alert.alert("erro", `${auth.message}`);
        return;
      }

      Alert.alert("Deu certo", `token: ${auth.data?.token}`);
    } catch (error) {
      Alert.alert("erro", `erro desconhecido`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />

      <Image
        source={cattusLogo}
        contentFit='contain'
        style={{ width: 240, height: 100, marginBottom: 12 }}
        transition={1000}
      />

      <DefaultTextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <DefaultTextInput
        style={styles.input}
        placeholder='Senha'
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry={true}
      />

      <DefaultButton
        text='Entrar'
        onPress={() => handleLogin()}
        isLoading={isLoading}
        disabled={isLoading}
      />

      <Text style={styles.link}>Ainda não tem uma conta? Crie uma aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.defaultColors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: Colors.defaultColors.gray200,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: Colors.defaultColors.gray200,
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: Colors.defaultColors.green200,
  },
  buttonText: {
    color: "#fff", // Cor do texto
    fontSize: 16,
    fontWeight: "bold",
  },
});

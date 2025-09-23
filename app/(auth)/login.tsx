// app/(auth)/login.tsx

import { Authenticate } from "@/services/Login";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor preencha todos os campos");
      return;
    }

    //add setLoading(true)
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
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Login" }} />

      <Text style={styles.title}>Cattus</Text>

      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder='Senha'
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleLogin();
        }}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  link: {
    marginTop: 20,
    color: "blue",
  },
  button: {
    backgroundColor: "#007bff", // Cor de fundo do seu botão
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%", // Para que o botão ocupe a largura total
    alignItems: "center", // Centraliza o texto horizontalmente
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", // Cor do texto
    fontSize: 16,
    fontWeight: "bold",
  },
});

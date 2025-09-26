import { DefaultButton } from "@/components/ui/buttons";
import { DefaultTextInput } from "@/components/ui/textInputs";
import { Colors } from "@/constants/theme";
import { Authenticate } from "@/services/Login";
import { messageTransformer } from "@/utils/utils";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

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
        const message = messageTransformer(auth.message);
        Alert.alert("erro", message);
        return;
      }

      Alert.alert("Deu certo", `token: ${auth.data?.token}`);
    } catch (error) {
      Alert.alert("Erro", `erro desconhecido`);
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
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <DefaultTextInput
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

      <Link href='/register' style={styles.link}>
        Ainda não tem uma conta? Crie uma aqui.
      </Link>
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
  link: {
    marginTop: 20,
    color: Colors.defaultColors.green200,
  },
});

import { DefaultButton } from "@/components/ui/buttons";
import { DefaultTextInput } from "@/components/ui/textInputs";
import { Colors } from "@/constants/theme";
import { Authenticate, VerifyToken } from "@/services/Login";
import { saveToken } from "@/storage/tokenManager";
import { saveUserData } from "@/storage/userDataManager";
import { messageTransformer } from "@/utils/utils";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

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
    //TODO - adicionar validação com zod
    try {
      const auth = await Authenticate(email, password);
      if (!auth.success || !auth.data?.token) {
        const message = messageTransformer(auth.message);
        Alert.alert("erro", message);
        return;
      }
      if (auth.data?.token) await saveToken(auth.data.token);
      const userData = await VerifyToken();
      if (userData.data) await saveUserData(userData.data);

      router.replace("/(tabs)");
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
        placeholder='email'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <DefaultTextInput
        placeholder='password'
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry={true}
      />

      <DefaultButton
        text='sign in'
        onPress={() => handleLogin()}
        isLoading={isLoading}
        disabled={isLoading}
      />

      {/* <Link href='/register' style={styles.link}>
        Ainda não tem uma conta? Crie uma aqui.
      </Link> */}
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

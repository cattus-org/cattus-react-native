import { DefaultButton } from "@/components/ui/buttons";
import { DefaultTextInput } from "@/components/ui/textInputs";
import { Spacer } from "@/components/ui/views";
import { Colors } from "@/constants/theme";
import {
  RegisterSchema,
  TRegisterForm,
} from "@/domain/validators/fieldsValidators";
import { IRegisterUser } from "@/interfaces/Register";
import { RegisterUser } from "@/services/Register";
import { messageTransformer } from "@/utils/utils";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function RegisterScreen() {
  const [registerData, setRegisterData] = useState<IRegisterUser>({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<TRegisterForm>>({});

  const handleRegister = async () => {
    if (registerData.password !== confirmPassword) {
      Alert.alert("Erro", "As senhas precisam ser iguais");
      return;
    }

    setIsLoading(true);
    setErrors({});
    const validationResult = RegisterSchema.safeParse(registerData);

    if (!validationResult.success) {
      const newErrors: Partial<TRegisterForm> = {};

      for (const error of validationResult.error.issues) {
        const key = error.path[0] as keyof TRegisterForm;
        if (!newErrors[key]) {
          newErrors[key] = error.message;
        }
      }

      setErrors(newErrors);
      Alert.alert(
        "Erro de validação",
        messageTransformer(Object.values(errors))
      );
      setIsLoading(false);
      return;
    }

    try {
      const register = await RegisterUser(registerData);
      if (!register.success) {
        const message = messageTransformer(register.message);
        Alert.alert("Erro", message);
        return;
      }
      Alert.alert("Sucesso", "Usuário criado com sucesso, faça o login");
    } catch (error) {
      Alert.alert("Erro", `erro desconhecido`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DefaultTextInput
        placeholder='Nome'
        value={registerData.name}
        onChangeText={(name) => setRegisterData({ ...registerData, name })}
      />
      <Spacer height={8} />
      <DefaultTextInput
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={registerData.email}
        onChangeText={(email) => setRegisterData({ ...registerData, email })}
      />
      <Spacer height={8} />
      <DefaultTextInput
        placeholder='Senha'
        secureTextEntry={true}
        autoCapitalize='none'
        value={registerData.password}
        onChangeText={(password) =>
          setRegisterData({ ...registerData, password })
        }
      />
      <Spacer height={8} />
      <DefaultTextInput
        placeholder='Senha novamente'
        secureTextEntry={true}
        autoCapitalize='none'
        value={confirmPassword}
        onChangeText={(password) => setConfirmPassword(password)}
      />
      <Spacer height={8} />
      <DefaultButton
        text='Cadastrar'
        onPress={handleRegister}
        isLoading={isLoading}
        disabled={isLoading}
      />
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
});

import { DefaultButton } from "@/components/ui/buttons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterProvider, useRegister } from "./RegisterContext";
import Step1Basic from "./steps/Step1Basic";
import Step2Photo from "./steps/Step2Photo";
import Step5ComorbidityVaccines from "./steps/Step5ComorbidityVaccines";
import styles, { progressStyle } from "./styles";

const Steps = [Step1Basic, Step2Photo, Step5ComorbidityVaccines];

const WizardInner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { data } = useRegister();
  const router = useRouter();
  const Step = Steps[index];

  // next is inlined to allow validation per-step
  const [errors, setErrors] = React.useState<string | null>(null);

  const validateCurrent = () => {
    setErrors(null);
    // step 0: name, birthDate, sex required
    if (index === 0) {
      if (!data.name?.trim()) return "Nome é obrigatório";
      if (!data.birthDate) return "Data de nascimento é obrigatória";
      if (!data.sex) return "Sexo é obrigatório";
    }
    // step 1: picture required
    if (index === 1) {
      if (!data.picture) return "Foto de perfil é obrigatória";
    }
    return null;
  };
  const back = () => {
    setErrors(null);
    if (index === 0) return router.back();
    setIndex((i) => Math.max(i - 1, 0));
  };

  const finish = () => {
    const err = validateCurrent();
    if (err) return setErrors(err);
    console.log("CatRegistration payload:", data);
    Alert.alert(
      "Dados prontos",
      "Os dados estão prontos para enviar. Veja o console."
    );
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Cadastrar gato</Text>
        <Text style={{ color: "#888" }}>
          {index + 1}/{Steps.length}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={
            progressStyle(Math.round(((index + 1) / Steps.length) * 100)) as any
          }
        />
      </View>
      <View style={styles.stepContainer}>
        <Step />
      </View>

      {errors ? <Text style={styles.errorText}>{errors}</Text> : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 12,
          gap: 16,
        }}>
        <View style={{ flex: 1 }}>
          <DefaultButton text='Voltar' onPress={back} />
        </View>
        <View style={{ flex: 1 }}>
          {index < Steps.length - 1 ? (
            <DefaultButton
              text='Prosseguir'
              onPress={() => {
                const err = validateCurrent();
                if (err) return setErrors(err);
                setIndex((i) => Math.min(i + 1, Steps.length - 1));
              }}
            />
          ) : (
            <DefaultButton text='Finalizar' onPress={finish} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const Wizard: React.FC = () => (
  <RegisterProvider>
    <WizardInner />
  </RegisterProvider>
);

export default Wizard;

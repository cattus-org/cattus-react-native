import { DefaultButton } from "@/components/ui/buttons";
import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { getCatById, updateCatById, uploadImage } from "@/services/Cats";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { RegisterProvider, useRegister } from "../register/RegisterContext";
import Step1Basic from "../register/steps/Step1Basic";
import Step2Photo from "../register/steps/Step2Photo";
import Step5ComorbidityVaccines from "../register/steps/Step5ComorbidityVaccines";
import sharedStyles from "../register/styles";

function EditCatInner({ cat }: { cat: ICat }) {
  const { setField } = useRegister();

  // prefill context once
  React.useEffect(() => {
    setField("name", cat.name);
    setField("birthDate", cat.birthDate ? String(cat.birthDate) : undefined);
    setField("picture", cat.picture ?? undefined);
    setField("sex", (cat as any).sex ?? undefined);
    setField("observations", cat.observations ?? "");
    setField("vaccines", cat.vaccines ?? []);
    setField("comorbidities", (cat as any).commorbidities ?? []);
    setField("weight", cat.weight ?? undefined);
    // favorite left unchanged
  }, [cat, setField]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ width: "100%", maxWidth: 600 }}>
        <Text
          style={[sharedStyles.title, { color: Colors.defaultColors.gray100 }]}>
          {cat.name}
        </Text>
        <Step1Basic />
        <Step2Photo />
        <Step5ComorbidityVaccines />
        <UpdateActions catId={cat.id} />
      </View>
    </ScrollView>
  );
}

function UpdateActions({ catId }: { catId: number }) {
  const { data } = useRegister();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onUpdate = async () => {
    setLoading(true);
    try {
      const payload: any = { ...data };
      // upload local picture if needed
      if (
        payload.picture &&
        typeof payload.picture === "string" &&
        payload.picture.startsWith("file")
      ) {
        const url = await uploadImage(payload.picture);
        if (url) payload.picture = url;
        else delete payload.picture;
      }

      const res = await updateCatById(catId, payload);
      if (res && res.success) {
        Alert.alert("Sucesso", "Gato atualizado com sucesso");
        router.replace("/(tabs)/cats-list");
      } else {
        Alert.alert(
          "Erro",
          Array.isArray(res.message)
            ? res.message.join("\n")
            : (res.message as string)
        );
      }
    } catch (e: any) {
      Alert.alert("Erro", e?.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultButton
      isLoading={loading}
      text='Atualizar'
      onPress={onUpdate}
      disabled={loading}
    />
  );
}

export default function EditCatScreen() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const [cat, setCat] = useState<ICat | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCatById(id);
        if (res.data) setCat(res.data);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar o gato");
        router.replace("/(tabs)/cats-list");
      }
    };
    load();
  }, [id, router]);

  if (!cat) return null;

  return (
    <RegisterProvider>
      <Stack.Screen options={{ title: `Editar ${cat.name}` }} />
      <EditCatInner cat={cat} />
    </RegisterProvider>
  );
}

// no local styles needed

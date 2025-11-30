import { DefaultTextInput } from "@/components/ui/textInputs";
import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRegister } from "../RegisterContext";
import sharedStyles from "../styles";
type ChipsInputProps = {
  values: string[];
  onAdd: (v: string) => void;
  onRemove: (idx: number) => void;
  placeholder?: string;
};

function ChipsInput({ values, onAdd, onRemove, placeholder }: ChipsInputProps) {
  const [text, setText] = useState("");
  return (
    <View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
        {values.map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onRemove(i)}
            style={{
              backgroundColor: Colors.defaultColors.green400,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              marginRight: 8,
              marginBottom: 8,
            }}>
            <Text style={{ color: Colors.defaultColors.black400 }}>{v} ×</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: "row" }}>
        <DefaultTextInput
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          style={{ flex: 1, marginRight: 8 }}
          rightRadiusProps={0}
        />
        <TouchableOpacity
          onPress={() => {
            if (text.trim()) {
              onAdd(text.trim());
              setText("");
            }
          }}
          style={{
            backgroundColor: Colors.defaultColors.green400,
            paddingHorizontal: 16,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            justifyContent: "center",
            height: 52,
          }}>
          <Text style={{ color: Colors.defaultColors.white100 }}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Step5ComorbidityVaccines() {
  const { data, setField } = useRegister();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
      }}>
      <View style={{ width: "100%", maxWidth: 400 }}>
        <Text
          style={[
            sharedStyles.label,
            { color: Colors.defaultColors.white100 },
          ]}>
          Comorbidades
        </Text>
        <ChipsInput
          values={data.comorbidities ?? []}
          onAdd={(v) =>
            setField("comorbidities", [...(data.comorbidities ?? []), v])
          }
          onRemove={(i) =>
            setField(
              "comorbidities",
              (data.comorbidities ?? []).filter((_, idx) => idx !== i)
            )
          }
          placeholder='Adicionar comorbidade'
        />

        <Text
          style={[
            sharedStyles.label,
            { color: Colors.defaultColors.white100 },
          ]}>
          Vacinas
        </Text>
        <ChipsInput
          values={data.vaccines ?? []}
          onAdd={(v) => setField("vaccines", [...(data.vaccines ?? []), v])}
          onRemove={(i) =>
            setField(
              "vaccines",
              (data.vaccines ?? []).filter((_, idx) => idx !== i)
            )
          }
          placeholder='Adicionar vacina'
        />
      </View>
    </ScrollView>
  );
}

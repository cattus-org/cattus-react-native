import { DefaultTextInput } from "@/components/ui/textInputs";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRegister } from "../RegisterContext";
import sharedStyles from "../styles";

const Step3Physical: React.FC = () => {
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
        <Text style={sharedStyles.label}>Peso (kg)</Text>
        <DefaultTextInput
          keyboardType='numeric'
          value={data.weight ? String(data.weight) : ""}
          onChangeText={(t) => setField("weight", t ? Number(t) : undefined)}
          placeholder='Ex: 4.5'
        />
      </View>
    </ScrollView>
  );
};

// styles removed; using sharedStyles and theme

export default Step3Physical;

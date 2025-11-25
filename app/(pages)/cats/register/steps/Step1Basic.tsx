import { DefaultTextInput } from "@/components/ui/textInputs";
import { Colors } from "@/constants/theme";
import { CatSex } from "@/interfaces/api/CatRegistration";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRegister } from "../RegisterContext";
import sharedStyles from "../styles";

const Step1Basic: React.FC = () => {
  const { data, setField } = useRegister();
  const [showDate, setShowDate] = useState(false);

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
            { color: Colors.defaultColors.green300 },
          ]}>
          Nome
        </Text>
        <DefaultTextInput
          value={data.name}
          onChangeText={(t) => setField("name", t)}
          placeholder='Nome do gato'
        />

        <Text
          style={[
            sharedStyles.label,
            { color: Colors.defaultColors.green300 },
          ]}>
          Data nascimento
        </Text>
        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={[
            sharedStyles.input,
            {
              justifyContent: "center",
              backgroundColor: Colors.defaultColors.black100,
            },
          ]}>
          <Text
            style={{
              color: data.birthDate
                ? Colors.defaultColors.white100
                : Colors.defaultColors.gray300,
            }}>
            {data.birthDate
              ? dayjs(data.birthDate).format("YYYY-MM-DD")
              : "Selecione a data"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDate}
          mode='date'
          onConfirm={(d: Date) => {
            setShowDate(false);
            setField("birthDate", dayjs(d).format("YYYY-MM-DD"));
          }}
          onCancel={() => setShowDate(false)}
        />

        <Text
          style={[
            sharedStyles.label,
            { color: Colors.defaultColors.green300 },
          ]}>
          Sexo
        </Text>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {Object.values(CatSex).map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                {
                  padding: 10,
                  backgroundColor: Colors.defaultColors.black200,
                  borderRadius: 6,
                  marginRight: 8,
                  borderWidth: 2,
                  borderColor:
                    data.sex === s
                      ? Colors.defaultColors.green300
                      : Colors.defaultColors.black300,
                },
              ]}
              onPress={() => setField("sex", s as any)}>
              <Text style={{ color: Colors.defaultColors.white100 }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={[
            sharedStyles.label,
            { color: Colors.defaultColors.green300 },
          ]}>
          Observação
        </Text>
        <DefaultTextInput
          style={[
            sharedStyles.input,
            { height: 100, textAlignVertical: "top" },
          ]}
          multiline
          value={data.observations}
          onChangeText={(t) => setField("observations", t)}
          placeholder='Observações'
        />
      </View>
    </ScrollView>
  );
};

export default Step1Basic;

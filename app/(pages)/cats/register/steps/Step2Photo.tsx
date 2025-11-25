import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRegister } from "../RegisterContext";
import sharedStyles from "../styles";

const Step2Photo: React.FC = () => {
  const { data, setField } = useRegister();

  const pickFromDevice = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted)
      return alert("Permissão necessária para acessar fotos");
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      allowsEditing: true,
      base64: false,
    });
    // new API: result.canceled and result.assets
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setField("picture", result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return alert("Permissão necessária para câmera");
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.6,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setField("picture", result.assets[0].uri);
    }
  };

  return (
    <View>
      <Text style={sharedStyles.label}>Foto de perfil (obrigatório)</Text>
      <View style={sharedStyles.preview}>
        {data.picture ? (
          <Image
            source={{ uri: data.picture }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#888" }}>Nenhuma foto</Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={sharedStyles.smallBtn}
          onPress={pickFromDevice}>
          <Text style={{ color: "#fff" }}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={sharedStyles.smallBtn} onPress={takePhoto}>
          <Text style={{ color: "#fff" }}>Câmera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step2Photo;

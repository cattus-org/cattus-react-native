import { Colors } from "@/constants/theme";
import { ICamera } from "@/interfaces/api/Cameras";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export const CameraCard = ({
  camera,
  onPress,
}: {
  camera: ICamera;
  onPress: () => void;
}) => (
  <TouchableOpacity style={cameraStyles.cardContainer} onPress={onPress}>
    <View style={cameraStyles.cardContent}>
      {/* 1. Imagem da Câmera (usando thumbnail ou placeholder) */}
      {camera.thumbnail ? (
        <Image
          source={{ uri: camera.thumbnail }}
          style={cameraStyles.image}
          contentFit='cover'
        />
      ) : (
        <View style={cameraStyles.imagePlaceholder}>
          <Ionicons
            name='videocam-off'
            size={40}
            color={Colors.defaultColors.gray200}
          />
          <Text style={cameraStyles.placeholderText}>Sem Thumbnail</Text>
        </View>
      )}

      <View style={cameraStyles.infoOverlay}>
        <Text style={cameraStyles.infoText} numberOfLines={1}>
          {camera.name}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const cameraStyles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  cardContent: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.defaultColors.black300,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.defaultColors.black300,
  },
  placeholderText: {
    color: Colors.defaultColors.gray200,
    marginTop: 5,
    fontSize: 12,
  },
  statusDot: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  infoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  infoTextStatus: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

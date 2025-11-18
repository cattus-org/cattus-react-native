import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/api/Cats";
import { updateFavorite } from "@/services/Cats";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STATUS_COLORS = {
  ok: Colors.defaultColors.ok,
  alert: Colors.defaultColors.alert,
  danger: Colors.defaultColors.danger,
  UNDEFINED: Colors.defaultColors.gray200,
};

export const CatCard = ({ cat }: { cat: ICat }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(cat.favorite);

  const status = cat.status ?? "UNDEFINED";
  const statusColor = STATUS_COLORS[status];
  const imageSource = cat.picture;

  const navigateToDetails = () => {
    router.push({ pathname: "/(pages)/cats/[id]", params: { id: cat.id } });
  };

  const toggleFavorite = async () => {
    await updateFavorite(cat.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={navigateToDetails}>
      <View
        style={[
          styles.cardContent,
          { borderColor: Colors.defaultColors.white100 },
        ]}>
        <Image source={imageSource} style={styles.image} contentFit='cover' />
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <TouchableOpacity style={styles.favoriteStar} onPress={toggleFavorite}>
          <AntDesign
            name='star'
            size={18}
            color={isFavorite ? Colors.defaultColors.alert : "white"}
          />
        </TouchableOpacity>
        <View style={styles.infoBox}>
          <Text
            style={[styles.nameText, { color: Colors.defaultColors.white100 }]}
            numberOfLines={1}>
            {cat.name}
          </Text>
          <View style={styles.detailsRow}>
            <Text
              style={[
                styles.detailText,
                { color: Colors.defaultColors.white100 },
              ]}>
              {cat.sex === "fêmea" ? "Female" : "Male"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 8,
    //maxWidth: "50%",
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
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 180,
  },
  statusDot: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 16,
    height: 16,
    borderRadius: 20,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  favoriteStar: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },
  infoBox: {
    padding: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  detailText: {
    fontSize: 12,
  },
  cidText: {
    fontSize: 12,
    color: "#888",
    marginLeft: "auto",
  },
});

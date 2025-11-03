import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/Cats";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const STATUS_COLORS = {
  ok: Colors.defaultColors.ok,
  alert: Colors.defaultColors.alert,
  danger: Colors.defaultColors.danger,
  UNDEFINED: Colors.defaultColors.gray200,
};

export const CatCard = ({ cat }: { cat: ICat }) => {
  const status = cat.status ?? "UNDEFINED";
  const statusColor = STATUS_COLORS[status];
  const imageSource = cat.picture;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Image source={imageSource} style={styles.image} contentFit='cover' />
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <View style={styles.favoriteStar}>
          <AntDesign name='star' size={18} color='white' />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.nameText} numberOfLines={1}>
            {cat.name}
          </Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{cat.sex}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 8,
    maxWidth: "50%",
  },
  cardContent: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: "100%",
    height: 180,
  },
  statusDot: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 10,
    borderWidth: 2,
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
    color: "#666",
  },
  cidText: {
    fontSize: 12,
    color: "#888",
    marginLeft: "auto",
  },
});

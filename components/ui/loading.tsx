import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingScreen = () => {
  const cattusCat = require("@/assets/images/logo/full-white-cat.png");

  return (
    <SafeAreaView style={styles.container}>
      <Image source={cattusCat} style={styles.catImage} contentFit='contain' />
      <ActivityIndicator
        size='large'
        color={Colors.defaultColors.white100}
        style={styles.indicator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  catImage: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  indicator: {
    marginTop: 20,
  },
});

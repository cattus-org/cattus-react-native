import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppHeaderProps {
  title: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  notificationCount?: number;
}

export const AppHeader = ({
  title,
  onNotificationPress = () => {},
  onProfilePress = () => {},
  notificationCount = 0,
}: AppHeaderProps) => {
  const router = useRouter();

  const navigateToProfile = () => router.push({ pathname: "/(pages)/profile" });

  const fallbackImage =
    "https://images.fineartamerica.com/images-medium-large-5/serious-cat-square-dog-photography.jpg";

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: fallbackImage }}
            contentFit='cover'
            placeholder='profile picture'
          />
        </TouchableOpacity>

        <Text style={styles.titleText}>{title}</Text>

        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.notificationContainer}>
          <Ionicons
            name='notifications-outline'
            size={28}
            color={Colors.defaultColors.gray100}
          />
          {!!notificationCount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 9 ? "9+" : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.defaultColors.background,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 52,
  },

  profileContainer: {},
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.defaultColors.green300,
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",

    flex: 1,
    textAlign: "center",

    marginLeft: 10,
    marginRight: 10,
  },

  notificationContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

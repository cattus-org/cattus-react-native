import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppHeaderProps {
  title: string;
  profileImageUrl: string;
  onNotificationPress: () => void;
  onProfilePress: () => void;
  notificationCount?: number;
}

export const AppHeader = ({
  title,
  profileImageUrl,
  onNotificationPress,
  onProfilePress,
  notificationCount = 0,
}: AppHeaderProps) => {
  const fallbackImage =
    "https://www.petsupport.com.br/wp-content/uploads/2022/02/pelo-do-gato-1024x640.jpg";

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onProfilePress}
          style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: profileImageUrl || fallbackImage }}
            contentFit='cover'
            placeholder={profileImageUrl || fallbackImage}
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
          {notificationCount && notificationCount > 0 && (
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
    height: 60,
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

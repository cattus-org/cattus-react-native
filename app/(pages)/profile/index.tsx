import { LoadingScreen } from "@/components/ui/loading";
import { Colors } from "@/constants/theme";
import { IUser } from "@/interfaces/api/Users";
import { removeToken } from "@/storage/tokenManager";
import { getUserData } from "@/storage/userDataManager";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

interface LogoutConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmationOverlay = ({
  onConfirm,
  onCancel,
}: LogoutConfirmationProps) => (
  <View style={overlayStyles.overlay}>
    <View style={overlayStyles.modalCard}>
      <Text style={overlayStyles.title}>Log Out</Text>
      <Text style={overlayStyles.message}>
        Are you sure you want to log out?
      </Text>

      <View style={overlayStyles.buttonContainer}>
        <TouchableOpacity
          style={[overlayStyles.button, overlayStyles.cancelButton]}
          onPress={onCancel}>
          <Text style={overlayStyles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[overlayStyles.button, overlayStyles.confirmButton]}
          onPress={onConfirm}>
          <Text style={overlayStyles.confirmButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      } else {
        router.replace("/(auth)/login");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Could not load profile data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsConfirmingLogout(true);
  };

  const performLogout = async () => {
    setIsConfirmingLogout(false);
    try {
      await removeToken();
      router.replace("/(auth)/login");
    } catch (e) {
      console.error("Error during logout:", e);
      router.replace("/(auth)/login");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Stack.Screen
          options={{
            title: "Perfil",
            headerStyle: { backgroundColor: Colors.defaultColors.background },
            headerTintColor: Colors.defaultColors.white100,
            headerTitleStyle: { fontWeight: "bold" },
            headerShadowVisible: false,
          }}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* <TouchableOpacity
            onPress={handleReturnToHome}
            style={styles.customBackButton}>
            <Ionicons
              name='arrow-back'
              size={28}
              color={Colors.defaultColors.white100}
            />
          </TouchableOpacity> */}

          <View style={styles.errorContainer}>
            <Ionicons
              name='warning-outline'
              size={30}
              color={Colors.defaultColors.danger}
            />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchUserProfile}>
              <Text style={styles.retryButtonText}>Tente novamente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Stack.Screen
        options={{
          title: "Perfil",
          headerStyle: { backgroundColor: Colors.defaultColors.background },
          headerTintColor: Colors.defaultColors.white100,
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.customBackButton}>
          <Ionicons
            name='arrow-back'
            size={28}
            color={Colors.defaultColors.white100}
          />
        </TouchableOpacity>
        <View style={styles.headerBlock}>
          <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
          <Text style={styles.userEmail}>
            {user?.email || "No email registered"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes da conta</Text>

          {user && (
            <View style={{ marginTop: 5 }}>
              <DetailRow label='Nome' value={user.name} />
              <DetailRow label='E-mail' value={user.email} />
              <DetailRow
                label='nível de acesso'
                value={user.access_level || "Padrão"}
              />
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name='log-out-outline'
            size={24}
            color={Colors.defaultColors.danger}
          />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
      {isConfirmingLogout && (
        <LogoutConfirmationOverlay
          onConfirm={performLogout}
          onCancel={() => setIsConfirmingLogout(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.defaultColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  customBackButton: {
    position: "absolute",
    top: 10,
    left: 16,
    padding: 5,
    zIndex: 10,
  },
  headerBlock: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.defaultColors.white100,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    color: Colors.defaultColors.gray200,
    textAlign: "center",
  },
  card: {
    backgroundColor: Colors.defaultColors.black300,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.defaultColors.white100,
    marginBottom: 15,
    borderBottomColor: Colors.defaultColors.gray400,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.defaultColors.gray400,
  },
  detailLabel: {
    fontSize: 15,
    color: Colors.defaultColors.gray100,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 15,
    color: Colors.defaultColors.white100,
    fontWeight: "400",
    flexShrink: 1,
    textAlign: "right",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.defaultColors.black300,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: Colors.defaultColors.danger,
  },
  logoutButtonText: {
    marginLeft: 10,
    color: Colors.defaultColors.danger,
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.defaultColors.background,
  },
  errorText: {
    color: Colors.defaultColors.danger,
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.defaultColors.green300,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.defaultColors.black300,
    fontWeight: "bold",
  },
});

const overlayStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalCard: {
    width: "80%",
    backgroundColor: Colors.defaultColors.black200,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.defaultColors.white100,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: Colors.defaultColors.gray100,
    textAlign: "center",
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.defaultColors.gray400,
  },
  cancelButtonText: {
    color: Colors.defaultColors.white100,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: Colors.defaultColors.danger,
  },
  confirmButtonText: {
    color: Colors.defaultColors.white100,
    fontWeight: "600",
  },
});

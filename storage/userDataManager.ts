import { IUser } from "@/interfaces/api/Users";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveUserData(user: IUser) {
  await AsyncStorage.setItem("userData", JSON.stringify(user));
}

export async function getUserData() {
  const userDataString = await AsyncStorage.getItem("userData");
  if (!userDataString) return null;
  const userData: IUser = await JSON.parse(userDataString!);
  return userData;
}

export async function removeUserData() {
  await AsyncStorage.removeItem("userData");
}

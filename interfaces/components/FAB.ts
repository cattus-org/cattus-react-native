import { Ionicons } from "@expo/vector-icons";

export interface IFabOption {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color: string;
}

export interface IExpandableFABProps {
  options: IFabOption[];
}

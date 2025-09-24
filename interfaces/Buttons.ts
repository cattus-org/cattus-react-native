import { TouchableOpacityProps } from "react-native";

export interface IDefaultButton extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
}

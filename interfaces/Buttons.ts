import { TouchableOpacityProps } from "react-native";

export interface IDefaultButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
}

import { Colors } from "@/constants/theme";
import { IDefaultButtonProps } from "@/interfaces/components/Buttons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export const DefaultButton = ({
  text,
  isLoading = false,
  ...rest
}: IDefaultButtonProps) => {
  return (
    <TouchableOpacity style={style.defaultButton} {...rest}>
      {isLoading ? (
        <ActivityIndicator size='small' color={Colors.defaultColors.white100} />
      ) : (
        <Text style={style.defaultButtonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  defaultButton: {
    width: "100%",
    height: 50,
    margin: 8,
    backgroundColor: Colors.defaultColors.green400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  defaultButtonText: {
    fontSize: 20,
    color: Colors.defaultColors.white100,
  },
});

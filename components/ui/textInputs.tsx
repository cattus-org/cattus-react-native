import { Colors } from "@/constants/theme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const DefaultTextInput = ({ ...rest }: TextInputProps) => {
  return (
    <TextInput
      {...rest}
      style={style.defaultTextInput}
      placeholderTextColor={Colors.defaultColors.gray300}
    />
  );
};

const style = StyleSheet.create({
  defaultTextInput: {
    flex: 1,
    minHeight: 52,
    maxHeight: 52,
    width: "100%",
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.defaultColors.black100,
    color: Colors.defaultColors.white100,
    fontSize: 16,
  },
});

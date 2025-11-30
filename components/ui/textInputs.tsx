import { Colors } from "@/constants/theme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface DefaultTextInputProps extends TextInputProps {
  rightRadiusProps?: number;
}

export const DefaultTextInput = ({
  rightRadiusProps = 8,
  ...rest
}: DefaultTextInputProps) => {
  const borderRadius = {
    borderTopLeftRadius: 8,
    borderTopRightRadius: rightRadiusProps,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: rightRadiusProps,
  };

  return (
    <TextInput
      {...rest}
      style={[style.defaultTextInput, borderRadius]}
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
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    // borderBottomLeftRadius: 8,
    // borderBottomRightRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.defaultColors.black100,
    color: Colors.defaultColors.white100,
    fontSize: 16,
  },
});

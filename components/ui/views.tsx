import { ISpacerProps } from "@/interfaces/Views";
import { View } from "react-native";

export const Spacer = ({ height = 0, width = 0 }: ISpacerProps) => {
  return <View style={{ width, height }} />;
};

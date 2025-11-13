import { Colors } from "@/constants/theme";
import { IExpandableFABProps } from "@/interfaces/components/FAB";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

const ANIMATION_DURATION = 300;
const BUTTON_SIZE = 56;
const OPTION_SIZE = 48;
const SPACE = 15;

export const ExpandableFab = ({ options }: IExpandableFABProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleOpen = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };
  const getStyleForOption = (index: number) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -((index + 1) * (OPTION_SIZE + SPACE))],
    });

    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    const opacity = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Animated.View
          key={Math.random()}
          style={[styles.optionWrapper, getStyleForOption(index)]}
          pointerEvents={isOpen ? "auto" : "none"}>
          <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: option.color }]}
            onPress={() => {
              option.onPress();
              toggleOpen();
            }}>
            <Ionicons name={option.iconName} size={22} color='white' />
          </TouchableOpacity>
        </Animated.View>
      ))}
      <TouchableOpacity
        style={[
          styles.mainButton,
          { backgroundColor: Colors.defaultColors.green300 },
        ]}
        onPress={toggleOpen}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "45deg"],
                }),
              },
            ],
          }}>
          <Ionicons name='add-outline' size={28} color='white' />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "flex-end",
    zIndex: 1000,
  },
  mainButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  optionWrapper: {
    position: "absolute",
    bottom: (BUTTON_SIZE - OPTION_SIZE) / 2,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    width: OPTION_SIZE,
    height: OPTION_SIZE,
    borderRadius: OPTION_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  labelContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 6,
    marginRight: 10,
  },
  labelText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

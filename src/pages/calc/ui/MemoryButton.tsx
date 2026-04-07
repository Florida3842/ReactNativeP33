import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MemoryButtonTypes } from "../model/MemoryButtonTypes";

interface MemoryButtonProps {
  text: string;
  type?: MemoryButtonTypes;
  onPress?: (text: string) => void;
}

export default function MemoryButton({ text, type = MemoryButtonTypes.enabled, onPress }: MemoryButtonProps) {
  const isDisabled = type === MemoryButtonTypes.disabled;

  return (
    <TouchableOpacity
      style={[
        MemoryButtonStyle.container,
        isDisabled && MemoryButtonStyle.disabled,
      ]}
      onPress={() => onPress?.(text)}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
    >
      <Text
        style={[
          MemoryButtonStyle.text,
          isDisabled && MemoryButtonStyle.disabledText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const MemoryButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    backgroundColor: "#2C333E",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  disabled: {
    backgroundColor: "#1F242E",
    opacity: 0.6,
  },
  text: {
    fontSize: 18,
    color: "#AAA",
    fontWeight: "500",
  },
  disabledText: {
    color: "#555",
  },
});
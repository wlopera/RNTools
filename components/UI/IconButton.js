import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => {
        [(styles.butoon, pressed && styles.pressed)];
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  butoon: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: { opacity: 0.7 },
});

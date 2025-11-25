import { StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#0f0f0f", padding: 16 },
  container: { flex: 1, padding: 16, backgroundColor: "#0f0f0f" },
  stepContainer: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { color: "#fff", fontSize: 20 },
  progressBar: {
    height: 3,
    backgroundColor: "#2e2e2e",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  label: { color: "#ddd", marginBottom: 6 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  textarea: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 6,
    height: 120,
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#0a7f3e",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  btnSecondary: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { color: "#fff" },
  errorText: { color: "#ff6666", marginBottom: 8 },
  preview: {
    height: 300,
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  smallBtnRow: { flexDirection: "row", justifyContent: "space-between" },
  smallBtn: {
    backgroundColor: "#6d1b98",
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
  },
});

export const progressStyle = (value: number) => ({
  height: 3,
  backgroundColor: "#2ca85a",
  width: `${value}%`,
});

export default baseStyles;

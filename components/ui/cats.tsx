import { Colors } from "@/constants/theme";
import { ICat } from "@/interfaces/Cats";

const STATUS_COLORS = {
  ok: Colors.defaultColors.ok,
  alert: Colors.defaultColors.alert,
  danger: Colors.defaultColors.danger,
  UNDEFINED: Colors.defaultColors.gray200,
};

export const CatCard = (cat: ICat) => {
  const status = cat.status ?? "UNDEFINED";
  const statusColor = STATUS_COLORS[status];
};

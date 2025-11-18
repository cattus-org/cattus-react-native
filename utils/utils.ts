export const messageTransformer = (message: string | string[]) => {
  if (typeof message === "string") return message;
  return message.join(", ");
};

export const formatValue = (
  value: unknown,
  defaultValue: string = "Não informado"
): string => {
  if (
    value === null ||
    typeof value === "undefined" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return defaultValue;
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value);
};

export const calculateAge = (birthDate: Date | undefined): string => {
  if (!birthDate) return "Não informado";

  const now = new Date();
  const birth = new Date(birthDate);

  if (isNaN(birth.getTime())) return "Data Inválida";

  let age = now.getFullYear() - birth.getFullYear();
  const monthDifference = now.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && now.getDate() < birth.getDate())
  ) {
    age--;
  }

  if (age < 1) {
    const totalMonths =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());
    if (totalMonths < 1) return "Menos de 1 mês";
    return `${totalMonths} meses`;
  }

  return `${age} anos`;
};

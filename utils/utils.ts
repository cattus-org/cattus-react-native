export const messageTransformer = (message: string | string[]) => {
  if (typeof message === "string") return message;
  return message.join(", ");
};

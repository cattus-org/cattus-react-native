import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
  name: z.string().min(5, "O nome é muito pequeno"),
});

export type TRegisterForm = z.infer<typeof RegisterSchema>;

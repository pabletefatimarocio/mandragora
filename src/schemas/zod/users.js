import { z } from "zod";

export const userInputSchema = z
  .object({
    name: z.string().min(1, "Nombre de usuario: Campo requerido."),
    email: z
      .string()
      .min(1, "Email: Campo requerido.")
      .email("Email: Email Inválido."),
    password: z
      .string()
      .min(5, "Contraseña: Al menos 5 caracteres.")
      .regex(/[A-Z]/, "Contraseña: Al menos 1 letra en mayúscula.")
      .regex(/[a-z]/, "Contraseña: Al menos 1 letra en minúscula.")
      .regex(/[0-9]/, "Contraseña: Al menos 1 número.")
      .regex(/[\W_]/, "Contraseña: Al menos 1 caracter especial."),
    confirm: z.string().min(1, "Confirmación: Campo requerido."),
  })
  .refine(
    (data) => {
      if (data.confirm) {
        return data.password === data.confirm;
      } else {
        return true;
      }
    },
    {
      message: "Confirmación: Los datos no coinciden",
      path: ["confirm"],
    }
  );

import { z } from "zod";

export const tagInputSchema = z.object({
  id: z.string().min(2, "ID inválido"),
  name: z.string().min(2, "El nombre debe ser de al menos 2 caracteres."),
  color: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Color inválido"),
});

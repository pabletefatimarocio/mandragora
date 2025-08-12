import { z } from "zod";

export const plantInputSchema = z.object({
  name: z.string().min(2, "El nombre debe ser de al menos 2 caracteres"),
  scientific: z.string().min(2, "El nombre científico debe ser de al menos 2 caracteres"),
  location_place: z.string().min(2, "La ubicación de tu planta debe contener al menos 2 caracteres"),
  location_type: z.enum(["Interior", "Exterior"]),
  under_rain: z.boolean(),
  watering: z
    .string()
    .regex(/^(?:[1-9]\d?|[12]\d{2}|3(?:[0-5]\d|6[0-5]))$/, "Debe ser un número entre 1 y 365")
    .transform(Number),
  waterings: z.array(z.string()).min(1, "Debes establecer la fecha de su último riego. ¡Podría ser hoy mismo!"),
  fertilization: z
    .string()
    .regex(/^(?:[1-9]\d?|[12]\d{2}|3(?:[0-5]\d|6[0-5]))$/, "Debe ser un número entre 1 y 365")
    .transform(Number),
  fertilizations: z.array(z.string()),
  imageFile: z.object({
    name: z.string(),
    file: z.string({ message: "Necesitas una foto de tu planta" }),
  }),
});

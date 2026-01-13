import { z } from "zod";
import { tagInputSchema } from "./tags";

function fertilizationRules(data, ctx) {
  const hasFrequency = data.fertilization > 0;
  const hasDates = data.fertilizations.length > 0;

  if (hasFrequency && !hasDates) {
    ctx.addIssue({
      message: "Debes establecer la fecha de su última fertilización. ¡Podría ser hoy mismo!",
      path: ["fertilizations"],
    });
  }

  if (hasDates && !hasFrequency) {
    ctx.addIssue({
      message: "Debes establecer una frecuencia de fertilización.",
      path: ["fertilization"],
    });
  }
}

const plantInputBaseSchema = z.object({
  name: z.string().min(2, "El nombre debe ser de al menos 2 caracteres."),
  scientific: z.string().min(2, "El nombre científico debe ser de al menos 2 caracteres."),
  location_place: z.string().min(2, "La ubicación de tu planta debe contener al menos 2 caracteres."),
  location_type: z.enum(["Interior", "Exterior"]),
  under_rain: z.boolean(),
  watering: z.number().min(1, "Debe ser un número entre 1 y 365.").max(365, "Debe ser un número entre 1 y 365."),
  waterings: z.array(z.string()).min(1, "Debes establecer la fecha de su último riego. ¡Podría ser hoy mismo!"),
  fertilization: z.number().min(0, "Debe ser un número entre 1 y 365.").max(365, "Debe ser un número entre 1 y 365."),
  fertilizations: z.array(z.string()),
  tags: z.array(tagInputSchema),
  imageFile: z.object({
    name: z.string(),
    file: z.string().min(1, "Necesitas una foto de tu planta."),
  }),
});

export const plantInputSchema = plantInputBaseSchema.superRefine(fertilizationRules);

export const plantEditInfoSchema = plantInputBaseSchema
  .pick({
    name: true,
    scientific: true,
    location_type: true,
    location_place: true,
    under_rain: true,
    watering: true,
    waterings: true,
    fertilization: true,
    fertilizations: true,
  })
  .superRefine(fertilizationRules);

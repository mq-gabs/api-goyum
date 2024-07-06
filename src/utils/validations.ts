import { Schema, z } from "zod";
import { AppError } from "./app-error";

const DaySchema = z.object({
  open: z.string(),
  close: z.string(),
  is_open: z.boolean(),
});

const CreateStoreSchema = z.object({
  name: z.string(),
  description: z.string(),
  nick: z.string(),
  scheduling: z.object({
    sunday: DaySchema,
    monday: DaySchema,
    tuesday: DaySchema,
    wednesday: DaySchema,
    thursday: DaySchema,
    friday: DaySchema,
    saturday: DaySchema,
  }),
  email: z.string(),
  password: z.string(),
});

export function validateCreateStore(data: any) {
  return validate(CreateStoreSchema, data);
}

function validate(schema: Schema, data: any) {
  try {
    const result = schema.parse(data);
    return result;
  } catch (error) {
    throw new AppError(400, "Dados inválidos", error);
  }
}

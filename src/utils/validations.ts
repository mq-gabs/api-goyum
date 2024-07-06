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

const SignInSchema = CreateStoreSchema.pick({
  email: true,
  password: true,
});

export function validateCredentials(data: any) {
  return validate(SignInSchema, data);
}

const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export function validateCreateProduct(data: any) {
  return validate(CreateProductSchema, data);
}

const UpdateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  is_active: z.boolean().optional(),
});

export function validateUpdateProduct(data: any) {
  return validate(UpdateProductSchema, data);
}

const UUIDSchema = z.string().uuid();

export function validateUUID(data: any) {
  return validate(UUIDSchema, data);
}

const CreateOrderSchema = z.object({
  observations: z.string().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number(),
    })
  ),
  client_info: z.object({
    name: z.string(),
    contact: z.string(),
    address: z.object({
      street: z.string(),
      number: z.number(),
      neighborhood: z.string(),
    }),
  }),
});

export function validateOrder(data: any) {
  return validate(CreateOrderSchema, data);
}

const StatusSchema = z.enum([
  "pending",
  "making",
  "delivery",
  "done",
  "cancelled",
]);

export function validateStatus(data: any) {
  return validate(StatusSchema, data);
}

function validate(schema: Schema, data: any) {
  try {
    const result = schema.parse(data);
    return result;
  } catch (error) {
    throw new AppError(400, "Dados inválidos", error);
  }
}

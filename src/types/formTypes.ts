// src/types/formTypes.ts
import { v4 as uuidv4 } from "uuid";

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "email";

export type ValidationRuleType =
  | "required"
  | "minLength"
  | "maxLength"
  | "email"
  | "password";

export interface ValidationRule {
  type: ValidationRuleType;
  value?: any; // e.g., for minLength, value is the number
  message: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue: any;
  validationRules: ValidationRule[];
  isDerived: boolean;
  derivedConfig?: {
    parentFieldIds: string[]; // Always provide an array, never undefined
    formula: string;
  };
  options?: string[]; // For select, radio, checkbox
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}

export const createNewFormField = (type: FieldType): FormField => ({
  id: uuidv4(),
  type,
  label: "",
  required: false,
  defaultValue: "",
  validationRules: [],
  isDerived: false,
  derivedConfig: undefined,
});

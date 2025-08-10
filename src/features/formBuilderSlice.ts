import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormSchema, FormField } from "../types/formTypes";

interface FormBuilderState {
  currentForm: FormSchema;
}

const initialState: FormBuilderState = {
  currentForm: {
    id: "",
    name: "",
    createdAt: "",
    fields: [],
  },
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FormField>) => {
      state.currentForm.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.currentForm.fields.findIndex(
        (f) => f.id === action.payload.id
      );
      if (index !== -1) {
        state.currentForm.fields[index] = action.payload;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(
        (f) => f.id !== action.payload
      );
    },
    // You'll need reducers for reordering, updating the form name, etc.
    setFormSchema: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = action.payload;
    },
    resetFormBuilder: (state) => {
      state.currentForm = initialState.currentForm;
    },
  },
});

export const {
  addField,
  updateField,
  deleteField,
  setFormSchema,
  resetFormBuilder,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;

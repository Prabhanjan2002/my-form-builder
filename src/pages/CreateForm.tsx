// src/pages/CreateForm.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { addField, resetFormBuilder } from "../features/formBuilderSlice";
import type { FormSchema, FieldType } from "../types/formTypes";
import { createNewFormField } from "../types/formTypes";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import FieldConfigPanel from "../components/FieldConfigPanel"; // You'll create this component

const CreateForm = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector(
    (state: RootState) => state.formBuilder.currentForm
  );

  const [selectedField, setSelectedField] = useState<FieldType | "">("");

  const handleAddField = () => {
    if (selectedField) {
      const newField = createNewFormField(selectedField);
      dispatch(addField(newField));
      setSelectedField("");
    }
  };

  const handleSaveForm = () => {
    // Implement logic to prompt for form name and save to localStorage
    const formName = prompt("Enter a name for your form:");
    if (formName) {
      const newFormSchema: FormSchema = {
        ...currentForm,
        id: uuidv4(),
        name: formName,
        createdAt: new Date().toISOString(),
      };

      const savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
      savedForms.push(newFormSchema);
      localStorage.setItem("forms", JSON.stringify(savedForms));

      // Reset the form builder for a new form
      dispatch(resetFormBuilder());
      alert("Form saved successfully!");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create a New Form
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Add Field Type</InputLabel>
          <Select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value as FieldType)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            {/* Add other field types */}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAddField}
          disabled={!selectedField}
        >
          Add Field
        </Button>
        <Button variant="contained" color="success" onClick={handleSaveForm}>
          Save Form
        </Button>
      </Stack>

      {/* This is where you'll map through `currentForm.fields` and render a configuration panel for each */}
      {currentForm.fields.map((field) => (
        <FieldConfigPanel
          key={field.id}
          field={field}
          allFields={currentForm.fields}
        />
      ))}
    </Container>
  );
};

export default CreateForm;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { FormSchema } from "../types/formTypes";
import { Container, Typography, Box, Button } from "@mui/material";
import DynamicField from "../components/DynamicField"; // You'll create this

const PreviewForm = () => {
  const { formId } = useParams();
  const currentForm = useSelector(
    (state: RootState) => state.formBuilder.currentForm
  );

  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [formErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (formId) {
      // Load from localStorage
      const savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
      const loadedForm = savedForms.find((f: FormSchema) => f.id === formId);
      if (loadedForm) {
        setFormSchema(loadedForm);
      }
    } else {
      // Use the form being built from Redux
      setFormSchema(currentForm);
    }
  }, [formId, currentForm]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    // Here you'll also implement validation and derived field updates
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Final validation and form submission logic
    console.log("Form Submitted!", formValues);
  };

  if (!formSchema) {
    return <Typography>Form not found or is empty.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {formSchema.name}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {formSchema.fields.map((field) => (
          <DynamicField
            key={field.id}
            field={field}
            value={formValues[field.id]}
            error={formErrors[field.id]}
            onChange={handleInputChange}
          />
        ))}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PreviewForm;

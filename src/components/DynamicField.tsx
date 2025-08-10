import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import type { FormField } from "../types/formTypes";

interface DynamicFieldProps {
  field: FormField;
  value: any;
  error: string | undefined;
  onChange: (fieldId: string, value: any) => void;
}

const DynamicField = ({ field, value, error, onChange }: DynamicFieldProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue: any = e.target.value;
    if (field.type === "number") {
      newValue = Number(newValue);
    }
    onChange(field.id, newValue);
  };

  const handleSelectChange = (e: any) => {
    onChange(field.id, e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This logic assumes a single checkbox
    onChange(field.id, e.target.checked);
  };

  const handleCheckboxGroupChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value: option } = e.target;
    let newValues = Array.isArray(value) ? [...value] : [];
    if (e.target.checked) {
      newValues.push(option);
    } else {
      newValues = newValues.filter((v) => v !== option);
    }
    onChange(field.id, newValues);
  };

  switch (field.type) {
    case "text":
    case "email": // Assuming 'email' is a specific text field type
      return (
        <TextField
          fullWidth
          margin="normal"
          label={field.label}
          type="text"
          value={value || ""}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          disabled={field.isDerived}
        />
      );
    case "number":
      return (
        <TextField
          fullWidth
          margin="normal"
          label={field.label}
          type="number"
          value={value || ""}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          disabled={field.isDerived}
        />
      );
    case "textarea":
      return (
        <TextField
          fullWidth
          margin="normal"
          label={field.label}
          multiline
          rows={4}
          value={value || ""}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          disabled={field.isDerived}
        />
      );
    case "select":
      return (
        <FormControl
          fullWidth
          margin="normal"
          error={!!error}
          disabled={field.isDerived}
        >
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={value || ""}
            label={field.label}
            onChange={handleSelectChange}
          >
            {field.options?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      );
    case "radio":
      return (
        <FormControl
          component="fieldset"
          margin="normal"
          error={!!error}
          disabled={field.isDerived}
        >
          <FormLabel component="legend">{field.label}</FormLabel>
          <RadioGroup value={value || ""} onChange={handleSelectChange}>
            {field.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      );
    case "checkbox":
      // This implementation supports a single checkbox or a group of checkboxes.
      // We'll assume field.options existence implies a group.
      if (field.options && field.options.length > 0) {
        // Render a checkbox group
        return (
          <FormControl
            component="fieldset"
            margin="normal"
            error={!!error}
            disabled={field.isDerived}
          >
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup>
              {field.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={
                        (Array.isArray(value) && value.includes(option)) ||
                        false
                      }
                      onChange={handleCheckboxGroupChange}
                      value={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        );
      } else {
        // Render a single checkbox
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={handleCheckboxChange}
                disabled={field.isDerived}
              />
            }
            label={field.label}
          />
        );
      }
    case "date":
      return (
        <TextField
          fullWidth
          margin="normal"
          label={field.label}
          type="date"
          value={value || ""}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          disabled={field.isDerived}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    default:
      return null;
  }
};

export default DynamicField;

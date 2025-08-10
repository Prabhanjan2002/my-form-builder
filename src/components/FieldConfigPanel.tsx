// src/components/FieldConfigPanel.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
  Stack,
  FormGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FormField, ValidationRuleType } from "../types/formTypes";
import { updateField, deleteField } from "../features/formBuilderSlice";

interface FieldConfigPanelProps {
  field: FormField;
  allFields: FormField[];
}

const FieldConfigPanel = ({ field }: FieldConfigPanelProps) => {
  const dispatch = useDispatch();
  const [localField, setLocalField] = useState<FormField>(field);

  const handleUpdate = (updates: Partial<FormField>) => {
    const updatedField = { ...localField, ...updates };
    setLocalField(updatedField);
    dispatch(updateField(updatedField));
  };

  const handleDelete = () => {
    dispatch(deleteField(field.id));
  };

  // Helper function for validation rules
  const handleValidationChange = (type: ValidationRuleType, value?: any) => {
    let newRules = [...localField.validationRules];
    const existingRule = newRules.find((rule) => rule.type === type);

    if (existingRule) {
      // Rule already exists, update its value
      if (value !== undefined) {
        existingRule.value = value;
      } else {
        // Toggle the rule (e.g., required)
        newRules = newRules.filter((rule) => rule.type !== type);
      }
    } else {
      // Add a new rule
      newRules.push({ type, value, message: `Field is invalid` });
    }
    handleUpdate({ validationRules: newRules });
  };

  return (
    <Box sx={{ p: 2, my: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{field.type.toUpperCase()} Field</Typography>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* Label and Required Toggle */}
      <TextField
        fullWidth
        label="Label"
        value={localField.label}
        onChange={(e) => handleUpdate({ label: e.target.value })}
        sx={{ mt: 2 }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={localField.required}
            onChange={(e) => handleUpdate({ required: e.target.checked })}
          />
        }
        label="Required"
      />

      {/* Validation Rules */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Validation Rules
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={localField.validationRules.some(
                (r) => r.type === "email"
              )}
              onChange={() => handleValidationChange("email")}
            />
          }
          label="Email Format"
        />
        {/* You would add more validation rules here */}
        <Box sx={{ pl: 2 }}>
          <TextField
            label="Min Length"
            type="number"
            value={
              localField.validationRules.find((r) => r.type === "minLength")
                ?.value || ""
            }
            onChange={(e) =>
              handleValidationChange("minLength", Number(e.target.value))
            }
            size="small"
          />
        </Box>
      </FormGroup>

      {/* Derived Field Configuration (Placeholder) */}
      <FormControlLabel
        control={
          <Switch
            checked={localField.isDerived}
            onChange={(e) => handleUpdate({ isDerived: e.target.checked })}
          />
        }
        label="Derived Field"
      />
      {localField.isDerived && (
        <TextField
          fullWidth
          multiline
          label="Formula"
          value={localField.derivedConfig?.formula || ""}
          onChange={(e) =>
            handleUpdate({
              derivedConfig: {
                formula: e.target.value,
                parentFieldIds: localField.derivedConfig?.parentFieldIds ?? [],
              },
            })
          }
        />
      )}

      {/* Type-Specific Options (e.g., for Select/Radio) */}
      {["select", "radio", "checkbox"].includes(localField.type) && (
        <TextField
          fullWidth
          label="Options (comma separated)"
          value={localField.options?.join(", ") || ""}
          onChange={(e) =>
            handleUpdate({
              options: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
};

export default FieldConfigPanel;

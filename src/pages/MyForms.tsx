// src/pages/MyForms.tsx
import { useEffect, useState } from "react";
import type { FormSchema } from "../types/formTypes";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const MyForms = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);

  useEffect(() => {
    // Fetch forms from localStorage
    const savedForms = localStorage.getItem("forms");
    if (savedForms) {
      setForms(JSON.parse(savedForms));
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>
      {forms.length > 0 ? (
        <List>
          {forms.map((form) => (
            <ListItem key={form.id} disablePadding>
              <ListItemButton component={Link} to={`/preview/${form.id}`}>
                <ListItemText
                  primary={form.name}
                  secondary={`Created: ${new Date(
                    form.createdAt
                  ).toLocaleDateString()}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No forms saved yet.</Typography>
      )}
    </Container>
  );
};

export default MyForms;

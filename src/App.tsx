// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import MyForms from "./pages/MyForms";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Builder
          </Typography>
          <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
          <Button color="inherit" component={Link} to="/myforms">
            My Forms
          </Button>
        </Toolbar>
      </AppBar>
      <div className="app-content">
        <Routes>
          <Route path="/create" element={<CreateForm />} />
          <Route path="/preview/:formId" element={<PreviewForm />} />
          <Route path="/myforms" element={<MyForms />} />
          <Route path="/" element={<h2>Welcome to the Form Builder!</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

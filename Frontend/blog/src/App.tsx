import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import { MenuNavegacion } from "./components/encabezado/MenuNavegacion";
import "./App.css";
function App() {
  return (
    <Router>
      <MenuNavegacion />
      <Routes>
        <Route path="/" element={<Principal />} />
      </Routes>
    </Router>
  );
}
export default App;

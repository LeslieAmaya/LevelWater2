import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Usuarios from "./components/Usuarios";
import Consumo from "./pages/Consumo/Consumo";
import Nivel from "./pages/Nivel/Nivel";


const rol = localStorage.getItem("rol");

function ProtectedRoute({ children, requiredRole }) {
  
  if (rol !== requiredRole.toString()) {
    return children;  
  }

  return <Navigate to="/Nivel"  />;
}

function App() {
  const x = localStorage.getItem("user");

  return (
    <div className="container-fluid p-3 d-flex flex-row">
      {x === null ? <Login /> : <Menu />}
      <Routes>
        <Route
          path="/Usuarios"
          element={
            <ProtectedRoute requiredRole="1">
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route path="/Nivel" element={<Nivel />} />
        <Route path="/Consumo" element={<Consumo />} />
      </Routes>
    </div>
  );
}

export default App;

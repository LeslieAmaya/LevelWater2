import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Usuarios from "./components/Usuarios";
import Consumo from "./pages/Consumo/Consumo";
import Nivel from "./pages/Nivel/Nivel";

var x = localStorage.getItem("user");

function App() {
  let actual;
  if (x === null) {
    actual = <Login />;
  } else {
    actual = <Menu />;
  }
  return (
    <div className="container-fluid p-3 d-flex flex-row">
      {actual}
      <Routes>
        {/* <Route path="/Vacio" element={<Vacio />}></Route> */}
        {/* <Route path="/Informacion" element={<Informacion />} /> */}
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Nivel" element={<Nivel />} />
        {/* <Route path="/ContagiosForm" element={<ContagiosForm />} /> */}
        <Route path="/Consumo" element={<Consumo />} />
        {/* <Route path="/CampanasForm" element={<CampainForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;

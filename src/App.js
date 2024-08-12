import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Usuarios from "./components/Usuarios";
import CampainPage from "./pages/CampainPage/CampainPage";
import ContagiosPage from "./pages/ContagiosPage/ContagiosPage";

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
        <Route path="/Nivel" element={<ContagiosPage />} />
        {/* <Route path="/ContagiosForm" element={<ContagiosForm />} /> */}
        <Route path="/Graficas" element={<CampainPage />} />
        {/* <Route path="/CampanasForm" element={<CampainForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;

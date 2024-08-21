import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  Salir() {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  render() {
    const rol = localStorage.getItem("rol");

    return (
      <div className="d-flex flex-column">
        <img
          alt="Level Water logo"
          src="https://i.ibb.co/mhNXRpj/LOGO-LEVEL-WATER.png"
          style={{ height: 200 }}
        />
        <h2 className="text-center titulo"> Level Water </h2>
        <p style={{ color: "grey", marginLeft: 62 }}>
          Usuario: {localStorage.getItem("user")}
        </p>

        {/* <Link to="/Informacion" className="btn btn-danger m-1">
          {" "}
          Información{" "}
        </Link> */}
        {rol !== "1" && (
          <Link to="/Usuarios" className="btn btn-primary m-1">
          {" "}
          Usuarios{" "}
        </Link>
        )}
        <Link to="/Nivel" className="btn btn-primary m-1">
          {" "}
          Nivel{" "}
        </Link>
        <Link to="/Consumo" className="btn btn-primary m-1">
          Consumo
        </Link>
        {/* <Link to="/ContagiosForm" className="btn btn-danger m-1">
          {""} 
          Foularmrio de Contagios{" "}
        </Link>
        <Link to="/CampanasForm" className="btn btn-danger m-1">
          Formulario de Campañas
        </Link> */}
        <Link to="/" className="logout" onClick={this.Salir}>
          Logout
        </Link>
      </div>
    );
  }
}

export default Menu;

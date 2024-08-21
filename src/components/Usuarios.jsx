import React from "react";
import "../App.css";
import axios from "axios";
import { Table } from "antd";

const url = "https://apilw.onrender.com/api";
// const url = "https://apimongo-xso0.onrender.com/api";
// const url = "http://localhost:3001/api";
class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: [],
      id: "",
      username: "",
      name: "",
      password: "",
      lastname: "",
      rol: "0",
    };
    this.handlerUsuario = this.handlerUsuario.bind(this);
    this.handlerName = this.handlerName.bind(this);
    this.handlerPassword = this.handlerPassword.bind(this);
    this.handlerLastname = this.handlerLastname.bind(this);
    this.handlerRol = this.handlerRol.bind(this);
    this.handlerId = this.handlerId.bind(this);
    // CRUD
    this.GuardarDatos = this.GuardarDatos.bind(this);
    this.BorrarDatos = this.BorrarDatos.bind(this);
  }

  handlerUsuario(event) {
    this.setState({ username: event.target.value });
  }
  handlerName(event) {
    this.setState({ name: event.target.value });
  }
  handlerLastname(event) {
    this.setState({ lastname: event.target.value });
  }
  handlerRol(event) {
    this.setState({ rol: event.target.value });
  }
  handlerPassword(event) {
    this.setState({ password: event.target.value });
  }
  handlerId(event) {
    this.setState({ id: event.target.value });
  }
  cargarDatos() {
    axios.get(url + "/user").then((Response) => {
      this.setState({ User: Response.data });
    });
  }

  BorrarDatos() {
    axios.delete(url + "/user/" + this.state.username).then((Response) => {
      this.cargarDatos();
      this.LimpiarDatos();
    });
  }
  GuardarDatos() {
    let us = {
      username: this.state.username,
      name: this.state.name,
      lastname: this.state.lastname,
      password: this.state.password,
      rol: this.state.rol,
    };
    if (this.state.id === "") {
      axios.post(url + "/user", us).then((Response) => {
        this.cargarDatos();
        this.LimpiarDatos();
      });
    } else {
      axios.put(url + "/user/" + this.state.id, us).then((Response) => {
        console.log(this.state.id);
        this.cargarDatos();
      });
    }
  }
  LimpiarDatos = () => {
    this.setState({ id: "" });
    this.setState({ username: "" });
    this.setState({ name: "" });
    this.setState({ rol: "" });
    this.setState({ lastname: "" });
    this.setState({ password: "" });
  };
  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const dataSource = this.state.User.map((user) => ({
      _id: user._id,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      rol: user.rol,
    }));

    const columns = [
      {
        title: "Id",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "Usuario",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Apellido",
        dataIndex: "lastname",
        key: "lastname",
      },
      {
        title: "Contraseña",
        dataIndex: "password",
        key: "password",
      },
      {
        title: "Rol",
        dataIndex: "rol",
        key: "rol",
        render: (rol) => (rol === 0 ? "Administrador" : "Usuario") // Operador ternario (condicion) ? (true) : (false) 
      },
    ];

    return (
      <div className="col-10 card ml-5 p-5 shadow-lg">
        <div className="row">
          <div className="col-md-6 d-none d-lg-block h-screen">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 8 }}
            />
          </div>
          <div className="col-4 mx-auto">
            <div className="">
              {/* <br/> */}
              <div className="text-center">
                <h2 className="h4 text-gray-900 mb-4">USUARIOS</h2>
              </div>
              <div className="user">
                <form className="form-group">
                  <input
                    value={this.state.id}
                    type="text"
                    placeholder="Ingresar ID"
                    className="form-control form-control-user"
                    onChange={this.handlerId}
                  />
                  <br />

                  <input
                    value={this.state.username}
                    type="text"
                    placeholder="Ingresar Usuario"
                    className="form-control form-control-user"
                    onChange={this.handlerUsuario}
                  />
                  <br />
                  <input
                    value={this.state.name}
                    type="text"
                    placeholder="Ingresar Nombre"
                    className="form-control form-control-user"
                    onChange={this.handlerName}
                  />
                  <br />
                  <input
                    value={this.state.lastname}
                    type="text"
                    placeholder="Ingresar Apellido"
                    className="form-control form-control-user"
                    onChange={this.handlerLastname}
                  />
                  <br />
                  <input
                    value={this.state.password}
                    type="password"
                    placeholder="Ingresar contraseña"
                    className="form-control form-control-user"
                    onChange={this.handlerPassword}
                  />
                  <br />
                  <p>Seleccionar un Rol</p>
                  <select
                    value={this.state.rol}
                    className="form-control form-control-user"
                    onChange={this.handlerRol}
                  >
                    <option value="0">Administrador</option>
                    <option value="1">Usuario</option>
                  </select>
                </form>
                <br />
                <tr>
                  <td>
                    <button
                      type="submit"
                      className="new"
                      onClick={this.LimpiarDatos}
                    >
                      {" "}
                      Nuevo{" "}
                    </button>
                    <button
                      type="submit"
                      className="register"
                      onClick={this.GuardarDatos}
                    >
                      {" "}
                      Guardar{" "}
                    </button>
                    <button
                      type="submit"
                      className="btn-danger register"
                      onClick={this.BorrarDatos}
                    >
                      {" "}
                      Eliminar{" "}
                    </button>
                  </td>
                </tr>

                <br />
                <br />

                <div className="text-center">
                  <label> Level Water 2024 </label>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
export default Usuarios;


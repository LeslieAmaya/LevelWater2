import axios from "axios";
import React from "react";
import "../App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      password: "",
      mensaje: "",
      rol: "",
    };
    this.handlerUsuario = this.handlerUsuario.bind(this);
    this.handlerPassword = this.handlerPassword.bind(this);
    this.validarUsuario = this.validarUsuario.bind(this);
  }

  handlerUsuario(event) {
    this.setState({ usuario: event.target.value });
  }
  handlerPassword(event) {
    this.setState({ password: event.target.value });
  }
 

  validarUsuario = async () => {
    //AXIOS peticiones a URLs
    try {
      const response = await axios.post(
        "https://apilw.onrender.com/api/login",
        { username: this.state.usuario, password: this.state.password }
      );

      console.log("Respuesta", response.data);
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("pass", response.data.password);
      localStorage.setItem("rol",  response.data.rol);

      if (response.data.rol === 0) {
        window.location.href = "/Usuarios";
      } else{
        window.location.href = "/Nivel";

      }
    } catch (err) {
      alert("Usuario y/o contraseña incorrectos");
      this.setState(); 
    }
  };
  render() {
    return (
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <div class="titulo">Level Water</div>
                    </div>
                    <br />
                    <div class="text-center">
                      <h2 class="h4 text-gray-900 mb-4">Inicia Sesión</h2>
                    </div>
                    <div className="user">
                      <form className="form-group">
                        <input
                          value={this.state.usuario}
                          type="text"
                          required
                          placeholder="Ingresar usuario"
                          class="form-control form-control-user"
                          onChange={this.handlerUsuario}
                        />
                        <br />
                        <input
                          value={this.state.password}
                          type="password"
                          required
                          placeholder="Ingresar contraseña"
                          class="form-control form-control-user"
                          onChange={this.handlerPassword}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              this.validarUsuario();
                            }
                          }}
                        />
                      </form>
                      <br />
                      <button
                        type="submit"
                        className="login"
                        onClick={this.validarUsuario}
                      >
                        {" "}
                        ACEPTAR{" "}
                      </button>
                      <br />
                      <br />
                      <div class="text-center">
                        <label> Level Water 2024 </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

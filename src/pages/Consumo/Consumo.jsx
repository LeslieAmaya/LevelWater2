import { Table } from "antd";
import axios from "axios";
import React from "react";

const url = "https://apilw.onrender.com/api";

class Consumo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Consumo: [],
      id: "",
      fecha: "",
      consumo: "",
    };
    // this.handlerUsuario = this.handlerUsuario.bind(this);
    // this.handlerName = this.handlerName.bind(this);
    // this.handlerPassword = this.handlerPassword.bind(this);
    // this.handlerLastname = this.handlerLastname.bind(this);
    // this.handlerRol = this.handlerRol.bind(this);
    // this.handlerId = this.handlerId.bind(this);
    // // CRUD
    // this.GuardarDatos = this.GuardarDatos.bind(this);
    // this.BorrarDatos = this.BorrarDatos.bind(this);
  }

  handlerConsumo(event) {
    this.setState({ consumo: event.target.value });
  }
  handlerfecha(event) {
    this.setState({ fecha: event.target.value });
  }
  // handlerLastname(event) {
  //   this.setState({ lastname: event.target.value });
  // }
  cargarDatos() {
    axios.get(url + "/consume").then((Response) => {
      this.setState({ Consumo: Response.data });
    });
  }

  // GuardarDatos() {
  //   debugger;
  //   let con = {
  //     consumo: this.state.consumo,
  //     fecha: this.state.fecha,

  //   };
  //   if (this.state.id === "") {
  //     axios.post(url + "/consume", con).then((Response) => {
  //       this.cargarDatos();
  //       this.LimpiarDatos();
  //     });
  //   } else {
  //     axios.put(url + "/consume/" + this.state.id, con).then((Response) => {
  //       console.log(this.state.id);
  //       this.cargarDatos();
  //     });
  //   }
  // }
  // LimpiarDatos = () => {
  //   this.setState({ id: "" });
  //   this.setState({ username: "" });
  //   this.setState({ name: "" });
  //   this.setState({ rol: "" });
  //   this.setState({ lastname: "" });
  //   this.setState({ password: "" });
  // };
  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const total = this.state.Consumo.reduce(
      (acc, consume) => acc + consume.Consumo,
      0
    );
    const dataSource = this.state.Consumo.map((consume) => ({
      key: consume._id, // Agregar un 'key' único para cada fila
      consumo: consume.consumo,
      fecha: consume.Fecha,
    }));
    console.log(total);
    const columns = [
      {
        title: "Fecha",
        dataIndex: "fecha",
        key: "fecha",
      },
      {
        title: "Consumo",
        dataIndex: "consumo",
        key: "consumo",
        render: (consumo) => {
          return <div>{consumo} Lt</div>
        },
      },
    ];

   

    return (
      <div style={{marginLeft: 98}}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 8 }}
        />
      </div>
    );
  }
}

export default Consumo;

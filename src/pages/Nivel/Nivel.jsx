import { Column } from "@ant-design/charts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";
import axios from "axios";
import React from "react";

const url = "https://apilw.onrender.com/api";
const limite = 10000;

class Nivel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Consumo: [],
      id: "",
      fecha: "",
      consumo: "",
    };
  }

  handlerConsumo(event) {
    this.setState({ consumo: event.target.value });
  }
  handlerfecha(event) {
    this.setState({ fecha: event.target.value });
  }

  cargarDatos() {
    axios.get(url + "/consume").then((Response) => {
      this.setState({ Consumo: Response.data });
    });
  }
  toggleIntervalo = () => {
    const { intervaloActivo, intervalId } = this.state;

    if (intervaloActivo) {
      clearInterval(intervalId);
      this.setState({ intervaloActivo: false, intervalId: null });
    } else {
      const id = setInterval(() => {
        this.guardarConsumo();
      }, 10000);

      this.setState({ intervaloActivo: true, intervalId: id });
    }
  };
  GuardarDatos() {
    let con = {
      consumo: this.state.consumo,
      fecha: this.state.fecha,
    };
    if (con != null) {
      // debugger;

      axios.post(url + "/consume", con).then((Response) => {
        this.cargarDatos();
      });
    } else {
      axios.put(url + "/consume/").then((Response) => {
        console.log(this.state.id);
        this.cargarDatos();
      });
    }
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const total = this.state.Consumo.reduce(
      (acc, consume) => acc + consume.consumo,
      0
    );
    const cons = limite - total;
    const porcentajeLimite = (cons / limite) * 100;

    const dataSource = this.state.Consumo.map((consume) => ({
      key: consume._id,
      consumo: consume.consumo,
      fecha: consume.Fecha,
    }));

    const config = {
      data: dataSource,
      xField: "fecha",
      yField: "consumo",
      legend: false,
      style: {
        fill: ({ consumo }) => {
          if (consumo < "300") {
            return "#32a84e";
          }
          return "#8f0000";
        },
      },
    };
    const { intervaloActivo } = this.state;
    return (
      <div style={{ marginLeft: 95 }}>
        <Row gutter={19}>
          <Col span={18}>
            <Column {...config} />
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Capacidad Total"
                value={cons}
                precision={2}
                valueStyle={{
                  color:
                    cons > 6000
                      ? "#3f8600" // green
                      : limite < 5999
                      ? "#ffa07a" // orange
                      : "#ff0000", // red
                }}
                prefix={<ArrowUpOutlined />}
                suffix="Lt"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Porcentaje"
                value={porcentajeLimite}
                precision={2}
                valueStyle={{
                  color:
                    porcentajeLimite < 30
                      ? "#ff0000" // rojo
                      : porcentajeLimite <= 60
                      ? "#ffa07a" // naranja
                      : "#3f8600", // verde
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={this.toggleIntervalo}>
              {intervaloActivo ? "Detener Consumo" : "Iniciar Consumo"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  guardarConsumo() {
    const consumo = Math.floor(Math.random() * 350) + 1;
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getFullYear()}-${String(
      fechaActual.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;

    this.setState(
      {
        fecha: fechaFormateada,
        consumo: consumo,
      },
      () => {
        this.GuardarDatos();
      }
    );
  }
}

export default Nivel;

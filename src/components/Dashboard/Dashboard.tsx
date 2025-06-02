import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Pessoa {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  active: boolean;
  document: string;
  personTypes: string[];
}

const diasDaSemana = ["Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sab.", "Dom."];

const Dashboard: React.FC = () => {
  const [clientes, setClientes] = useState<Pessoa[]>([]);
  const [contagemDias, setContagemDias] = useState<{ dia: string; valor: number }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // 👈 tooltip custom

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get<Pessoa[]>("http://localhost:8081/person");

        // Filtrar apenas CLIENTES (CUSTOMER)
        const clientes = response.data.filter(pessoa =>
          pessoa.personTypes.includes("CUSTOMER")
        );

        setClientes(clientes);

        // Iniciar contagem por dia
        const contagem: Record<string, number> = {
          "Seg.": 0,
          "Ter.": 0,
          "Qua.": 0,
          "Qui.": 0,
          "Sex.": 0,
          "Sab.": 0,
          "Dom.": 0,
        };

        // Distribuir os agendamentos conforme descrição
        clientes.forEach(cliente => {
          const desc = cliente.description.toLowerCase();
          if (desc.includes("segunda") || desc.includes("seg")) contagem["Seg."] += 1;
          else if (desc.includes("terça")|| desc.includes("ter")) contagem["Ter."] += 1;
          else if (desc.includes("quarta")|| desc.includes("qua")) contagem["Qua."] += 1;
          else if (desc.includes("quinta")|| desc.includes("qui")) contagem["Qui."] += 1;
          else if (desc.includes("sexta")|| desc.includes("sex")) contagem["Sex."] += 1;
          else if (desc.includes("sábado")|| desc.includes("sab")) contagem["Sab."] += 1;
          else if (desc.includes("domingo")|| desc.includes("dom")) contagem["Dom."] += 1;
        });

        const dadosParaGrafico = diasDaSemana.map(dia => ({
          dia,
          valor: contagem[dia],
        }));

        setContagemDias(dadosParaGrafico);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: 250, width: "100%", paddingTop: 70 }}>
        <Navbar />

        <Container fluid className="mt-4">
          {/* Indicadores */}
          {/* Filtros */}
          <Row className="align-items-end mb-4 px-3">
            <Col md={2}>
              <label className="form-label">Período</label>
              <select className="form-select">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este mês</option>
                <option>Mês passado</option>
              </select>
            </Col>
            <Col md={2}>
              <label className="form-label">Barbeiro</label>
              <select className="form-select">
                <option>Todos</option>
                <option>Anderson</option>
                <option>Jonas</option>
                <option>Cáriton V.</option>
              </select>
            </Col>
            <Col md={2}>
              <label className="form-label">Serviço</label>
              <select className="form-select">
                <option>Todos</option>
                <option>Corte</option>
                <option>Barba</option>
                <option>Combo</option>
              </select>
            </Col>
            <Col md={2}>
              <label className="form-label">Status</label>
              <select className="form-select">
                <option>Todos</option>
                <option>Realizados</option>
                <option>Pendentes</option>
                <option>Cancelados</option>
              </select>
            </Col>
            <Col md={2}>
              <button className="btn btn-primary w-100">Aplicar Filtros</button>
            </Col>
          </Row>

          {/* Financeiro */}
          <Row>
            <Col md={2}>
              <Card className="mb-3" style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Receita (R$)</Card.Title>
                  <h2 className="text-success">315,00</h2>
                </Card.Body>
              </Card>
              <Card style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Receita prevista (R$)</Card.Title>
                  <h2 className="text-success">782,00</h2>
                </Card.Body>
              </Card>
            </Col>

            {/* Gráfico */}
            <Col md={6}>
              <Card className="mb-3" style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Total de agendamentos diários</Card.Title>
                  <div
                    className="d-flex justify-content-around align-items-end mt-3"
                    style={{ height: "150px", position: "relative" }}
                  >
                    {contagemDias.map(({ dia, valor }, idx) => (
                      <div
                        key={idx}
                        className="text-center d-flex flex-column justify-content-end align-items-center"
                        style={{ height: "100%", position: "relative" }}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {hoveredIndex === idx && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: `${valor * 10 + 30}px`,
                              backgroundColor: "#000",
                              color: "#fff",
                              padding: "4px 8px",
                              borderRadius: "5px",
                              fontSize: "0.8rem",
                              whiteSpace: "nowrap",
                              zIndex: 10,
                            }}
                          >
                            Total: {valor}
                          </div>
                        )}
                        <div
                          style={{
                            height: `${valor * 10}px`,
                            width: "20px",
                            backgroundColor: "#4c5eff",
                            marginBottom: "5px",
                            transition: "height 0.2s ease",
                          }}
                        ></div>
                        <small>{dia}</small>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Tabela de Agendamentos */}
            <Col md={4}>
              <Card style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Próximos agendamentos</Card.Title>
                  <Table size="sm" bordered hover>
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Barbeiro</th>
                        <th>Valor</th>
                        <th>Data e Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Felipe dos Santos",
                          "Cáriton V.",
                          "R$ 132,00",
                          "11/04/2025 10:15",
                        ],
                        [
                          "Filipe Ariel Fricati",
                          "Anderson",
                          "R$ 45,00",
                          "11/04/2025 10:15",
                        ],
                        [
                          "João Pedro Lima",
                          "Jonas",
                          "R$ 50,00",
                          "11/04/2025 11:30",
                        ],
                      ].map(([cliente, barbeiro, valor, dataHora], idx) => (
                        <tr key={idx}>
                          <td>{cliente}</td>
                          <td>{barbeiro}</td>
                          <td>{valor}</td>
                          <td>{dataHora}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Dashboard Financeiro Avançado */}
          <Row className="mt-4">
            {/* Indicadores de Despesa */}
            <Col md={2}>
              <Card className="mb-3" style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Despesa (R$)</Card.Title>
                  <h2 className="text-danger">173,25</h2>
                </Card.Body>
              </Card>
              <Card style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Despesa prevista (R$)</Card.Title>
                  <h2 className="text-danger">430,10</h2>
                </Card.Body>
              </Card>
            </Col>

            {/* Gráfico de Área */}
            <Col md={6}>
              <Card style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Receitas e despesas</Card.Title>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      data={[
                        { dia: "Seg.", receita: 100, despesa: 50 },
                        { dia: "Ter.", receita: 120, despesa: 70 },
                        { dia: "Qua.", receita: 80, despesa: 40 },
                        { dia: "Qui.", receita: 110, despesa: 55 },
                        { dia: "Sex.", receita: 130, despesa: 80 },
                        { dia: "Sab.", receita: 150, despesa: 90 },
                        { dia: "Dom.", receita: 180, despesa: 100 },
                      ]}
                      margin={{ left: 20, right: 20 }}
                    >
                      <XAxis dataKey="dia" interval={0} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="despesa"
                        stackId="1"
                        stroke="#b30000"
                        fill="#b30000"
                      />
                      <Area
                        type="monotone"
                        dataKey="receita"
                        stackId="1"
                        stroke="#00cc66"
                        fill="#00cc66"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>

            {/* Gráficos de Pizza Comparativo */}
            <Col md={4}>
              <Card style={{ borderColor: "#4c5eff" }}>
                <Card.Body>
                  <Card.Title>Comparativo financeiro</Card.Title>
                  <Row>
                    <Col xs={6}>
                      <h6 className="text-success text-center">Receita</h6>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Anderson", value: 38 },
                              { name: "Cáriton V.", value: 62 },
                            ]}
                            dataKey="value"
                            outerRadius={50}
                            label
                          >
                            <Cell fill="#0000ff" />
                            <Cell fill="#ff8000" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </Col>
                    <Col xs={6}>
                      <h6 className="text-danger text-center">Despesa</h6>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Anderson", value: 45 },
                              { name: "Cáriton V.", value: 55 },
                            ]}
                            dataKey="value"
                            outerRadius={50}
                            label
                          >
                            <Cell fill="#0000ff" />
                            <Cell fill="#ff8000" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;

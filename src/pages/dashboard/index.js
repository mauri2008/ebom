import { useState, useEffect, useContext } from "react";
import {
  Container,
  StatusHeader,
  SectionCharts,
  SectionLeftCharts,
  SectionRightCharts,
  TitleCharts,
  DescriptionCharts,
  TablePresents,
  TitlePresents,
  EmptyClientsPresents,
  ContainerTablePresents,
} from "./style";

import Header from "../../components/header";
import Table from "../../components/Table";

import CardBoard from "../../components/cardBoard";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import CoPresent from "@mui/icons-material/CoPresent";
import DoNotDisturbOff from "@mui/icons-material/DoNotDisturbOff";
import Add from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

import Charts from "../../components/chartsLine";
import ChartsDoughnut from "../../components/chartsDoughnut";

import UseApi from "../../services/api";
import { StateContext } from "../../context";
import { setDataTable, updateDataGrid } from "../../helpes/functions";

export default function Dashboard() {
  const api = UseApi();
  let dataCheckins = [];

  const { actions } = useContext(StateContext);
  const [checkins, setCheckins] = useState([]);
  const [reports, setReports] = useState({});

  const convertDataTable = (data) => {
    setCheckins(
      setDataTable(data, [
        { key: "name_client", title: "Nome" },
        { key: "name_church", title: "Igreja" },
        { key: "responsible_church", title: "Pastor" },
        { key: "data_checkin", title: "Entrada" },
      ])
    );
  };

  const convertDate = (data) => {
    const convertDataCheckins = updateDataGrid(data, [
      { action: "dateTime", object: "data_checkin" },
    ]);
    return convertDataCheckins;
  };

  const getCheckins = async (page) => {
    const response = await api.get(`checkin-list`, actions);

    if (Object.keys(response).length > 0) {
      dataCheckins = convertDate(response.client);
      convertDataTable(response.client);
      setReports(response.reports);
    }
  };

  useEffect(() => {
    getCheckins();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getCheckins();
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Header
        title="Dashboard"
        titleButton="Adicionar participantes"
        handleShowModal={() => {}}
        IconButton={Add}
      />

      <StatusHeader>
        <CardBoard
          title="Usuários Cadastrados"
          subtitle={
            reports?.totalClient
              ? `${reports.totalClient} usúarios`
              : "0 usuarios"
          }
          Icon={AssignmentInd}
        />
        <CardBoard
          title="Usuários Presentes"
          subtitle={
            reports?.present ? `${reports.present} usúarios` : "0 usuarios"
          }
          Icon={CoPresent}
        />
        <CardBoard
          title="Usuários Ausentes"
          subtitle={
            reports?.totalAbserts
              ? `${reports.totalAbserts} usúarios`
              : "0 usuarios"
          }
          Icon={DoNotDisturbOff}
        />
      </StatusHeader>
      <h3 style={{ margin: "20px 0px" }}>Analises</h3>

      <SectionCharts>
        <SectionLeftCharts>
          <TitleCharts>Presenças diárias</TitleCharts>
          {reports && reports?.presentsDay && (
            <Charts dataCharts={reports.presentsDay} />
          )}
        </SectionLeftCharts>
        <SectionRightCharts>
          <TitleCharts>Média de presenças</TitleCharts>
          {reports && reports?.presentsDay && (
            <ChartsDoughnut dataChart={reports} />
          )}
          <DescriptionCharts></DescriptionCharts>
        </SectionRightCharts>
      </SectionCharts>

      <ContainerTablePresents elevation={2} sx={{ position: "relative" }}>
        <TitlePresents>
          <p>Lista de Presença</p>
          <TextField label="Buscar" size="small" />
        </TitlePresents>
        <TablePresents>
          {checkins.length > 0 && <Table data={checkins} />}
          {checkins.length === 0 && (
            <EmptyClientsPresents>
              <h4>Não há participantes presentes no momento</h4>
            </EmptyClientsPresents>
          )}
        </TablePresents>
      </ContainerTablePresents>
    </Container>
  );
}

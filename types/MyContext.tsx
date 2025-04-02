import { Dayjs } from "dayjs";
import React, { Dispatch, SetStateAction } from "react";

export interface MyContextType {
  numeroDoContainer: string;
  responsavelTecnico: string;
  hour: Dayjs | null;
  date: Dayjs | null;
  ocorrencia: string;
  responsavelCliente: string;
  email: string;
  telefone: string;
  rg: string;
  services: Service[];
  obs: string;
  pecas: Pecas[];
  origem: string;
  destino: string;
  km: string;
  inicio: Dayjs | null;
  termino: Dayjs | null;
  responsavelFalha: string;
  showAlert: Alert;
  setShowAlert: React.Dispatch<React.SetStateAction<Alert>>;
  clientSign: string | null;
  techSign: string | null;
}

export interface Alert {
  severity: "error" | "warning" | "info" | "success";
  text: string;
  show: boolean;
}
export interface Produto {
  produto: string;
  medidas: string;
  quantidade: string;
  valor: string;
}

export interface Service {
  descService: string;
}

export interface Pecas {
  descricao: string;
  quantidade: string;
}

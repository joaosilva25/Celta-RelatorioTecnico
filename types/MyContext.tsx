import { Dayjs } from "dayjs";
import React from "react";

export interface MyContextType {
  numeroDoContainer: string;
  responsavelTecnico: string;
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
  responsavelFalhaServico: string;
}

export interface Pecas {
  descricao: string;
  quantidade: string;
  responsavelFalha: string;
}

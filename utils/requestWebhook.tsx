"use client";
import { Dayjs } from "dayjs";
import { Alert, Pecas, Service } from "../types/MyContext";
import { useState } from "react";

export const requisition = async (
  setShowAlert: React.Dispatch<React.SetStateAction<Alert>>,
  NumeroDoContainer: string,
  ResponsavelTecnico: string,
  Date: Dayjs | null,
  ocorrencia: string,
  ResponsavelCliente: string,
  Email: string,
  Telefone: string,
  Rg: string,
  Services: Service[],
  Pecas: Pecas[],
  Destino: string,
  Origem: string,
  Km: string,
  Inicio: Dayjs | null,
  Termino: Dayjs | null,
  Obs: string,
  clientSign: string | null,
  techSign: string | null
) => {
  if (
    !NumeroDoContainer ||
    !ResponsavelTecnico ||
    !Date ||
    !ocorrencia ||
    !ResponsavelCliente ||
    !Telefone ||
    !Rg ||
    !Services.length ||
    !Pecas.length ||
    !Destino ||
    !Origem ||
    !Km ||
    !Inicio ||
    !Termino ||
    !Obs ||
    !clientSign ||
    !techSign
  ) {
    setShowAlert({
      severity: "error",
      text: "Preencha os campos para gerar Relatório",
      show: true,
    });
    return;
  }

  try {
    const req = await fetch(
      "https://n8n-zgewg-u14829.vm.elestio.app/webhook/886cd66f-af49-4e85-86bf-ccda667acf78",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NumeroDoContainer,
          ResponsavelTecnico,
          Data: Date?.format("DD/MM/YYYY"),
          Dia: Date?.format("DD"),
          Mes: Date?.format("MM"),
          Ano: Date?.format("YYYY"),
          Hour: Date?.format("HH:mm"),
          ocorrencia: ocorrencia,
          ResponsavelCliente,
          Email,
          Telefone,
          RG: Rg,
          Services: Services.map((service) => ({
            descService: service.descService,
          })),
          Peças: Pecas.map((peca) => ({
            descrição: peca.descricao,
            quantidade: peca.quantidade,
            responsavelFalha: peca.responsavelFalha,
          })),
          Observação: Obs,
          destino: Destino,
          origem: Origem,
          inicio: Inicio?.format("DD/MM/YYYY HH:mm"),
          termino: Termino?.format("DD/MM/YYYY HH:mm"),
          km: Km,
          clientSign: clientSign,
          techSign: techSign,
        }),
      }
    );

    if (req.ok) {
      setShowAlert({
        severity: "success",
        text: "Relatório gerado com sucesso !",
        show: true,
      });
    } else {
      setShowAlert({
        severity: "error",
        text: "Erro interno na requisição.",
        show: true,
      });
    }
  } catch (error) {
    setShowAlert({
      severity: "error",
      text: "Falha na conexão com o servidor. Tente novamente mais tarde.",
      show: true,
    });
  }
};

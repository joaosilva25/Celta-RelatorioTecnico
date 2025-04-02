import { Dayjs } from "dayjs";
import { Alert, Pecas, Service } from "../types/MyContext";

export const requisition = async (
  setShowAlert: React.Dispatch<React.SetStateAction<Alert>>,
  //   setLoadReqText: React.Dispatch<React.SetStateAction<boolean>>,
  NumeroDoContainer: string,
  ResponsavelTecnico: string,
  Date: Dayjs | null,
  Hour: Dayjs | null,
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
  ResponsavelFalha: string,
  Obs: string,
  clientSign: string | null,
  techSign: string | null
) => {
  if (
    !NumeroDoContainer ||
    !ResponsavelTecnico ||
    !Date ||
    !Hour ||
    !ocorrencia ||
    !ResponsavelCliente ||
    !Email ||
    !Telefone ||
    !Rg ||
    !Services.length ||
    !Pecas.length ||
    !Destino ||
    !Origem ||
    !Km ||
    !Inicio ||
    !Termino ||
    !ResponsavelFalha ||
    !Obs ||
    !clientSign ||
    !techSign
  ) {
    setShowAlert({
      severity: "error",
      text: "Preencha os campos para gerar Orçamento",
      show: true,
    });
    return;
  }

  try {
    const req = await fetch(
      "https://n8n-zgewg-u14829.vm.elestio.app/webhook-test/886cd66f-af49-4e85-86bf-ccda667acf78",
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
          Hour: Hour?.format("HH:mm"),
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
          })),
          Observação: Obs,
          destino: Destino,
          origem: Origem,
          inicio: Inicio?.format("DD/MM/YYYY HH:mm"),
          termino: Termino?.format("DD/MM/YYYY HH:mm"),
          km: Km,
          responsavelFalha: ResponsavelFalha,
          clientSign: clientSign,
          techSign: techSign,
        }),
      }
    );

    if (req.ok) {
      setShowAlert({
        severity: "success",
        text: "Orçamento gerado com sucesso!",
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

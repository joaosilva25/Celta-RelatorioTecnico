import { Dayjs } from "dayjs";
import { Pecas, Service } from "../types/MyContext";

export const requisition = async (
  //   setShowAlert: React.Dispatch<
  //     React.SetStateAction<{ severity: string; text: string; show: boolean }>
  //   >,
  //   setLoadReqText: React.Dispatch<React.SetStateAction<boolean>>,
  NumeroDoContainer: string,
  ResponsavelTecnico: string,
  Equipamento: string,
  Date: Dayjs | null,
  Hour: Dayjs | null,
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
  Obs: string
) => {
  const req = await fetch(
    "https://n8n-zgewg-u14829.vm.elestio.app/webhook-test/886cd66f-af49-4e85-86bf-ccda667acf78",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NumeroDoContainer: `${NumeroDoContainer}`,
        ResponsavelTecnico: `${ResponsavelTecnico}`,
        Equipamento: `${Equipamento}`,
        Data: `${Date?.format("DD/MM/YYYY")}`,
        Dia: `${Date?.format("DD")}`,
        Mes: `${Date?.format("MM")}`,
        Ano: `${Date?.format("YYYY")}`,
        Hour: `${Hour?.format("HH:mm")}`,
        ResponsavelCliente: `${ResponsavelCliente}`,
        Email: `${Email}`,
        Telefone: `${Telefone}`,
        RG: `${Rg}`,
        Services: Services.map((serviceArray, index) => ({
          descService: serviceArray.descService,
        })),
        Peças: Pecas.map((pecasArray, index) => ({
          descrição: pecasArray.descricao,
          quantidade: pecasArray.quantidade,
        })),
        Observação: `${Obs}`,
        destino: `${Destino}`,
        origem: `${Origem} `,
        inicio: `${Inicio?.format("DD/MM/YYYY HH:mm")}`,
        termino: `${Termino?.format("DD/MM/YYYY HH:mm")}`,
        km: `${Km} `,
        responsavelFalha: `${ResponsavelFalha}`, //
      }),
    }
  );
  //   if (req.ok) {
  //     setShowAlert({
  //       severity: "success",
  //       text: "orçamento gerado com Sucesso",
  //       show: true,
  //     });
  //   } else {
  //     setShowAlert({
  //       severity: "error",
  //       text: "Erro Interno na Requisição",
  //       show: true,
  //     });
  //   }
  //   // } else {
  //   //   setShowAlert({
  //   //     severity: "error",
  //   //     text: "Preencha os campos para gerar Orçamento",
  //   //     show: true,
  //   //   });
  //   // }
  //   setLoadReqText(false);
};

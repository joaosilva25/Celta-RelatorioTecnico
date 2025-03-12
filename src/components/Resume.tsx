"use client";
import { useContext } from "react";
import { MyContext } from "./forms";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { AiOutlineLoading } from "react-icons/ai";
import { OrbitProgress } from "react-loading-indicators";
import { motion } from "motion/react";
import { requisition } from "../../utils/requestWebhook";

export default function Resume() {
  const context = useContext(MyContext);

  if (!context) {
    return null;
  }
  const {
    numeroDoContainer,
    responsavelTecnico,
    equipamento,
    date,
    hour,
    responsavelCliente,
    email,
    telefone,
    rg,
    services,
    obs,
    pecas,
    origem,
    destino,
    km,
    inicio,
    termino,
    responsavelFalha,
  } = context;

  // function closeAlert() {
  //   setShowAlert({
  //     severity: "success",
  //     text: "",
  //     show: false,
  //   });
  // }
  return (
    <div className="flex items-center flex-col lg:justify-center bg-white">
      {/* {showAlert.show && (
    <motion.div
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1.2, opacity: 1, transition: { duration: 0.3 } }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <Alert
        severity={showAlert.severity}
        className="flex relative bottom-4 w-[450px]"
        onClose={closeAlert}
      >
        <span className="text-xs">{showAlert.text}</span>
      </Alert>
    </motion.div>
  )} */}

      <div className="w-[400px] lg:h-[600px] p-10 bg-white border flex justify-center flex-col items-center gap-10">
        <div className="w-full">
          <h1 className="text-2xl text-center">
            <span className="font-bold">Res</span>umo
          </h1>
          <p className="opacity-50 text-sm text-justify w-72 mt-8">
            Confira e confirme os dados inseridos antes de prosseguir com a
            ação.
          </p>
        </div>
        <div className="h-[300px] overflow-y-auto flex flex-col gap-3 w-full py-6">
          {/* Atendente */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Numero do Container:</h4>
            <h4 className="font-light text-sm">
              {numeroDoContainer || "Não informado"}
            </h4>
          </div>

          {/* Modelo Contrato */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Responsável Técnico:</h4>
            <h4 className="font-light text-sm">
              {responsavelTecnico || "Não informado"}
            </h4>
          </div>

          {/* Tipo Transação */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Equipamento:</h4>
            <h4 className="font-light text-sm">
              {equipamento || "Não informado"}
            </h4>
          </div>

          {/* Nome / Empresa */}
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Data:</h4>
            <h4 className="font-light text-sm">
              {date ? date.format("DD/MM/YYYY") : "Não informado"}
            </h4>
          </div>
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Hora:</h4>
            <h4 className="font-light text-sm">
              {hour ? hour.format("HH:mm") : "Não informado"}
            </h4>
          </div>

          <div className="mt-6">
            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Responsável Cliente:</h4>
              <h4 className="font-light text-sm">
                {responsavelCliente || "Não informado"}
              </h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Email:</h4>
              <h4 className="font-light text-sm">{email || "Não informado"}</h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Telefone:</h4>
              <h4 className="font-light text-sm">
                {telefone || "Não informado"}
              </h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Rg:</h4>
              <h4 className="font-light text-sm">{rg || "Não informado"}</h4>
            </div>
          </div>

          <div className="mt-4">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col gap-2 mb-2">
                <h4 className="font-bold text-sm">
                  {index + 1} - Serviço Realizado:
                </h4>
                <h4 className="font-light text-sm">
                  Descrição: {service.descService || "Não informado"}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-4">
            {pecas.map((pecas, index) => (
              <div key={index} className="flex flex-col gap-2 mb-2">
                <h4 className="font-bold text-sm">
                  {index + 1} - Peças Utilizadas:
                </h4>
                <h4 className="font-light text-sm">
                  Descrição: {pecas.descricao || "Não informado"}
                </h4>
                <h4 className="font-light text-sm">
                  Quantidade: {pecas.quantidade || "Não informado"}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Origem:</h4>
              <h4 className="font-light text-sm">
                {origem || "Não informado"}
              </h4>
            </div>
            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Destino:</h4>
              <h4 className="font-light text-sm">
                {destino || "Não informado"}
              </h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">KM:</h4>
              <h4 className="font-light text-sm">{km || "Não informado"} </h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Inicio:</h4>
              <h4 className="font-light text-sm">
                {inicio ? inicio?.format("DD/MM/YYYY HH MM") : "Não informado"}{" "}
              </h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Termino:</h4>
              <h4 className="font-light text-sm">
                {termino
                  ? termino?.format("DD/MM/YYYY HH MM")
                  : "Não informado"}{" "}
              </h4>
            </div>

            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Responsável pela Falha:</h4>
              <h4 className="font-light text-sm">
                {responsavelFalha || "Não informado"}
              </h4>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-2 mb-2">
              <h4 className="font-bold text-sm">Observação:</h4>
              <h4 className="font-light text-sm">{obs || "Não informado"}</h4>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            requisition(
              numeroDoContainer,
              responsavelTecnico,
              equipamento,
              date,
              hour,
              responsavelCliente,
              email,
              telefone,
              rg,
              services,
              pecas,
              origem,
              destino,
              km,
              inicio,
              termino,
              responsavelFalha,
              obs
            )
          }
          className="h-14 relative top-2 flex w-full justify-center gap-5 items-center bg-primaryColor px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm active:scale-105 focus-visible:outline"
        >
          Gerar Orçamento
        </button>
      </div>
    </div>
  );
}

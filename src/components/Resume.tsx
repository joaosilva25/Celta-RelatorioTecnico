"use client";
import { useContext, useState } from "react";
import { MyContext } from "./forms";
import Alert from "@mui/material/Alert";
import { AiOutlineLoading } from "react-icons/ai";
import { motion } from "motion/react";
import { requisition } from "../../utils/requestWebhook";
import { LiaFileAlt } from "react-icons/lia";

export default function Resume() {
  const context = useContext(MyContext);

  function closeAlert() {
    setShowAlert({
      severity: "success",
      text: "",
      show: false,
    });
  }
  const [loadReqText, setLoadReqText] = useState(false);

  if (!context) {
    return null;
  }

  const {
    numeroDoContainer,
    responsavelTecnico,
    date,
    ocorrencia,
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
    setShowAlert,
    showAlert,
    clientSign,
    techSign,
  } = context;

  return (
    <div className="flex items-center flex-col lg:justify-center bg-white">
      {showAlert && showAlert.show && (
        <motion.div
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1, transition: { duration: 0.3 } }}
          exit={{ scale: 0, opacity: 0 }}
          className="w-[450px] max-sm:w-full max-sm:px-12 mt-16"
        >
          <Alert
            severity={showAlert.severity}
            className="flex relative bottom-4 "
            onClose={closeAlert}
          >
            <span className="text-xs">{showAlert.text}</span>
          </Alert>
        </motion.div>
      )}

      <div className="w-[400px] lg:h-[600px] max-sm:w-full p-8 max-sm:pt-16 max-sm:pb-24 max-md:pt-12 max-md:pb-24 max-md:border-none bg-white border flex justify-center flex-col items-center gap-10">
        <div className="w-full">
          <h1 className="text-2xl text-center font-semibold">Resumo</h1>
          <p className="opacity-50 text-sm text-justify w-72 mt-8">
            Confira e confirme os dados inseridos antes de prosseguir com a
            ação.
          </p>
        </div>
        <div className="h-[300px] overflow-y-auto flex flex-col gap-3 w-full py-6">
          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Numero do Container:</h4>
            <h4 className="font-light text-sm">
              {numeroDoContainer || "Não informado"}
            </h4>
          </div>

          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Responsável Técnico:</h4>
            <h4 className="font-light text-sm">
              {responsavelTecnico || "Não informado"}
            </h4>
          </div>

          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Data:</h4>
            <h4 className="font-light text-sm">
              {date ? date.format("DD/MM/YYYY HH:mm") : "Não informado"}
            </h4>
          </div>

          <div className="flex gap-2 mb-2">
            <h4 className="font-bold text-sm">Ocorrencia:</h4>
            <h4 className="font-light text-sm">
              {ocorrencia || "Não informado"}
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
                <h4 className="font-light text-sm">
                  Responsável Falha: {pecas.responsavelFalha || "Não informado"}
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
          </div>

          <div className="mt-4">
            <div className="flex gap-2">
              <h4 className="font-bold text-sm">Observação:</h4>
              <h4 className="font-light text-sm">{obs || "Não informado"}</h4>
            </div>
          </div>
          {/* <div>
            <div className="flex gap-2">
              <h4 className="font-bold text-sm">Assinatura Tecnico:</h4>
              <h4 className="font-light text-sm">
                {techSign ? "OK" : "Não informado"}
              </h4>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <h4 className="font-bold text-sm">Assinatura Cliente:</h4>
              <h4 className="font-light text-sm">
                {clientSign ? "OK" : "Não informado"}
              </h4>
            </div>
          </div> */}
        </div>
        <button
          disabled={loadReqText}
          onClick={() => {
            setLoadReqText(true);
            requisition(
              setShowAlert,
              numeroDoContainer,
              responsavelTecnico,
              date,
              ocorrencia,
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
              obs,
              clientSign,
              techSign
            ).finally(() => setLoadReqText(false));
          }}
          className={`h-14 relative top-2 flex w-full justify-center gap-5 items-center border px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus-visible:outline active:scale-105 transition 
            ${
              loadReqText
                ? "text-white bg-primaryColor opacity-80 cursor-not-allowed"
                : "bg-transparent border-black text-black hover:text-white hover:bg-primaryColor"
            }`}
        >
          {loadReqText ? (
            <>
              Gerando Orçamento...
              <AiOutlineLoading className="animate-spin" />
            </>
          ) : (
            <>
              Gerar Orçamento
              <LiaFileAlt className="text-2xl" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

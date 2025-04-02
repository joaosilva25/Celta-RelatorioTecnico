"use client";
import React, { useState, createContext } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import "dayjs/locale/pt";
import { motion } from "motion/react";
import { IoAddCircle } from "react-icons/io5";
import Resume from "./Resume";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ptBR } from "@mui/x-date-pickers/locales";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Alert,
  MyContextType,
  Pecas,
  Produto,
  Service,
} from "../../types/MyContext";
import {
  addNewPecas,
  addNewService,
  deletePecas,
  deleteService,
} from "../../utils/addAndDeleteInputsFunction";
import dayjs, { Dayjs } from "dayjs";
import { Pagination, Stack } from "@mui/material";
import { Assinatura } from "../../utils/canvaSignature";

dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(timezone);

export const MyContext = createContext<MyContextType | null>(null);
export default function FormTemplate() {
  let [activeTab, setActiveTab] = useState(0);

  const [services, setServices] = useState<Service[]>([
    {
      descService: " ",
    },
  ]);

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedProdInputs: any = [...services];
    updatedProdInputs[index][field] = value;
    setServices(updatedProdInputs);
  };

  const [pecas, setPecas] = useState<Pecas[]>([
    {
      descricao: " ",
      quantidade: "1",
    },
  ]);

  const handleInputChangePecas = (index: any, field: any, value: any) => {
    const updatedProdInputs: any = [...pecas];
    updatedProdInputs[index][field] = value;
    setPecas(updatedProdInputs);
  };

  const [numeroDoContainer, setNumeroDoContainer] = useState("");
  const [responsavelTecnico, setResponsavelTecnico] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [hour, setHour] = useState<Dayjs | null>(null);
  const [obs, setObs] = useState("");
  const [ocorrencia, setOcorrencia] = useState("");

  const [responsavelCliente, setResponsavelCliente] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRg] = useState("");

  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [km, setKm] = useState("");
  const [inicio, setInicio] = useState<Dayjs | null>(null);
  const [termino, setTermino] = useState<Dayjs | null>(null);
  const [responsavelFalha, setResponsavelFalha] = useState("");

  const clientSign =
    typeof window !== "undefined" ? sessionStorage.getItem("ClientSign") : null;
  const techSign =
    typeof window !== "undefined" ? sessionStorage.getItem("TechSign") : null;

  const [showAlert, setShowAlert] = useState<Alert>({
    severity: "success",
    text: "",
    show: false,
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const tabs = [
    {
      title: "Identificação do Chamado",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Número do Container
          </label>
          <input
            className="h-12 block w-full bg-transparent uppercase px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:normal-case -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Número do Container"
            value={numeroDoContainer}
            onChange={(e) => setNumeroDoContainer(e.target.value)}
          />
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Responsável Técnico
          </label>
          <input
            className="h-12 block w-full bg-transparent uppercase px-3 py-1.5 text-base text-gray-900 outline outline-1 placeholder:normal-case -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            value={responsavelTecnico}
            placeholder="Responsavel Técnico"
            onChange={(e) => setResponsavelTecnico(e.target.value)}
          />
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Ocorrência
          </label>
          <select
            value={ocorrencia}
            onChange={(e) => setOcorrencia(e.target.value)}
            className="mb-4 h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
          >
            <option value="">Selecione...</option>
            <option value="Emergencial">Emergencial</option>
            <option value="Garantia">Garantia</option>
            <option value="Preventiva Contrato">Preventiva Contrato</option>
            <option value="Corretiva Contrato">Corretiva Contrato</option>
            <option value="Outros">Outros</option>
          </select>

          <div className="mt-14 flex justify-between gap-4">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
              }
              adapterLocale="pt"
            >
              <DatePicker
                views={["day", "month", "year"]}
                value={date}
                label={"Data"}
                timezone="America/Sao_Paulo"
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <TimePicker
                views={["hours", "minutes"]}
                ampm={false}
                label={"Hora"}
                timezone="America/Sao_Paulo"
                onChange={(newValue) => setHour(newValue)}
                localeText={
                  ptBR.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
              />
            </LocalizationProvider>
          </div>
        </>
      ),
      index: 1,
    },
    {
      title: "Informações do Cliente",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Responsável Cliente
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Cliente"
            value={responsavelCliente}
            onChange={(e) => setResponsavelCliente(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Email*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            Telefone*
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Telefone"
            type="number"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label className="mt-4 block text-sm/6 font-bold text-gray-900">
            RG
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="RG"
            type="number"
            min="0"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
          />
        </>
      ),
      index: 2,
    },
    {
      title: "Serviços realizados",
      content: (
        <>
          {services.map((serviceElement, index) => (
            <div key={index}>
              <div className="flex gap-10 mt-10 mb-10">
                <h1 className="text-md font-bold">
                  <span className="font-light text-md">{index + 1}</span> -
                  Serviços
                </h1>
                {index > 0 ? (
                  <button
                    className="active:scale-105"
                    onClick={() => deleteService(index, services, setServices)}
                  >
                    <FaDeleteLeft size={25} />
                  </button>
                ) : null}
              </div>
              <label className="block mt-4 text-sm font-semibold text-gray-900">
                Descrição
              </label>
              <textarea
                placeholder="Descrição"
                rows={4}
                value={serviceElement.descService}
                onChange={(e) =>
                  handleInputChange(index, "descService", e.target.value)
                }
                className="mt-2 block w-full  resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm"
              />
            </div>
          ))}
          <button
            onClick={() => addNewService(services, setServices)}
            className="text-xl bg-transparent mt-10 h-14 flex w-full justify-center items-center px-3 py-1.5  font-semibold text-white shadow-sm focus-visible:outline"
          >
            <IoAddCircle size={40} className="text-black" />
          </button>
        </>
      ),
      index: 3,
    },
    {
      title: "Peças Utilizadas",
      content: (
        <>
          {pecas.map((pecasElement, index) => (
            <div key={index}>
              <div className="flex gap-10 mt-10 mb-10">
                <h1 className="text-md font-bold">
                  <span className="font-light text-md">{index + 1}</span> -
                  Peças Utilizadas
                </h1>
                {index > 0 ? (
                  <button
                    className="active:scale-105"
                    onClick={() => deletePecas(index, pecas, setPecas)}
                  >
                    <FaDeleteLeft size={25} />
                  </button>
                ) : null}
              </div>
              <label className="mt-10 block text-sm/6 font-bold text-gray-900">
                Descrição
              </label>
              <textarea
                placeholder="Descrição"
                value={pecasElement.descricao}
                onChange={(e) =>
                  handleInputChangePecas(index, "descricao", e.target.value)
                }
                rows={3}
                className="w-full block resize-none first-letter:w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
              />
              <label className="mt-10 block text-sm/6 font-bold text-gray-900">
                Quantidade
              </label>
              <input
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                placeholder="Quantidade"
                min="1"
                value={pecasElement.quantidade}
                onChange={(e) =>
                  handleInputChangePecas(index, "quantidade", e.target.value)
                }
                type="number"
              />
            </div>
          ))}
          <button
            onClick={() => addNewPecas(pecas, setPecas)}
            className="text-xl bg-transparent mt-10 h-14 flex w-full justify-center items-center px-3 py-1.5  font-semibold text-white shadow-sm focus-visible:outline"
          >
            <IoAddCircle size={40} className="text-black" />
          </button>
        </>
      ),
      index: 4,
    },
    {
      title: "Controle de Atendimento",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Responsável pela Falha
          </label>
          <select
            value={responsavelFalha}
            onChange={(e) => setResponsavelFalha(e.target.value)}
            className="mb-4 h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
          >
            <option value="">Selecione...</option>
            <option value="Celta">Celta</option>
            <option value="Cliente">Cliente</option>
          </select>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Origem
          </label>
          <input
            placeholder="Origem"
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
          ></input>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Destino
          </label>
          <input
            placeholder="Destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
          ></input>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            KM
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="KM"
            value={km}
            min="1"
            onChange={(e) => setKm(e.target.value)}
            type="number"
          />{" "}
          <div className="flex flex-col gap-1">
            <label className="mt-10 block text-sm/6 font-bold text-gray-900">
              Data inicial / Final Reparo
            </label>
            <div className="flex gap-4 mt-2 justify-between">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  views={["day", "month", "year"]}
                  ampm={false}
                  value={inicio}
                  label={"Data Inicial"}
                  onChange={(newValue) => setInicio(newValue)}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  views={["day", "month", "year"]}
                  ampm={false}
                  value={termino}
                  label={"Data Final"}
                  onChange={(newValue) => setTermino(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>
        </>
      ),
      index: 5,
    },
    {
      title: "Observação",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Observação
          </label>
          <textarea
            className="mb-4 block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            value={obs}
            rows={5}
            onChange={(e) => setObs(e.target.value)}
          ></textarea>
        </>
      ),
      index: 6,
    },
    {
      title: "Assinatura",
      content: <Assinatura />,
      index: 7,
    },
  ];

  const next = () => {
    let newActive = activeTab + 1;

    console.log(activeTab);
    if (newActive >= tabs.length) {
      newActive = 0; // Se ultrapassar o índice máximo, volta para 0
    }

    // Atualizando o estado com o novo índice
    setActiveTab(newActive);
  };

  return (
    <MyContext.Provider
      value={{
        numeroDoContainer,
        responsavelTecnico,
        date,
        hour,
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
        responsavelFalha,
        obs,
        showAlert,
        setShowAlert,
        clientSign,
        techSign,
      }}
    >
      <div className="flex justify-center bg-white">
        <div className="w-[550px] h-full flex justify-center flex-col items-center">
          <div className="flex space-x-4 mb-4 w-full">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-2xl font-bold">{tabs[activeTab].title}</h1>
              {/* <h2
                className="text-md h-12 w-40 bg-black text-white"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Menu
              </button> */}
            </div>
          </div>
          <div className="custom-scroll w-full mt-6 cursor-pointer bg-transparent max-w-full flex gap-6 text-sm mb-8 overflow-x-auto">
            {tabs.map((tab, index) => (
              <Stack key={index} spacing={2}>
                <div
                  className={`flex items-center justify-center border border-black h-10 w-10 ${
                    activeTab === index
                      ? "border-black font-bold bg-black text-white"
                      : "bg-transparent text-black"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {index + 1}
                </div>
              </Stack>
            ))}
          </div>

          <motion.div
            className="w-full"
            key={tabs[activeTab].index}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.4 } }}
            exit={{ x: -200, opacity: 0 }}
          >
            <form
              className="flex pt-2 w-full justify-center flex-col overflow-y-auto overscroll-auto  p-2"
              method="POST"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="max-h-[400px]">{tabs[activeTab].content}</div>
            </form>
            <div className="mt-2 py-12 w-full">
              <button
                onClick={() => next()}
                className="h-14 flex w-full shadow-xl p-2

justify-center  items-center bg-transparent border border-black px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-primaryColor hover:text-white focus-visible:outline
active:scale-105"
              >
                Próximo
              </button>
              <div className="mt-10 w-full flex justify-end">
                {tabs[activeTab].index} /{" "}
                <span className="font-bold ml-1">{tabs.length}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Resume />
    </MyContext.Provider>
  );
}

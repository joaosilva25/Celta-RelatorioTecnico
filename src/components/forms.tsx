"use client";
import { useState, createContext } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import "dayjs/locale/pt";
import { motion } from "motion/react";
import { IoAddCircle } from "react-icons/io5";
import Resume from "./Resume";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MyContextType, Pecas, Produto, Service } from "../../types/MyContext";
import {
  addNewPecas,
  addNewService,
  deletePecas,
  deleteService,
} from "../../utils/addAndDeleteInputsFunction";
import dayjs, { Dayjs } from "dayjs";

dayjs.locale("pt-br");
dayjs.extend(utc);

export const MyContext = createContext<MyContextType | null>(null);
export default function FormTemplate() {
  let [activeTab, setActiveTab] = useState(0);

  interface Alert {
    severity: "error" | "warning" | "info" | "success";
    text: string;
    show: boolean;
  }

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
      quantidade: "0",
    },
  ]);

  const handleInputChangePecas = (index: any, field: any, value: any) => {
    const updatedProdInputs: any = [...services];
    updatedProdInputs[index][field] = value;
    setPecas(updatedProdInputs);
  };

  const [numeroDoContainer, setNumeroDoContainer] = useState("");
  const [responsavelTecnico, setResponsavelTecnico] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [hour, setHour] = useState<Dayjs | null>(null);
  const [obs, setObs] = useState("");

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

  const [loadReqText, setLoadReqText] = useState(false);
  const [errorReq, setErrorReq] = useState(false);
  const [showAlert, setShowAlert] = useState<Alert>({
    severity: "success",
    text: "",
    show: false,
  });

  const tabs = [
    {
      title: "Identificação do Chamado",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Número do Container
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="Número do Container"
            value={numeroDoContainer}
            onChange={(e) => setNumeroDoContainer(e.target.value)}
          />
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Responsável Técnico
          </label>
          <select
            className="mb-4 h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            value={responsavelTecnico}
            onChange={(e) => setResponsavelTecnico(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Matheus">Matheus</option>
            <option value="Patricia">Patricia</option>
            <option value="Viviane">Viviane</option>
            <option value="Teste">Teste</option>
          </select>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Equipamento
          </label>
          <select
            className="mb-4 h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
            value={equipamento}
            onChange={(e) => setEquipamento(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Reefer">Reefer</option>
            <option value="Ar condicionado">Ar condicionado</option>
            <option value="Trafo">Trafo</option>
            <option value="Outros">Outros</option>
          </select>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Data
          </label>
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
              timezone="America/Sao_Paulo"
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Hora
          </label>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            <TimePicker
              views={["hours", "minutes"]}
              ampm={false}
              timezone="America/Sao_Paulo"
              onChange={(newValue) => setHour(newValue)}
              localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
              }
            />
          </LocalizationProvider>
        </>
      ),
      index: 1,
    },
    {
      title: "Informações do Cliente",
      content: (
        <>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Responsável pelo Cliente
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
                  Serviços -{" "}
                  <span className="font-light text-md">{index + 1}</span>
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
                value={serviceElement.descService}
                onChange={(e) =>
                  handleInputChange(index, "descService", e.target.value)
                }
                className="h-12 mt-2 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm"
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
                  Peças Utilizadas -{" "}
                  <span className="font-light text-md">{index + 1}</span>
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
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
              />
              <label className="mt-10 block text-sm/6 font-bold text-gray-900">
                Quantidade
              </label>
              <input
                className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                placeholder="Quantidade"
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
            <option value="Celta">Celta</option>
            <option value="Cliente">Cliente</option>
          </select>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col">
              <label className="mt-10 block text-sm/6 font-bold text-gray-900">
                Inicio
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  ampm={false}
                  value={inicio}
                  onChange={(newValue) => setInicio(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-col">
              <label className="mt-10 block text-sm/6 font-bold text-gray-900">
                Termino
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  ampm={false}
                  value={termino}
                  onChange={(newValue) => setTermino(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Origem
          </label>
          <textarea
            placeholder="Origem"
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
          />
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            Destino
          </label>
          <textarea
            placeholder="Destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
          />
          <label className="mt-10 block text-sm/6 font-bold text-gray-900">
            KM
          </label>
          <input
            className="h-12 block w-full bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
            placeholder="KM"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            type="number"
          />
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
        obs,
      }}
    >
      <div className="flex justify-center bg-white">
        <motion.div
          key={tabs[activeTab].index}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.4 } }}
          exit={{ x: -200, opacity: 0 }}
        >
          <div className="w-[550px] h-full flex justify-center flex-col items-center">
            <div className="flex space-x-4 mb-6 w-full">
              <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">{tabs[activeTab].title}</h1>
                <h4 className="text-md">
                  {tabs[activeTab].index} /{" "}
                  <span className="font-bold">{tabs.length}</span>
                </h4>
              </div>
            </div>
            <div className="w-full bg-transparent flex gap-4 text-sm pb-4">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`bg-black h-3 w-3 rounded-full ${
                    activeTab === index
                      ? "bg-primaryColor text-white font-bold"
                      : "bg-gray-200 text-black"
                  }`}
                ></button>
              ))}
            </div>

            <form
              className="flex  w-full justify-center flex-col overflow-y-auto overscroll-auto  p-2"
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
            </div>
          </div>
        </motion.div>
      </div>
      <Resume />
    </MyContext.Provider>
  );
}

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

export default function Login() {
  const router = useRouter();
  const [accessCode, setAcessCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [accessError, setAccessError] = useState("");

  function acessLogin() {
    if (accessCode === "") {
      return setAccessError("Preencha o campo para acessar");
    }
    if (accessCode === process.env.NEXT_PUBLIC_CODE) {
      router.push("/area");
      sessionStorage.setItem("authenticated", "true");
    } else {
      setAccessError("Código de acesso incorreto");
    }
  }

  return (
    <main className="bg-white h-screen grid grid-rows-[auto,1fr] grid-cols-2 w-full max-sm:grid-cols-1 max-md:grid-cols-1 text-black">
      {/* Header */}
      <header className="col-span-2 p-0">
        <div className="h-[95px] w-[70px] bg-primaryColor p-0 flex items-center justify-center max-sm:h-[65px] max-sm:w-[65px] max-md:w-[80px] max-md:h-[80px]">
          <Image
            src="/CC_Negativo.png"
            width={30}
            height={30}
            alt="Descrição da imagem significativa"
          />
        </div>
      </header>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
        exit={{ x: -200, opacity: 0 }}
      >
        <div className="h-full flex font-bold justify-center items-center">
          <div className="flex flex-col gap-6 w-1/2 max-sm:w-full max-sm:p-6 max-md:w-3/5">
            <div className="w-full">
              <h1 className="lg:text-[45px] max-sm:text-5xl max-md:text-6xl max-sm:text-center max-md:text-center">
                Bem <span className="font-light">Vindo</span>
              </h1>
              <h5 className="text-justify opacity-60 mt-6 text-sm font-light max-sm:text-center max-md:text-center">
                Sistema de Geração de Relatórios Técnicos
              </h5>
            </div>
            <div className="mt-10">
              <label className="lg:text-sm">Código Acesso*</label>
              <input
                placeholder="Código Acesso"
                value={accessCode}
                onChange={(e) => setAcessCode(e.target.value)}
                className="lg:h-12 block w-full mt-3 bg-transparent px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 max-sm:text-sm
                max-sm:p-3 max-md:p-4 sm:text-sm/6"
              ></input>
            </div>
            <button
              onClick={acessLogin}
              className="h-12 flex w-full shadow-xl relative top-4
justify-center  items-center bg-transparent border border-black px-3 py-1.5 text-sm/6 font-semibold text-black hover:bg-primaryColor hover:text-white focus-visible:outline active:scale-105
 max-sm:p-3 max-md:p-7"
            >
              Acessar
            </button>
            <p className="text-center text-red-500 text-sm relative top-4">
              {accessError}
            </p>
            <h5 className="text-center mt-8 text-md lg:text-sm">
              <span className="font-light">Acesso somente de</span> usuários
              autorizados
            </h5>
          </div>
        </div>
      </motion.div>
      <div className="h-full pl-12 pr-12 pb-8 flex justify-center max-sm:hidden max-md:hidden">
        <div className="h-full flex w-3/4 bg-primaryColor  items-center justify-center">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
            exit={{ y: -200, opacity: 0 }}
          >
            <Image
              src="/CC_lockup_1_Negativo.png"
              width={250}
              height={250}
              alt="Descrição da imagem significativa"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}

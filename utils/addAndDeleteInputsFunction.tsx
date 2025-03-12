"use client";
import { useState } from "react";
import { Pecas, Produto, Service } from "../types/MyContext";

export const addNewProduct = (
  prodInputs: Produto[],
  setProdInputs: React.Dispatch<React.SetStateAction<Produto[]>>
) => {
  setProdInputs([
    ...prodInputs,
    {
      produto: "",
      medidas: "",
      quantidade: "1",
      valor: "0",
    },
  ]);
};

export const addNewService = (
  services: Service[],
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  setServices([
    ...services,
    {
      descService: "",
    },
  ]);
};

export const addNewPecas = (
  pecas: Pecas[],
  setPecas: React.Dispatch<React.SetStateAction<Pecas[]>>
) => {
  setPecas([
    ...pecas,
    {
      descricao: "",
      quantidade: "0",
    },
  ]);
};

export const deleteService = (
  index: number,
  services: Service[],
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  services.splice(index, 1);
  setServices([...services]);
};

export const deletePecas = (
  index: number,
  pecas: Pecas[],
  setPecas: React.Dispatch<React.SetStateAction<Pecas[]>>
) => {
  pecas.splice(index, 1);
  setPecas([...pecas]);
};

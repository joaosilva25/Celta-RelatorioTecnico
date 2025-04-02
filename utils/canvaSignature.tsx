"use client";
import React, { useRef, useState, useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import SignatureCanvas from "react-signature-canvas";

export const Assinatura = () => {
  const sigRefTech = useRef<SignatureCanvas | null>(null);
  const sigRefClient = useRef<SignatureCanvas | null>(null);
  const [signatureClient, setSignatureClient] = useState<string | null>(null);
  const [signatureTechnician, setSignatureTechnician] = useState<string | null>(
    null
  );

  const handleSignatureEnd = (
    signatureType: React.Dispatch<React.SetStateAction<string | null>>,
    ref: React.RefObject<SignatureCanvas>,
    signKey: string
  ) => {
    if (signatureType && ref.current && typeof window !== "undefined") {
      const dataUrl = ref.current.toDataURL();
      signatureType(dataUrl);
      localStorage.setItem(signKey, dataUrl);
    }
  };

  const clearSignature = (
    signatureType: React.Dispatch<React.SetStateAction<string | null>>,
    ref: React.RefObject<SignatureCanvas>,
    signKey: string
  ) => {
    if (ref.current) {
      ref.current.clear();
      signatureType(null);
      localStorage.removeItem(signKey);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedClientSign = localStorage.getItem("ClientSign");
      const storedTechSign = localStorage.getItem("TechSign");

      if (storedClientSign) {
        setSignatureClient(storedClientSign);
        sigRefClient.current?.fromDataURL(storedClientSign);
      }

      if (storedTechSign) {
        setSignatureTechnician(storedTechSign);
        sigRefTech.current?.fromDataURL(storedTechSign);
      }
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col space-y-4">
      <div className="flex-1 px-6">
        <div className="border-b border-gray-300 h-full">
          <SignatureCanvas
            canvasProps={{ className: "w-full h-full" }}
            penColor="black"
            ref={sigRefTech}
            onEnd={() =>
              handleSignatureEnd(setSignatureTechnician, sigRefTech, "TechSign")
            }
          />
        </div>
        <div className="w-full flex items-center justify-between mt-8 h-8">
          <h1 className="text-sm/6 font-bold">Assinatura Técnico</h1>
          <button
            onClick={() =>
              clearSignature(setSignatureTechnician, sigRefTech, "TechSign")
            }
            className="text-white h-full"
          >
            <LiaTimesSolid className="text-2xl text-black" />
          </button>
        </div>
      </div>
      <div className="flex-1 px-6">
        <div className="border-b border-gray-300 h-full">
          <SignatureCanvas
            canvasProps={{ className: "w-full h-full" }}
            penColor="black"
            ref={sigRefClient}
            onEnd={() =>
              handleSignatureEnd(setSignatureClient, sigRefClient, "ClientSign")
            }
          />
        </div>
        <div className="w-full flex items-center justify-between mt-8 h-8">
          <h1 className="text-sm/6 font-bold">Assinatura Cliente</h1>
          <button
            onClick={() =>
              clearSignature(setSignatureClient, sigRefClient, "ClientSign")
            }
            className="text-white h-full active:scale-110"
          >
            <LiaTimesSolid className="text-2xl text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

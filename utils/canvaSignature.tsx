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
      sessionStorage.setItem(signKey, dataUrl);
      console.log(dataUrl);
    }
  };

  const clearSignature = (
    signatureType: React.Dispatch<React.SetStateAction<string | null>>,
    ref: React.RefObject<SignatureCanvas>,
    signKey: string
  ) => {
    if (typeof window !== "undefined" && ref.current) {
      ref.current.clear();
      signatureType(null);
      sessionStorage.removeItem(signKey);
      console.log(signKey);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedClientSign = sessionStorage.getItem("ClientSign");
      const storedTechSign = sessionStorage.getItem("TechSign");

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
    <div className="h-full w-full flex flex-col gap-8 px-4 max-sm:px-2 py-4">
      {/* Assinatura Técnico */}
      <div className="flex flex-col gap-4">
        <div className="border-b border-gray-300 h-48 max-sm:h-36">
          <SignatureCanvas
            canvasProps={{ className: "w-full h-full" }}
            penColor="black"
            ref={sigRefTech}
            onEnd={() =>
              handleSignatureEnd(setSignatureTechnician, sigRefTech, "TechSign")
            }
          />
        </div>
        <div className="w-full flex items-center justify-between h-8">
          <h1 className="text-sm font-bold">Assinatura Técnico</h1>
          <button
            onClick={() =>
              clearSignature(setSignatureTechnician, sigRefTech, "TechSign")
            }
            className="h-full active:scale-110"
          >
            <LiaTimesSolid className="text-2xl text-black" />
          </button>
        </div>
      </div>

      {/* Assinatura Cliente */}
      <div className="flex flex-col gap-4">
        <div className="border-b border-gray-300 h-48 max-sm:h-36">
          <SignatureCanvas
            canvasProps={{ className: "w-full h-full" }}
            penColor="black"
            ref={sigRefClient}
            onEnd={() =>
              handleSignatureEnd(setSignatureClient, sigRefClient, "ClientSign")
            }
          />
        </div>
        <div className="w-full flex items-center justify-between h-8">
          <h1 className="text-sm font-bold">Assinatura Cliente</h1>
          <button
            onClick={() =>
              clearSignature(setSignatureClient, sigRefClient, "ClientSign")
            }
            className="h-full active:scale-110"
          >
            <LiaTimesSolid className="text-2xl text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

import { CatRegistrationDTO, CatSex } from "@/interfaces/api/CatRegistration";
import React, { createContext, useContext, useState } from "react";

type RegisterContextType = {
  data: CatRegistrationDTO;
  setField: <K extends keyof CatRegistrationDTO>(
    key: K,
    value: CatRegistrationDTO[K]
  ) => void;
  reset: () => void;
};

const defaultData: CatRegistrationDTO = {
  name: "",
  birthDate: undefined,
  picture: undefined,
  sex: CatSex.UNKNOWN,
  observations: "",
  vaccines: [],
  comorbidities: [],
  weight: undefined,
  favorite: false,
};

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<CatRegistrationDTO>(defaultData);

  const setField = <K extends keyof CatRegistrationDTO>(
    key: K,
    value: CatRegistrationDTO[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setData(defaultData);

  return (
    <RegisterContext.Provider value={{ data, setField, reset }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextType => {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error("useRegister must be used within RegisterProvider");
  return ctx;
};

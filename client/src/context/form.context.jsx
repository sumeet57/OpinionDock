// import React from 'react'
import { Children, createContext, useState } from "react";
export const FormContext = createContext();
const defaultField = {
  id: 1, // ID is now set sequentially
  label: "",
  type: "text",
  options: [],
  answerKey: [],
};
export const FormProvider = ({ children }) => {
  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    multipleSubmissions: false,
    fields: [{ ...defaultField, label: "Untitled Question" }],
  });

  return (
    <FormContext.Provider value={{ formDetails, setFormDetails }}>
      {children}
    </FormContext.Provider>
  );
};

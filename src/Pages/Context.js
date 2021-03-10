import React, { createContext, useContext } from "react";
import Data from "./Data";

export const Context = createContext();

export const useData = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const appData = Data();
  return <Context.Provider value={appData}>{children}</Context.Provider>;
};

export default Context;

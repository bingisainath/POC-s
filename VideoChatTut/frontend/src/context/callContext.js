import React, { createContext, useContext, useState } from "react";

const CallContext = createContext();

export const useCall = () => {
  return useContext(CallContext);
};

export const CallProvider = ({ children }) => {
  const [peer, setPeer] = useState(null);

  return (
    <CallContext.Provider value={{ peer, setPeer }}>
      {children}
    </CallContext.Provider>
  );
};

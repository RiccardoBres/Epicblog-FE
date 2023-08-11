import { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  
  const ModalLoginOpen =()=> {
    setShowModalLogin(true)
  }
  const ModalLoginClose =()=> {
    setShowModalLogin(false)
  }

  return (
    <ModalContext.Provider value={{ showModalLogin, setShowModalLogin}}>
      {children}
    </ModalContext.Provider>
  )
};

export default ModalContext;

//CREATO IL CONTESTO PER CONDIVIDERE LO STATO DELLA MODALE. PROVANDO A REFACTORIZZARE LE COMPONENTI CUSTOMNAVBAR & FACILITIES NON è STATO POSSIBILE UTILIZZARE IL CONTESTO 


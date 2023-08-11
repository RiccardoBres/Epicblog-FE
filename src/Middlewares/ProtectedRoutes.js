import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ModalLogin from "../Components/Navbar/ModalLogin";
import { Outlet, useNavigate } from "react-router-dom";

// Questa funzione `auth` è utilizzata per recuperare i dati dell'utente
// dal LocalStorage del browser. Restituisce un oggetto JavaScript
// contenente i dati dell'utente se presente, altrimenti restituisce null.
const auth = () => {
  const userLoggedIn = localStorage.getItem("userLoggedIn");
  return JSON.parse(userLoggedIn);
};

// La funzione `logout` è utilizzata per rimuovere i dati dell'utente
// dal LocalStorage quando l'utente esegue il logout.
export const logout = () => {
  localStorage.removeItem("userLoggedIn");
};

// La funzione `useSession` utilizza le funzioni di `auth` e `jwtDecode`
// per recuperare i dati dell'utente dal LocalStorage e decodificare il token JWT.
// Restituisce un oggetto contenente i dati dell'utente decodificati
// se l'utente è autenticato, altrimenti restituisce null.
export const useSession = () => {
  const session = auth(); // Recupera i dati dell'utente dal LocalStorage
  const decodedSession = session ? jwtDecode(session) : null; // Decodifica il token JWT se presente
  return decodedSession; // Restituisce i dati dell'utente decodificati o null
};

// Il componente `ProtectedRoutes` è utilizzato per gestire il routing
// protetto. Controlla se l'utente è autorizzato verificando la presenza
// dei dati dell'utente nel LocalStorage utilizzando la funzione `auth`.
// Se l'utente è autorizzato (cioè ha effettuato l'accesso), renderizza il componente
// `<Outlet />` che contiene il contenuto protetto. Se l'utente non è autorizzato,
// renderizza il componente `ModalLogin` che richiede l'accesso.
const ProtectedRoutes = () => {
  const isAuthorized = auth(); // Verifica se l'utente è autorizzato (loggato)
  const session = useSession(); // Recupera i dati dell'utente decodificati

  // Se l'utente è autorizzato, renderizza il componente `<Outlet />`
  // che mostra il contenuto protetto delle rotte.
  // Se l'utente non è autorizzato, renderizza il componente `ModalLogin`
  // che richiede l'accesso all'utente.
  return isAuthorized ? <Outlet /> : <ModalLogin />;
};

export default ProtectedRoutes;


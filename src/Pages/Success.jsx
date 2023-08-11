import React, { useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useSession } from '../Middlewares/ProtectedRoutes';

const Success = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');


    const saveUserToLocalStorage = (token)=>{
        if(token){
            localStorage.setItem('userLoggedIn', JSON.stringify(token))
        }
    }

    const session = useSession();
    console.log(session);

    useEffect(()=>{
        if(token){
            saveUserToLocalStorage(token)
            const delay = 2000;
            setTimeout(() => {
                // Dopo il ritardo, reindirizza l'utente all'homepage
                window.location.href = '/'; 
            }, delay);
        
        }
        
    }, [token])


  return (
    <div className='h-screen w-full'>
      <div>
        Login effettuato con successo
      </div>
    </div>
  )
}

export default Success

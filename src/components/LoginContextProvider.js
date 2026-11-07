import React,{useState} from 'react'
import { LoginContext } from './LoginContext';

const LoginContextProvider = ({children}) => {
 const [loggedIn,setLoggedIn] = useState(
  () => localStorage.getItem('loggedIn') === 'true'
 );
 const toggleLogin = ()=>{
  setLoggedIn((currentValue)=>{
   const nextValue = !currentValue;
   localStorage.setItem('loggedIn', String(nextValue));
   return nextValue;
  });
 }
  return (
    <LoginContext.Provider value={{loggedIn,toggleLogin}}>
     {children}
     </LoginContext.Provider>
  )
}

export default LoginContextProvider

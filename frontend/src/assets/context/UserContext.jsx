import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider  = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(true);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log('data', data);
    
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setIsLogged(true)
      alert('Usuario logueado exitosamente!')
      return true
    } else {
      alert(data?.error || "No se pudo logear");
      setIsLogged(false)
      return false
    }
  };

  const register = async (email, password, confirmPassword) => {
    setIsLogged(false)
    const response = await fetch("http://localhost:5000/api/auth/register", 
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword}),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsLogged(true)
      alert('Registro exitoso!!')
      return true
    } else {
      alert(data?.error || "No se pudo registrar");
      return false
    }
  };
 
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUser(null);
    alert("Vuelve pronto!");
  }

  const getUser = async () => {
    if (token) {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('getUser', data);
      setUser(data);
    }
  };

  return ( 
    <UserContext.Provider value={{token, setToken, logout, user, setUser, isLogged, setIsLogged, login, register, getUser }}>
      {children}
    </UserContext.Provider>
   );
}
 
export default UserProvider ;
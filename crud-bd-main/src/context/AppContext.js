const { createContext, useState, useEffect } = require("react");

export const AppContext = createContext({
  user :{
    isAdmin: false,
    cedula: "",
    id: "",
    casaID: "",
    condoID: "",
    isLogged: false
  }
});

export const AppProvider =  ({ children }) => {


  const [user, setUser] = useState({
    isAdmin: false,
    cedula: "",
    id: "",
    casaID: "",
    condoID: "",
    isLogged: false
    })
    console.log('paso por aqui', user)

  useEffect(() => {

    console.log('ME EJECUTO ')
   if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
}, [])



  useEffect(() => {
      console.log('ME EJECUTO 2 ')
      localStorage.setItem('user', JSON.stringify(user))
      let myUser = localStorage.getItem('user', JSON.stringify(user));
      console.log(myUser, "ayudame pls")

  }, [user])


  return (

    <AppContext.Provider value={{ 
        user,
        setUser
      }}>
      {children}
    </AppContext.Provider>
  );
  
}


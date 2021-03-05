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


  const [user, setUser ] = useState()

  useEffect(() => {
   if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
    }else{
      setUser({
    isAdmin: false,
    cedula: "",
    id: "",
    casaID: "",
    condoID: "",
    isLogged: false
    })
    }
}, [])

  useEffect(() => {
    if(user){
      localStorage.setItem('user', JSON.stringify(user))
      let myUser = localStorage.getItem('user', JSON.stringify(user));
      console.log(myUser, "ayudame pls")
    }

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


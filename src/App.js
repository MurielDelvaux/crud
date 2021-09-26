import React from "react";
/* router */
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* componentes */
import { Login } from "./components/Login";
import { Clientes } from "./components/Clientes";

function App() {
  console.log("oi")
  console.log(localStorage.tabelaUsuario);
  if(localStorage.getItem("tabelaUsuario")){
    console.log('EXISTE=>' ,localStorage.tabelaUsuario)
  }else{
    console.log("não existe")
    const a = [{
      Id:'1',
      Nome: 'nome',
      Email: 'email',
      Senha: 'senha'  
    }]
    localStorage.tabelaUsuario = JSON.stringify(a)
  }
 
  
  return (
    <>
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Login}/>         
            <Route path="/clientes" component={Clientes}/>
            
              
            
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;

import TelaCadFuncionario from "./telas/CadFuncionario"
import TelaMenu from "./telas/TelaMenu"
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (    
      <div>
       <BrowserRouter>
          <Routes>
    
            <Route path="/cadastroFuncionario" element={<TelaCadFuncionario/>}/>
            <Route path="/" element={<TelaMenu/>}/>
           
          </Routes>
        </BrowserRouter>
      </div>    
    
  );
}
export default App


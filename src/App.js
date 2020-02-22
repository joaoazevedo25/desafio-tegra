import React, { useState, useEffect } from 'react';
import './App.css';
import Aeroporto from './Aeroporto';

function App() {
  const [aeroporto, setAeroporto] = useState([]);

  async function fetchAeroportos() {
    const response = await fetch(`https://api-voadora.dev.tegra.com.br/flight/companies`);
    const data = await response.json();
    
    const nomes = data.map((listaNomes) => (
      listaNomes.nome
    ))
      setAeroporto(nomes)
      console.log(data)
  }

  useEffect(() => {
    fetchAeroportos();
  }, [])

  return (
    <>
    <h1>Origem</h1>
    <Aeroporto aeroporto={aeroporto}/>
    <h1>Destino</h1>
    <Aeroporto aeroporto={aeroporto}/>
    </>
  );
}

export default App;

/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import './App.css';
import Aeroporto from './Aeroporto';

function App() {
  const [aeroporto, setAeroporto] = useState([]);
  const [sigla, setSigla] = useState([]);
  const [date, setDate] = useState(new Date());
  const [origem, setOrigem] = useState();
  const [destino, setDestino] = useState();

  async function fetchAeroportos() {
    const response = await fetch(`https://api-voadora.dev.tegra.com.br/flight/companies`);
    const data = await response.json();

    const nomes = data.map((listaNomes) => (
      listaNomes.nome
    ))
    setAeroporto(nomes)

    const siglas = data.map((listaSiglas) => (
      listaSiglas.aeroporto
    ))
    setSigla(siglas)
  }

  useEffect(() => {
    fetchAeroportos();
  }, [])

  const calendar = date => {
    setDate(date);
  }
  
  console.log("origem: " + origem);
  console.log("destino: " + destino);
  console.log("data: " + date)
  
  function handleSubmit() {
    async function fetchPostAeroportos() {
      const response = await fetch(`https://api-voadora.dev.tegra.com.br/flight`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          from: {sigla}, // aeroporto de origem
          to: {sigla}, // aeroporto de destino
          date: '2019-02-10' // data de partida
        })
      });
      console.log(response.body);
    }
  }
  return (
    <>
      <h1>Origem</h1>
      <Aeroporto
        aeroporto={aeroporto}
        selectedAeroporto={origem}
        onChangeAeroporto={e => setOrigem(e.target.value)}
      />
      <h1>Destino</h1>
      <Aeroporto
        aeroporto={aeroporto}
        selectedAeroporto={destino}
        onChangeAeroporto={e => setDestino(e.target.value)}
      />
      <h1>Partida</h1>
      <DatePicker
        onChange={calendar}
        value={date}
        minDate={new Date('2/10/2020')}
        maxDate={new Date('2/18/2020')}
        onChangeDate={e => setDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Vai</button>
    </>
  );
}

export default App;

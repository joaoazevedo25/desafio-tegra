/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import './App.css';
import Aeroporto from './Aeroporto';

function App() {
  const [aeroporto, setAeroporto] = useState([]);
  const [opcoesVoo, setOpcoesVoo] = useState([]);
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


  function handleSubmit() {
    async function fetchPostAeroportos() {
      const response = await fetch(`https://api-voadora.dev.tegra.com.br/flight`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          from: 'BSB', // aeroporto de origem
          to: 'VCP', // aeroporto de destino
          date: '2019-02-10' // data de partida
        })
      });

      console.log(response.json())
    }

    fetchPostAeroportos();

  }
  console.log("origem: " + origem);
  console.log("destino: " + destino);
  console.log("data: " + date);

  return (
    <>
      <div className="faixa">
        <div className="display-screen">
          <div className="display-info">
            <h1 className="titulo">Origem</h1>
            <Aeroporto
              aeroporto={aeroporto}
              selectedAeroporto={origem}
              onChangeAeroporto={e => setOrigem(e.target.value)}
            />
          </div>

          <div className="display-info">
            <h1 className="titulo">Destino</h1>
            <Aeroporto
              aeroporto={aeroporto}
              selectedAeroporto={destino}
              onChangeAeroporto={e => setDestino(e.target.value)}
            />
          </div>

          <div className="display-info">
            <h1 className="titulo">Partida</h1>
            <div className="calendar">
              <DatePicker
                onChange={calendar}
                value={date}
                minDate={new Date('2/10/2020')}
                maxDate={new Date('2/18/2020')}
                onChangeDate={e => setDate(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleSubmit}>Procurar</button>
        </div>
      </div>
    </>
  );
}

export default App;

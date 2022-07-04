import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import CollectionsJoin from './dataHandling/collectionsJoin';
import { myIconOperando, myIconParado, myIconManutencao } from './icon';

const App = () => {

  type statesModelTypes = {
    date: string,
    stateName: string
  }

  const options = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' } as const;
  const [isShown, setIsShown] = useState(false);
  const [saveStates, setSaveStates] = useState<{ stateName: string; date: string }[]>([]);

  const Icon = (stateName: string) => {
    if (stateName === 'Operando') {
      return myIconOperando;
    }
    else if (stateName === 'Parado') {
      return myIconParado;
    }
    else {
      return myIconManutencao;
    }
  }

  const globalCollection = CollectionsJoin();

  let states: { stateName: string; date: string }[] = [];

  const log = async (equipId: string) => {
    
    setIsShown(current => !current);

    console.log(globalCollection);
    for (let i = 0; i < globalCollection.length; i++) {
      if (globalCollection[i].equipmentId === equipId) {
        for (let j = 0; j < globalCollection[i].equipmentStateHistory.length; j++) {
          let stateModel: statesModelTypes =  {
            "date": globalCollection[i].equipmentStateHistory[j].date,
            "stateName": globalCollection[i].equipmentStateHistory[j].stateName
          }
          
          states.push(stateModel);
          setSaveStates(states);
        }
      }
    }
    console.log(states);
  }

  const ShowStateHistory = () => {

    console.log(saveStates);

    return (
      <div className='stateHistory'>         
        <table>
          <thead>
            <tr>
              <th className='table-title' colSpan={2}>Histórico de Estados <button className='table-close' onClick={() => setIsShown(current => !current)}>X</button></th>
            </tr>
            <tr>
              <th>Data</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {saveStates.map(state => (
              <tr key={state.date}>
                <td>{new Date(state.date).toLocaleString('pt-BR', options)}</td>
                <td>{state.stateName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="App">
      <MapContainer center={[-19, -46]} zoom={8} scrollWheelZoom={true}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {globalCollection.map(equip => (
          <Marker key={equip.equipmentId} position={[equip.lastPositionLat, equip.lastPositionLon]} icon={Icon(equip.lastStateName)}>
            <Popup>
              <p>{equip.equipmentName}</p>
              <p>{equip.lastStateDate.toLocaleString('pt-BR', options)}</p>
              <p>{equip.lastStateName}</p>
              <button onClick={() => {log(equip.equipmentId)}}>Histórico de Estados</button>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      {isShown && <ShowStateHistory/>}

    </div>
  );
}

export default App;

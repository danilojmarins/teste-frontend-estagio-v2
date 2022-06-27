import React from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';
import equipmentPosition from './data/equipmentPositionHistory.json';
import CollectionsJoin from './collectionsJoin';

function App() {

  let positionDateArrMS = [];
  let positionDateArrYMD = [];

  const lastPositionArr = [];

  const options = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' } as const;

  for (let i = 0; i < equipmentPosition.length; i++) {

    for (let j = 0; j < equipmentPosition[i].positions.length; j++) {

      positionDateArrMS.push(new Date(equipmentPosition[i].positions[j].date).getTime());
      positionDateArrYMD.push(new Date(equipmentPosition[i].positions[j].date));

    }

    const lastDateMS = positionDateArrMS.sort();
    console.log(lastDateMS[lastDateMS.length - 1]);

    for (let k = 0; k < positionDateArrYMD.length; k++) {
      if (lastDateMS[lastDateMS.length - 1] === positionDateArrYMD[k].getTime()) {
        console.log(positionDateArrYMD[k]);
        let lastPosition = {
          "equipmentId": equipmentPosition[i].equipmentId,
          "date": positionDateArrYMD[k],
          "lat": equipmentPosition[i].positions[k].lat,
          "lon": equipmentPosition[i].positions[k].lon
        }
        lastPositionArr.push(lastPosition);
      }
    }

    positionDateArrMS = [];
    positionDateArrYMD = [];

  }

  console.log(lastPositionArr);

  CollectionsJoin();

  return (
    <div className="App">
      <MapContainer center={[-19, -46]} zoom={8} scrollWheelZoom={true}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {lastPositionArr.map(equip => (
          <Marker key={equip.equipmentId} position={[equip.lat, equip.lon]}>
            <Popup>
              <p>{equip.equipmentId}</p>
              <p>{equip.date.toLocaleString('pt-BR', options)}</p>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default App;

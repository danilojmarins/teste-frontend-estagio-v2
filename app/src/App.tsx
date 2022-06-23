import React from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';
import equipmentPosition from './data/equipmentPositionHistory.json';

function App() {

  let positionDateArrMS = [];
  let positionDateArrYMD = [];

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
        console.log(lastPosition);
      }
    }


    positionDateArrMS = [];
    positionDateArrYMD = [];

  }


  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      

        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}

export default App;

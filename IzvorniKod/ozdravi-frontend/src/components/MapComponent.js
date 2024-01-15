import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Icon} from "leaflet";
import 'leaflet/dist/leaflet.css';
import findAddress from "../assets/scripts/AddressFinder";

/*
props:
address - typical address as used on the rest of the frontend
    no latitude or longitude needed
example:
{
  street: "Rakarska ulica",
  number: "19",
  city: "Velika Gorica",
  country: "Croatia"
}
 */

const centreIcon = new Icon({
    iconUrl: require("..//assets//icons//hospital.png"),
    iconSize: [38, 38]
});

const defaultAddress = {

}

const MapComponent = ({address}) => {
    const [mapCenter, setMapCenter] = useState(null);
    const [mapMarker, setMapMarker] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [locationFound, setLocationFound] = useState(false);
    const zoom = 13;
    console.log(address);

    useEffect(() => {
        findAddress(address)
            .then(newAddress => {
                const newCenter = {lat: newAddress.latitude, lon: newAddress.longitude};
                const newPopupInfo = {
                    street: address.street,
                    number: address.number,
                    city: address.city,
                    country: address.country
                }

                setMapCenter(newCenter);
                setMapMarker({geocode: newCenter, popupInfo: newPopupInfo});
                setLocationFound(true);
                setIsLoaded(true);
                console.log("Map should load");
            })
            .catch(error => {
                setIsLoaded(true);
                console.log(error);
            })
    }, []);

    return (
        !isLoaded ? (
            <div>Loading...</div>
        ) : !locationFound ? (
            <div>Map couldn't be rendered.</div>
        ) : (<div className="map-container-div" style={{width:'100%', height:'100%', margin:0}}>
            <MapContainer
                center={[mapCenter.lat, mapCenter.lon]} zoom={zoom}

                /*    bitno je da ima velicinu postavljenu*/
                style={{width:'100%', height:'100%'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    style={{}}
                />
                <Marker key={mapMarker.popUpInfo}
                        position={mapCenter} icon={centreIcon}>
                    <Popup style={{textAlign:"center"}}>
                        <p>{address.street} {address.number}</p>
                        <p>{address.city}</p>
                        <p>{address.country}</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>)
    );
};

export default MapComponent;
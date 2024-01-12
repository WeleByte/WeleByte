import React, {useEffect, useRef} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Icon} from "leaflet";
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";

/*
props:
center - map initialization center [lat:float, long:float] -> 2 coordinates, latitude and longitude
zoom - map zoom level at initialization, 13 usually pretty good
markers - list of markers to set
setAddressHook - hook that sends the address back to the parent element once chosen
 */
const defaultProps = {
    center : {lat : 45.80085099788598, long : 15.971221512932303},
    zoom : 13,
    setAddressHook : (marker)=> {console.log("setAddressHook not defined in params")}
}

const defaultMarkers = [
    {
        geocode: {lat: 45.82507298322245, long: 16.00583026714763},
        popUpText: "KBC Rebro"
    },
    {
        geocode: {lat: 45.8345280695239, long: 16.03588548620672},
        popUpText: "KB Dubrava"
    },
    {
        geocode: {lat: 45.81589350307649, long: 15.953001388850481},
        popUpText: "KBC Sestre milosrdnice"
    }
]

const centreIcon = new Icon({
    iconUrl: require("..//assets//icons//hospital.png"),
    iconSize: [38, 38]
})

const apiKey = "050a247e7c324bc38289728703439070";

const MapComponent = ({
                          center = defaultProps.center,
                          zoom = defaultProps.zoom,
                          markers = defaultMarkers,
                          setAddressHook = defaultProps.setAddressHook
                      }) => {



    const [activeMarker, setActiveMarker] = React.useState();

    const handleMarkerMouseOver = (marker) => {
        setActiveMarker(marker);
    };

    const handleMarkerMouseOut = () => {
        setActiveMarker(null);
    };

    const handleClick = (marker) => {
        setAddressHook(marker);
    }

    return (
        <div className="map-container-div" style={{width:'100%', height:'100%', margin:0}}>
            <MapContainer
                center={[center.lat, center.long]} zoom={zoom}

                /*    bitno je da ima velicinu postavljenu*/
                style={{width:'100%', height:'100%'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    style={{}}
                />

                {markers.map(marker => (
                    <Marker key={marker.popUpText}
                            position={[marker.geocode.lat, marker.geocode.long]} icon={centreIcon}
                            onClick={(marker) => handleClick(marker.popUpText)}
                            // onMouseOver = {() => handleMarkerMouseOver(marker)}
                            // onMouseOut = {() => handleMarkerMouseOut()}
                    >
                        {/*{activeMarker === marker && (*/}
                            <Popup>
                                <label>{marker.popUpText}</label>
                            </Popup>
                        {/*)}*/}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
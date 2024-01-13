import * as L from "leaflet"
import {map} from "leaflet";

// addressObject is as defined in WeleByte REST API
// example:
//     street: "Rakarska ulica",
//     number: "19",
//     state: "Zagrebacka",
//     post_num: "10410",
//     city: "Velika Gorica",
//     country: "Croatia"
//      NOTE: this method doesn't expect the latitude and longitude to be anything but null, as it is finding them
//      NOTE: state and post_num can be null
const findAddress = async (addressObject) => {

    let url = addressToUrl(addressObject);

    console.log(url);

    const data = await getData(url);
    console.log(data);
    if(!(data && data.length > 0)) throw new Error("No results for this input");

    addressObject.latitude = data[0].lat;
    addressObject.longitude = data[0].lon;

    return addressObject;
}

function getData(url) {

    return fetch(url, {
        method: "GET"
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else throw new Error("Geo fetch response NOT OK")
        })
}

function addressToUrl(addressObject){
    let postalString = addressObject.post_num ? `&postalcode=${encodeURIComponent(addressObject.post_num)}` : "";
    let stateString = addressObject.state ? `&state=${encodeURIComponent(addressObject.state)}` : "";

    let url = "https://nominatim.openstreetmap.org/search?" +
    "street="+ encodeURIComponent(addressObject.street)+"%20"+encodeURIComponent(addressObject.number)+
    "&city="+encodeURIComponent(addressObject.city)+stateString+
    "&country="+encodeURIComponent(addressObject.country)+postalString+
    "&format=json";

    url = url.toString().replace(" ", "");
    return url;
}

export default findAddress;
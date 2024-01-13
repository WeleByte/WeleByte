import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO obrisati
import findAddress from "./assets/scripts/AddressFinder";
let address = {
    street: "Ulica Nikole Šopa",
    number: "10",
    // state: "Grad Zagreb",
    // post_num: "10360",
    city: "Zadar",
    country: "Croatia"
}
let add = await findAddress(address);
console.log(add);
console.log(`${add.latitude},${add.longitude}`)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App wordIn="ispisi me"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

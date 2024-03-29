import React, { useState, useEffect } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'
import MapComponent from "./MapComponent";
import 'leaflet/dist/leaflet.css';



const NoviPregled = (props) => {

    const [patients, setPatients] = useState([])
    const [allDoctors, setAllDoctors] = useState([])
    const [pediatricians, setPediatricians] = useState([])
    const [doctors, setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [report, setReport] = useState(null)
    const [date, setDate] = useState(null)
    const [country, setCountry] = useState('Hrvatska')
    const [city, setCity] = useState(null)
    const [street, setStreet] = useState(null)
    const [number, setNumber] = useState(null)
    const [allDoctorsFormatted, setAllDoctorsFormatted] = useState([])
    const [patientsFormatted, setPatientsFormatted] = useState([])
    const [isDoctor, setIsDoctor] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    // useEffect(() => {
    //     props.user.roles.forEach(role => {
    //         if(role.name === 'doctor')
    //             setIsDoctor(true)
    //     })
    //     if(isDoctor){
    //         setSelectedDoctor(props.user.id)
    //     }
    //     console.log(isDoctor)
    // }, []);

    const closeModal = () => {
        props.closeNoviPregled()
    }

    // const originalUsers = [
    //   {
    //     ime: 'Filip',
    //     prezime: 'Filipović',
    //     lastVisit: '12.1.2023.',
    //     visitCount: 5,
    //     email: 'filip.filipovic@gmail.com',
    //     age: 12,
    //     id: 1,
    //   },
    //   {
    //     ime: 'Ivan', prezime: 'Ivanovic', lastVisit: '25.6.2023.',
    //     visitCount: 2, email: 'ivan.ivanovic@gmail.com', age: 69
    // }, {
    //     ime: 'Milica', prezime: 'Srbić', lastVisit: '12.1.2023.',
    //     visitCount: 7, email: 'milica.srbic@gmail.com', age: 23
    // }, {
    //     ime: 'Joža', prezime: 'Mužić', lastVisit: '69.420.1337.',
    //     visitCount: 89, email: 'jozica.muzic@gmail.com', age: 8
    // }, {
    //     ime: 'Đurđa', prezime: 'Đurđić', lastVisit: '24.2.1923.',
    //     visitCount: 257, email: 'jozica.muzic@gmail.com', age: 96
    // }
    //   // ... rest of your original array
    // ];
    //
    // const doktori = [
    //   { value: '1', label: 'Chocolate' },
    //   { value: '2', label: 'Marta Martovič' },
    //   { value: '3', label: 'Vanilla' }
    // ]
    //
    // const pacijenti = [
    //   { value: '1', label: 'Chocolate' },
    //   { value: '2', label: 'Marta Martovič' },
    //   { value: '3', label: 'Vanilla' }
    // ]

    useEffect(() => {
        Promise.all([
            fetch(props.backendRoute + '/users/pediatricians', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                }
            }),
            fetch(props.backendRoute + '/users/doctors', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                }
            }),
            fetch(props.backendRoute + '/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                }
            })
        ])
            .then(([pediatriciansPromise, doctorsPromise, patientsPromise]) => {

                if (pediatriciansPromise.status === 401 || doctorsPromise.status === 401 || patientsPromise.status === 401) {
                    /* props.handleLogOut() */
                    console.log("unauthorized!!")

                } else
                if (!pediatriciansPromise.ok || !doctorsPromise.ok || !patientsPromise.ok) {
                    console.log('Error: ', pediatriciansPromise, doctorsPromise)

                } else {
                    console.log(pediatriciansPromise, doctorsPromise, patientsPromise)
                    return Promise.all([pediatriciansPromise.json(), doctorsPromise.json(), patientsPromise.json()])
                }
            }).then(([parsedPediatricians, parsedDoctors, parsedPatients]) =>{

            console.log(parsedPediatricians, parsedDoctors, parsedPatients);
            setPediatricians([parsedPediatricians]);
            setDoctors([parsedDoctors]);
            setPatients([parsedPatients])
            setAllDoctors([...parsedPediatricians, ...parsedDoctors]);

            const allDoctorsTemp= [...parsedPediatricians, ...parsedDoctors]

            setAllDoctorsFormatted(allDoctorsTemp.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            })))

            setPatientsFormatted(parsedPatients.map(patient => ({
                label: `${patient.first_name} ${patient.last_name} (${patient.oib})`,
                value: patient.id
            })))

            console.log(allDoctorsFormatted, patientsFormatted);

            console.log(allDoctorsFormatted, patientsFormatted)
        })
            .catch(error => {
                console.error(error)
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Selected Doctor:", selectedDoctor);
        console.log("Selected Patient:", selectedPatient);
        console.log("Date:", date);
        console.log("Report:", report);
        console.log("Location: ", country, city, street, number)

        if (selectedDoctor && selectedPatient && report && date) {
            console.log("Date:", date);

            fetch(props.backendRoute + "/examinations", {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${props.bearerToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    'doctor_id': selectedDoctor.value,
                    'patient_id': selectedPatient.value,
                    'scheduler_id': props.user.id,
                    'address' : {
                        'country' : country,
                        'city' : city,
                        'street' : street,
                        'number' : number,
                        'latitude' : null,
                        'longitude' : null
                    },
                    'date': date,
                    'report': report
                })
            })
                .then(response => {
                    props.refreshExaminations()
                    console.log(response);
                    closeModal()
                })
            closeModal()
        } else {
            console.log('Some field is empty', selectedDoctor, selectedPatient, report, date);
            setErrorMessage("Uneseni podatci nisu ispravni.")
        }

    }

    return (
        <div id = "addPatientsWrapper" className = "shadow-lg">


            <div id = "addPatientsInner">


                <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj pregled {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>


                <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>








                <div className='px-4 pt-0'>
                    <form >

                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} className ="mt-4">



                            <div className="mb-3">
                                <Select options={allDoctorsFormatted} placeholder = "Odaberite doktora..."
                                        onChange={selectedOption =>
                                            setSelectedDoctor(selectedOption)}/>
                            </div>



                            <div className="mb-4">

                                <Select options={patientsFormatted} placeholder = "Odaberite pacijenta..."
                                        onChange={selectedOption =>
                                            setSelectedPatient(selectedOption)}/>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="examination-date" className="form-label" style={{float: 'left'}}>DATUM</label>
                                <input type="datetime-local" className="form-control" id="date"
                                       onChange={selectedDate => setDate(selectedDate.target.value)}/>
                            </div>

                            <div></div>

                            <div className="mb-3">
                                <label htmlFor="examination-country" className="form-label" style={{float: 'left'}}>DRZAVA</label>
                                <input type="text" className="form-control" id="location" value={country}
                                       onChange={e => setCountry(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="examination-city" className="form-label" style={{float: 'left'}}>GRAD</label>
                                <input type="text" className="form-control" id="location"
                                       onChange={e => setCity(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="examination-address" className="form-label" style={{float: 'left'}}>ADRESA</label>
                                <input type="text" className="form-control" id="location"
                                       onChange={e => setStreet(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="examination-number" className="form-label" style={{float: 'left'}}>BROJ</label>
                                <input type="text" className="form-control" id="location"
                                       onChange={e => setNumber(e.target.value)}/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label" style={{float: 'left'}}>OPIS PREGLEDA</label>
                            <textarea rows = "7" type="text" className="form-control" id="examination-description"
                                      onChange={(event) => setReport(event.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}}
                                onClick={handleSubmit}>Dodaj</button>
                    </form>
                    {errorMessage ?
                        <p style={{color: 'red'}}>{errorMessage}</p>
                        : null}
                </div>
            </div>
        </div>

    );
};

export default NoviPregled;

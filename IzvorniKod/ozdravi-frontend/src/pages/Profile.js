import React, {useEffect} from 'react';
import loginVector from '../assets/images/loginVector.png';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Navbar from '../components/Header';
import Select from "react-select";

const ProfilePage = (props) => {
    const backendRoute = props.backendRoute
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [OIB, setOIB] = useState(user.oib)
    const [institutionEmail, setInstitutionEmail] = useState(user.institution_email)
    const [incorrectName, setIncorrectName] = useState(false)
    const [incorrectOIB, setIncorrectOIB] = useState(false)
    const [incorrectEmailFormat, setIncorrectEmailFormat] = useState(false)
    const [saveFailed, setSaveFailed] = useState(false)
    const bearerToken = sessionStorage.bearerToken
    const [errorMessage, setErrorMessage] = useState('')
    const currentRole = sessionStorage.getItem('currentRole');

    useEffect(() => {
        if (bearerToken === '' || bearerToken === null || bearerToken === undefined) {
            navigate('/login')
        } else {
            const fetchedUser = (JSON.parse(sessionStorage.userData))
            setUser(fetchedUser)
            setFirstName(fetchedUser.first_name)
            setLastName(fetchedUser.last_name)
            setOIB(fetchedUser.oib)
            setInstitutionEmail(fetchedUser.institution_email)
        }
    }, []);
    const handleSignOut = () => {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

    const handleMailInput = (value) => {
        setInstitutionEmail(value);
    }

    const handleSave = async (e) => {
        e.preventDefault();

        if (!(institutionEmail === '' || institutionEmail === undefined || institutionEmail === null)
            && !(/\S+@\S+\.\S+/.test(institutionEmail))) {
            setIncorrectEmailFormat(true)
            return
        }
        setIncorrectEmailFormat(false)

        //if format is correct, check which fields are empty
        // If login is successful, navigate to the home page

        const response = await fetch(backendRoute + `/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userDTO': {
                    'institution_email': institutionEmail
                }
            })
        })

        if (!response.ok) {
            setSaveFailed(true)
            setErrorMessage("Dogodila se pogreska")
        } else {
            setSaveFailed(false)
            user.institution_email = institutionEmail
            sessionStorage.setItem('userData', JSON.stringify(user))

            navigate('/home');
        }
    };

    if (!bearerToken) {
        return null
    }
    return (
        <div id="HomePageWrapper">
            <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>
            <div className="row" id="loginRow" style={{paddingTop: "50px"}}>

                <div className="col-12 mx-auto ">
                    <h2 className="text-start">Vaš profil</h2>
                    <form onSubmit={handleSave} className="pt-3">
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}}>

                            {/*----------------------------FIRST NAME-----------------------------*/}
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label" style={{float: 'left'}}>IME</label>
                                <input type="text" className="form-control"
                                       id="first_name" value={user.first_name}
                                       disabled={true}
                                       onChange={(e) =>
                                           setFirstName(e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}/>
                            </div>

                            {/*----------------------------LAST NAME-----------------------------*/}
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label" style={{float: 'left'}}>PREZIME</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="last_name" value={user.last_name}
                                       onChange={(e) =>
                                           setLastName(e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}/>
                            </div>

                            {/*-------------------------------OIB--------------------------------*/}
                            <div className="mb-3">
                                <label htmlFor="oib" className="form-label" style={{float: 'left'}}>OIB</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="oib" value={user.oib}
                                       onChange={(e) =>
                                           setOIB(e.target.value.replace(/\D/g, ''))}/>
                            </div>

                            {/*------------------------ EMAIL-------------------------*/}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" style={{float: 'left'}}>E-MAIL</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="email" value={user.email}/>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="address_street" className="form-label" style={{float: 'left'}}>ULICA</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="address_street" value={user.address?.street}/>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="address_number" className="form-label" style={{float: 'left'}}>KUĆNI
                                    BROJ</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="address_number" value={user.address?.number}/>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="address_city" className="form-label" style={{float: 'left'}}>GRAD</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="address_city" value={user.address?.city}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address_country" className="form-label" style={{float: 'left'}}>DRŽAVA</label>
                                <input type="text" className="form-control"
                                       disabled={true}
                                       id="address_country" value={user.address?.country}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="institution_email" className="form-label" style={{float: 'left'}}>E-MAIL POSLODAVCA</label>
                                <input type="text" className="form-control"
                                       id="institution_email" value={institutionEmail}
                                       onChange={(e) => handleMailInput(e.target.value)}/>
                            </div>
                        </div>

                        {/*------------------------INSTITUTION EMAIL-------------------------*/}

                        <button type="submit" className="btn btn-primary col-12 py-2 mt-3">Spremi promjene</button>
                        <button type="submit" style={{fontWeight: "bold"}} className="btn  btn-danger mt-2 col-12 py-2"
                                onClick={(e) => handleSignOut()}>Odjavi se
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

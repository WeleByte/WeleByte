import React from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Header';

const ProfilePage = (props) => {

  const backendRoute = props.backendRoute
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.userData)
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

  const handleSignOut = () => {
    sessionStorage.clear()
    localStorage.clear()
    navigate('/signup')
}

  const handleSave = async (e) => {
    e.preventDefault();
    //check login format
    if((firstName !== '' || lastName !== '') && (firstName.length < 2 || lastName.length < 2)){
      setIncorrectName(true)
      return
    }
    setIncorrectName(false)

    if(OIB !== '' && OIB.length !== 11) {
      setIncorrectOIB(true)
      return
    }
    setIncorrectOIB(false)

    if(institutionEmail !== '' && !(/\S+@\S+\.\S+/.test(institutionEmail))) {
      setIncorrectEmailFormat(true)
      return
    }
    setIncorrectEmailFormat(false)

    //if format is correct, check which fields are empty
    if(firstName === '') setFirstName(user.first_name)
    if(lastName === '') setLastName(user.last_name)
    if(OIB === '') setOIB(user.oib)
    if(institutionEmail === '') setInstitutionEmail(user.institution_email)

    //data verification
    const response = await fetch(backendRoute + `/user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        'email': user.email,
        'password': user.password,
        'institution_email': institutionEmail,
        'oib': OIB,
        'first_name': firstName,
        'last_name': lastName
      })
    })

    // If login is successful, navigate to the home page
    // if(response.status) // TODO implementirati logout ako je sesija istekla
    if(response.status === 400){
      setErrorMessage("OIB je neispravan")
      setSaveFailed(true)
    }
    else if(!response.ok) {
      setSaveFailed(true)
      setErrorMessage("Dogodila se pogreska")
    } else {
      setSaveFailed(false)
      user.first_name = firstName
      user.last_name = lastName
      user.oib = OIB
      user.institution_email = institutionEmail
      sessionStorage.setItem('userData', JSON.stringify(user))

      navigate('/home');
    }
  };

  const navigateLogIn = () => {
    navigate('/login');
  };

  return (

  
    <div id = "HomePageWrapper">
     
        <Navbar></Navbar>
        <div className="row" id = "loginRow"  style={{paddingTop: "50px"}}>

          <div className="col-12 mx-auto " >
            <h2 className = "text-start">Vaš profil</h2>
            <p className = "text-start">
            {
              incorrectName ? ("Ime i prezime ") :
                  incorrectOIB ? ("OIB je neispravan") :
                      incorrectEmailFormat ? ("Email institucije nije ispravan") :
                          saveFailed ? (errorMessage) : "Promijenite svoje podatke"
            } </p>
            <form onSubmit={handleSave} className ="pt-3">

              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}}>

              {/*----------------------------FIRST NAME-----------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>IME</label>
                <input type="text" className="form-control"
                       id="username" value={firstName}
                       onChange={(e) =>
                           setFirstName(e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}/>
              </div>

              {/*----------------------------LAST NAME-----------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>PREZIME</label>
                <input type="text" className="form-control"
                       id="username" value={lastName}
                       onChange={(e) =>
                           setLastName(e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}/>
              </div>

              {/*-------------------------------OIB--------------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>OIB</label>
                <input type="text" className="form-control"
                       id="username" value={OIB}
                       onChange={(e) =>
                           setOIB(e.target.value.replace(/\D/g, ''))}/>
              </div>

              {/*------------------------INSTITUTION EMAIL-------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{float: 'left'}}>E-MAIL INSTITUCIJE</label>
                <input type="text" className="form-control"
                       id="username" value={institutionEmail}
                       onChange={(e) => setInstitutionEmail(e.target.value)}/>
              </div>
             
            
              </div>
              <button type="submit" className="btn btn-primary col-12 py-2 mt-3">Spremi promjene</button>
              <button type="submit" style={{fontWeight: "bold"}} className="btn  btn-danger mt-2 col-12 py-2"
                      onClick={(e) => handleSignOut()}>Odjavi se</button>

            </form>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;

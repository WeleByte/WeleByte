import React from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Header';

const ProfilePage = () => {

  const backendRoute = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [OIB, setOIB] = useState('')
  const [institutionEmail, setInstitutionEmail] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [incorrectEmailFormat, setIncorrectEmailFormat] = useState(false)
  const [incorrectPasswordLength, setIncorrectPasswordLength] = useState(false)
  const [incorrectName, setIncorrectName] = useState(false)
  const [incorrectOIB, setIncorrectOIB] = useState(false)
  const [signUpFailed, setSignUpFailed] = useState(false)
  const [incorrectPasswordCheck, setIncorrectPasswordCheck] = useState(false)
  const handleSignUp = async (e) => {
    e.preventDefault();
    //check login format
    if(firstName === '' || lastName === ''){
      setIncorrectName(true)
      return
    }
    setIncorrectName(false)

    if(OIB.length !== 11) {
      setIncorrectOIB(true)
      return
    }
    setIncorrectOIB(false)

    if(!(/\S+@\S+\.\S+/.test(email)) || !(/\S+@\S+\.\S+/.test(institutionEmail))) {
      setIncorrectEmailFormat(true)
      return
    }
    setIncorrectEmailFormat(false)

    if(password.length < 6) {
      setIncorrectPasswordLength(true)
      return
    }
    setIncorrectPasswordLength(false)

    if(password !== passwordCheck){
      setIncorrectPasswordCheck(true)
      return
    }
    setIncorrectPasswordCheck(false)
    //data verification
    const response = await fetch(backendRoute + "/user/edit", {
      method: 'POST',
      headers: {
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify({
        'username' : email,
        'password' : password,
        'oib': OIB,
        'institution_email': institutionEmail,
        "first_name": firstName,
        'last_name': lastName,
      })

    })


    // If login is successful, navigate to the home page
    if(!response.ok) {
      setSignUpFailed(true)
    } else {
      setSignUpFailed(false)
      navigate('/login');
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
            <h2 class = "text-start">Vaš profil</h2>
            <p class = "text-start">
            {
              incorrectName ? ("Ime i prezime je obavezno") :
                  incorrectOIB ? ("OIB je neispravan") :
                      incorrectEmailFormat ? ("E-mail je neispravan") :
                          incorrectPasswordLength ? ("Šifra mora biti dulja od 6 znakova") :
                              incorrectPasswordCheck ? ("Šifre se ne poklapaju") :
                                  signUpFailed ? ("Email je zauzet") : "Promijenite svoje podatke"
            } </p>
            <form onSubmit={handleSignUp} class ="pt-3">

              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}}>

              {/*----------------------------FIRST NAME-----------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>IME</label>
                <input type="text" className="form-control" id="username" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}/>
              </div>

              {/*----------------------------LAST NAME-----------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>PREZIME</label>
                <input type="text" className="form-control" id="username" value={lastName}
                       onChange={(e) => setLastName(e.target.value)}/>
              </div>

              {/*-------------------------------OIB--------------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>OIB</label>
                <input type="text" className="form-control" id="username" value={OIB}
                       onChange={(e) => setOIB(e.target.value)}/>
              </div>

              {/*------------------------INSTITUTION EMAIL-------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{float: 'left'}}>E-MAIL INSTITUCIJE</label>
                <input type="text" className="form-control" id="username" value={institutionEmail}
                       onChange={(e) => setInstitutionEmail(e.target.value)}/>
              </div>
             
            
              </div>
              <button type="submit" className="btn btn-primary col-12 py-2 mt-3">Spremi promjene</button>
              <button type="submit" style={{fontWeight: "bold"}} className="btn  btn-danger mt-2 col-12 py-2">Odjavi se</button>

            </form>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;

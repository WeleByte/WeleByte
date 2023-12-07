import React from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const SignUpPage = () => {

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
    const response = await fetch(backendRoute + "/register", {
      method: 'POST',
      headers: {
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify({
        'username' : email,
        'password' : password
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

      <div className="container  col-12" id = "loginContainer">
        <img src={loginVector} id ="loginVectorMobile" alt = "" ></img>

        <div className="row" id = "loginRow">

          <div className="col-12 mx-auto " >
            <h2>Registracija za Ozdravi Me</h2>
            {
              incorrectName ? (<p>Ime i prezime je obavezno</p>) :
                  incorrectOIB ? (<p>OIB je neispravan</p>) :
                      incorrectEmailFormat ? (<p>E-mail je neispravan</p>) :
                          incorrectPasswordLength ? (<p>Šifra mora biti dulja od 6 znakova</p>) :
                              incorrectPasswordCheck ? (<p>Šifre se ne poklapaju</p>) :
                                  signUpFailed ? (<p>Email je zauzet</p>) : <p>Unesite svoje podatke</p>
            }
            <form onSubmit={handleSignUp}>
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

              {/*------------------------------EMAIL-------------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{float: 'left'}}>E-MAIL</label>
                <input type="text" className="form-control" id="username" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
              </div>

              {/*----------------------------PASSWORD------------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{float: 'left'}}>ŠIFRA</label>
                <input type="password" className="form-control" id="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
              </div>

              {/*-------------------------PASSWORD CHECK---------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{float: 'left'}}>POTVRDITE ŠIFRU</label>
                <input type="password" className="form-control" id="password" value={passwordCheck}
                       onChange={(e) => setPasswordCheck(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-primary col-12 py-2">Registriraj se </button>
              <p className = "pt-3" style={{fontSize: "13px"}}>Već ste član? <span style={{textDecoration: "underline ", cursor: "pointer"}} onClick={navigateLogIn}>Prijava</span> </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SignUpPage;

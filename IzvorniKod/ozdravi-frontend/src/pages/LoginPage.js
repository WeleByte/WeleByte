import React, {useState} from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const backendRoute = "http://localhost:8080"
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch( backendRoute + "/login", {
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
                setLoginFailed(true)
            } else {
                setLoginFailed(false)
                const responseData = await response.json()
                console.log(responseData.accessToken, responseData.username)
                sessionStorage.setItem('bearerToken', responseData.accessToken)
                sessionStorage.setItem('email', responseData.username)
                navigate('/home');
            }


      };

    const navigateSignUp = () => {

        navigate('/signup');
      };

  return (
    
    <div className="container  col-12" id = "loginContainer">
    <img src={loginVector} id ="loginVectorMobile" className='mt-md-auto' alt = "" ></img>

      <div className="row" id = "loginRow">

        <div className="col-12 mb-auto" >
          <h2>Prijava u Ozdravi Me</h2>
          {loginFailed ? (<p>Greska u login podatcima, pokusajte ponovno</p>) : <p>Unesite svoje podatke</p>}
          <form onSubmit={handleLogin}> 
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{float: 'left'}}>EMAIL</label>
              <input type="text" className="form-control" id="username"
              value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{float: 'left'}}>ŠIFRA</label>
              <input type="password" className="form-control" id="password"
              value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary col-12 py-2">Prijavi se </button>
            <p className = "pt-3" style={{fontSize: "13px"}}>Niste član? <span style={{textDecoration: "underline ", cursor: "pointer"}} onClick={navigateSignUp}>Registracija</span> </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

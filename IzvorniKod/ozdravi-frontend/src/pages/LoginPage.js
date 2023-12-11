import React, {useState} from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const backendRoute = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)
    const [incorrectEmailFormat, setIncorrectEmailFormat] = useState(false)
    const [incorrectPasswordLength, setIncorrectPasswordLength] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        //check login format

        if(!(/\S+@\S+\.\S+/.test(email))) {
            setIncorrectEmailFormat(true)
            return
        }
        setIncorrectEmailFormat(false)

        if(password.length < 6) {
            setIncorrectPasswordLength(true)
            return
        }
        setIncorrectPasswordLength(false)

        //data verification
        const response = await fetch( backendRoute + "/login", {
            method: 'POST',
            headers: {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
                'email' : email,
                'password' : password
            })

        })

        // If login is successful, navigate to the home page
        if(!response.ok) {
            setLoginFailed(true)
        } else {
            setLoginFailed(false)
            const responseData = await response.json()
            console.log(responseData.accessToken, responseData.user)
            sessionStorage.setItem('bearerToken', responseData.accessToken)
            sessionStorage.setItem('userData', JSON.stringify(responseData.user))
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
                    {
                        incorrectEmailFormat ? (<p>E-mail mora biti upisan u ispravnom formatu</p>) :
                            incorrectPasswordLength ? (<p>Šifra mora biti dulja od 6 znakova</p>) :
                                loginFailed ? (<p>Netočno upisan e-mail ili šifra</p>) : <p>Unesite svoje podatke</p>
                    }
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

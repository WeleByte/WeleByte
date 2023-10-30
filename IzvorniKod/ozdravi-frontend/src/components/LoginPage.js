import React from 'react';
import loginVector from '../assets/images/loginVector.jpeg';

const LoginPage = () => {
  return (
    
    <div className="container  col-12" id = "loginContainer">
    <img src={loginVector} id ="loginVectorMobile" alt = "" ></img>
      <div className="row" id = "loginRow">
      
        <div className="col-md-4 offset-md-4" >
          <h2>Prijava u Ozdravi me</h2>
          <p>Unesite svoje podatke</p>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{float: 'left'}}>EMAIL</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{float: 'left'}}>ŠIFRA</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary col-12 py-2">Prijavi se </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';

const LoginPage = () => {
  return (
    <div className="container mt-5 col-12" id = "loginContainer">
      <div className="row">
        <div className="col-md-4 offset-md-4">
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

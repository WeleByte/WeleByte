import React from 'react';
import logoPng from '../../assets/images/logo.png';

const HomePage = () => {
  return (
      
    
    <div id = "HomePageWrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 py-3">
      <img src = {logoPng} id ="navbarLogo" alt = "" style={{height: "40px !important"}} className='ms-2'></img>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/home">Home </a>
          <a className="nav-item nav-link" href="/">Features</a>
          <a className="nav-item nav-link" href="/">Pricing</a>
        </div>
      </div>
    </nav>
    <h3 className='pt-4'>Welcome home</h3>
    </div>
  );
};

export default HomePage;

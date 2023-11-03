import React from 'react';
import logoPng from '../assets/images/logo.png';
import userIcon from '../assets/images/userIcon.png'


const Navbar = () => {

    const uloga = "doktor"

  return (
      

    
    <div id = "HomePageWrapper">
     
     <nav className="navbar  navbar-expand-lg navbar-light  px-3 py-3 py-lg-0  " >
      <img src = {logoPng} id ="navbarLogo" alt = "" style={{height: "40px !important"}} className='ms-2'></img>
      <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ">
          <a className="nav-item nav-link active" href="/home"> Početna </a>
          { uloga === "doktor" || uloga === "pedijatar" ? (  <a className="nav-item nav-link" href="/users">Pacijenti</a> ) : null }
          <a className="nav-item nav-link" href="/drugaMisljenja">Druga Misljenja</a>
          <a className="nav-item nav-link" href="/bolovanja">Bolovanja</a>
          { uloga === "roditelj" ? (  <a className="nav-item nav-link" href="/">Djeca</a> ) : null }
        </div>
      </div>


    
      <button className="btn btn-secondary me-2 ps-3" id="logOutBtn">

  Moj Profil
  <img src={userIcon} id="user-icon-navbar" alt="" width="19" className="ms-3 me-1 mb-0" style={{transform: "translateY(-2px)", display: "inline", opacity: "70%", verticalAlign: "middle" }} />
</button>



    </nav>
    </div>
  );
};

export default Navbar;

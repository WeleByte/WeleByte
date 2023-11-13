import React from 'react';
import logoPng from '../../assets/images/logo.png';


const Racuni = () => {
  return (
      
    
    
    <div id = "racuniWrapper">

        
<div>
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
    </div>
    
        <table className="table table-striped  table-bordered" id = "usersTable">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    </div>
  );
};

export default Racuni;

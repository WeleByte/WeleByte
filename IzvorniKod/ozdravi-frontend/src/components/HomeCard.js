import React from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'

const HomeCard = ({title, description, buttonText, image}) => {
  return (
      
    
    <div class="card px-0 me-2 ms-2 mt-3" style={{width: "100%",textAlign: "left", marginLeft: "0.7rem"}}>
    <img className='card-img-top' alt = "" src = {image} style={{height: "200px", objectFit: "cover"}}></img>
    <div class="card-body">
      <h5 class="card-title ">{title}</h5>
      <p class="card-text">{description}</p>
      

      <div class="container">
        <div class="row px-0">
          <div class="col ps-0 pe-1">
          <a href="/" className="btn btn-primary me-auto col-12"> {buttonText}
          
          <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
          </a>
          </div>
          {/* <div class="col pe-0 ps-1">
          <a href="/" style={{display: "flex", alignItems: "center;", justifyContent: "center"}} className="btn btn-secondary ms-auto col-12">
          <svg xmlns="http://www.w3.org/2000/svg" style = {{height: "14px", width: "14px",  verticalAlign: "middle"}} className = "mt-1 me-2" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
<path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
</svg> Add
          
            </a>
          </div> */}
        </div>
      </div>
      
    </div>
  </div>
  );
};

export default HomeCard;

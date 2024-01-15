import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const SickLeaveRecommendationDetail = (props) => {
  const role = props.role
  const backendRoute = props.backendRoute
  const bearerToken = props.bearerToken
  const [recommendation, setRecommendation] = useState(null)
  const [formattedDate, setFormattedDate] = useState(null)

  useEffect(() => {
    console.log(recommendation)
    console.log(props.recommendationId)
    fetch(backendRoute + `/sick_leave_recommendation/${props.recommendationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    })
        .then(response => {
          // if (response.status === 401) {
          //   props.handleLogOut()
          // } else
          if(!response.ok){
            console.log("Error:", response, response.status, response.statusText);
          } else {
            return response.json();
          }
        })
        .then(parsedData => {
          console.log(parsedData)
          setRecommendation(parsedData);

          const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          };

          const examinationDate = parsedData.examination.date

          if (Date.parse(examinationDate)) {
            const date = new Date(examinationDate);
            setFormattedDate(new Intl.DateTimeFormat('en-GB', options).format(date));
          } else {
            console.error('Invalid date format:', examinationDate);
          }
        })
    // .catch(error => {
    //     console.error('Fetch error:', error);
    // });
  }, []);
  const closeModal = () => {
    props.closeBolovanjeDetail()
  }

  const handleApproved = (e) => {
    e.preventDefault()
    handleStatusSubmit(true)
  }

  const handleRejected = (e) => {
    e.preventDefault()
    handleStatusSubmit(false)
  }

  const handleStatusSubmit = (status) => {
    fetch(props.backendRoute + `/sick_leave_recommendations/${recommendation.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization' : `Bearer ${bearerToken}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        status: status
      })
    })
        .then(response => {
            console.log(response)
            props.refreshRecommendations()
          closeModal()
        })
    props.closeBolovanjeDetail()
  }


    return (
        <div id="addPatientsWrapper" className="shadow-lg">



  return (
      <div id = "addPatientsWrapper" className = "shadow-lg">


        <div id = "addPatientsInner">


          <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Preporuku za bolovanje {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>


          <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>


                        {recommendation ? (
                            <>

                                <div className="mb-3">
                                    <label htmlFor="username" className=" col-12 text-label"
                                           style={{float: 'left', textAlign: "left"}}>Doktor </label>
                                    <p style={{textAlign: "left"}} className="text">Iva Mrkić</p>
                                </div>
                                <div className="mb-3 mt-4">
                                    <label htmlFor="username" className=" col-12 text-label"
                                           style={{float: 'left', textAlign: "left"}}>Roditelj </label>
                                    <p style={{textAlign: "left"}}
                                       className="text">{recommendation.parent.first_name + " " + recommendation.parent.last_name}</p>
                                </div>
                                <div className="mb-3 mt-4">
                                    <label htmlFor="username" className=" col-12 text-label"
                                           style={{float: 'left', textAlign: "left"}}>Status </label>
                                    <p style={{textAlign: "left"}}
                                       className="text mb-md-5 mb-4">{recommendation.status ? "Odobreno" : "Čeka odobrenje"}</p>
                                </div>


                                {role === "doctor" ? (
                                    <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-2 mb-md-4"
                                            style={{float: "right"}}>Odobri </button>
                                ) : null}

                                {role === "doctor" ? (
                                    <button type="submit"
                                            className="btn btn-danger col-12 col-md-2 py-2 mb-3 mb-md-4 mx-md-2"
                                            style={{float: "right"}}>Odbij </button>
                                ) : null}
                            </>
                        ) : (<p>Loading...</p>)}
                    </form>
                </div>
            </div>
        </div>



          {recommendation ? (
          <div className='px-4 pt-0'>
            <form >

              <div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">








                <div className="mb-3">
                  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pregled</label>
                  <p style={{textAlign:"left"}} className ="text">{formattedDate} - {recommendation.examination.report}</p>
                </div>
              </div>



                  <>
                    <div className="mb-3">
                      <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pedijatar </label>
                      <p style={{textAlign:"left"}} className ="text">{recommendation.creator.first_name + " " + recommendation.creator.last_name}</p>
                    </div>
                    <div className="mb-3 mt-4">
                      <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Roditelj </label>
                      <p style={{textAlign:"left"}} className ="text">{recommendation.parent.first_name + " " + recommendation.parent.last_name}</p>
                    </div>
                    <div className="mb-3 mt-4">
                      <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Status </label>
                      <p style={{textAlign:"left"}} className ="text mb-md-5 mb-4">{
                        recommendation.status !== null ? ( recommendation.status ? "Odobreno" : "Odbijeno") : "Čeka odobrenje"}</p>
                    </div>




                    { role === "doctor" && recommendation.status === null ? (
                        <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-2 mb-md-4" style={{float:"right"}}
                        onClick={handleApproved}>Odobri </button>
                    ): null}

                    { role === "doctor" && recommendation.status === null ? (
                        <button type="submit" className="btn btn-danger col-12 col-md-2 py-2 mb-3 mb-md-4 mx-md-2" style={{float:"right"}}
                        onClick={handleRejected}>Odbij </button>
                    ): null}
                  </>
            </form>
          </div>
          ) : ( <p>Loading...</p>)}
        </div>
      </div>

  );
};

export default SickLeaveRecommendationDetail;

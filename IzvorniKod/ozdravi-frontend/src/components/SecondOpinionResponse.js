import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const SecondOpinionResponse = (props) => {

    const [secondOpinion, setSecondOpinion] = useState(null)
    const closeModal = () => {
        props.closeSeccondOpinnionForm()
    }

    const role = sessionStorage.getItem('currentRole');

    useEffect(() => {
        if(props.currentOpinionId) {
            fetch(props.backendRoute + `/second_opinion/${props.currentOpinionId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // if (response.status === 401) {
                    //   props.handleLogOut()
                    // } else
                    if (!response.ok) {
                        console.log("Error:", response.status, response.statusText);
                    } else {
                        return response.json();
                    }
                })
                .then(parsedData => {
                    console.log("Parsed Data: ", parsedData)
                    setSecondOpinion(parsedData);
                    console.log(parsedData)
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(props.backendRoute + `/second_opinion/${secondOpinion.id}`, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${props.bearerToken}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                doctor_id: secondOpinion.doctor.id,
                requester_id: secondOpinion.requester.id,
                opinion: secondOpinion.opinion,
                content: secondOpinion.content
            })
        })
            .then(response => {
                // if(response.status === 401){
                //     props.handleLogOut()
                // } else
                if(!response.ok){
                    console.error("Error: ", response)
                } else {
                    props.refreshOpinions()
                    closeModal()
                }
            })
    }

    return (
        <div id = "addPatientsWrapper" className = "shadow-lg">


            <div id = "addPatientsInner">


                <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Drugo mišljenje {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>


                <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>



                {secondOpinion ? (
                    <div className='px-4 pt-0'>
                        <form >

                            <div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">






                                <div className="mb-4">

                                    <div className="mb-3">
                                        <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pacijent</label>
                                        <p style={{textAlign:"left"}} class ="text">{secondOpinion.requester.first_name + " " + secondOpinion.requester.last_name}</p>
                                    </div>
                                </div>


                            </div>

                            <div className="mb-3">
                                <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Sadržaj </label>
                                <p style={{textAlign:"left"}} class ="text mb-5">Na današnjem pregledu kod doktora, pacijent je opisao svoje simptome i medicinsku povijest. Doktor je pažljivo pregledao pacijenta, mjerio vitalne znakove i postavljao relevantna pitanja. Nakon toga, doktor je postavio preliminarnu dijagnozu i preporučio određene terapijske mjere. Pacijentu su dana dodatna uputstva i naloženo je da slijedi propisani tretman te da se pridržava zakazanih kontrolnih termina. Pregled je završen, a pacijent je napustio ordinaciju sa svim potrebnim informacijama i uputama.</p>
                            </div>


                            {role === "doctor" || role === "pediatrician" || role === "admin" ? (<div className="mb-3">
                                <label htmlFor="username" className="text-label" style={{float: 'left', fontWeight: "600"}}>Odgovor</label>
                                <textarea rows = "7" type="date" className="form-control" id="username" value={secondOpinion.content}
                                onChange={e =>
                                    setSecondOpinion(prev => ({...prev, content: e.target.value}))}/>
                            </div>): null}

                            {role === "parent" ? (<div className="mb-3">
                                <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Odgovor </label>
                                
                                {secondOpinion.content !== "" && secondOpinion.content !== null ? (
                                    <p style={{textAlign:"left"}} className ="text mb-5"> {secondOpinion.content} </p> )
                                    : <p style={{textAlign:"left"}} className ="text mb-5"> Nije odgovoreno </p>}

                            </div>): null}
                            
                            { role === "doctor" || role === "pediatrician" || role === "admin" ? (
                            <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}}
                            onClick={handleSubmit} >Spremi </button>
                            ): null}
                        </form>
                    </div>
                ) : (<p>Loading...</p>)
                }
            </div>
        </div>

    );
};

export default SecondOpinionResponse;

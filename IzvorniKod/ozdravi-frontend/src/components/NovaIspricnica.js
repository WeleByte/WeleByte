import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const NovaIspricnica = (props) => {


    return (
        <div id="addIspricnicaWrapper addIspricnica" className="shadow-lg">
            <div id="addPatientsInner">
                <h5 className="pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Stvori ispričnicu
                    <img style={{height: "23px", float: "right"}} onClick={props.closeIspricnica} src={CloseIcon}></img></h5>
                <hr className="mb-1 mt-4" style={{opacity: "20%"}}></hr>
                <div className='px-4 pt-0'>
                    <form>
                        <div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class="mt-4">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label" style={{float: 'left'}}>Opis
                                    ispricnice </label>
                                <textarea rows="7" type="date" className="form-control" id="username"
                                          placeholder={"Ukratko upišite razlog izostanka..."}/>
                            </div>
                        </div>

                        <button className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float: "right"}}
                                onClick={props.closeIspricnica}>Spremi
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default NovaIspricnica;

import React, {useEffect, useState} from 'react';
import Navbar from '../components/Header';
import patientsImage from '../assets/images/patientsNo2.png'
import drugoMisljenje from '../assets/images/drugoMisljenje.png'
import bolovanje from '../assets/images/bolovanje.png'
import djeca from '../assets/images/kids2.png'
import HomeCard from '../components/HomeCard';
import {useNavigate} from "react-router-dom";

const HomePage = (props) => {

    const currentRole = sessionStorage.getItem('currentRole');
    const navigate = useNavigate()
    const bearerToken = sessionStorage.getItem('bearerToken');
    const backendRoute = props.backendRoute
    var [roles, setRoles] = useState([""]);

    // if(sessionStorage.userData === undefined) {
    //     sessionStorage.userData = JSON.stringify({first_name: 'a'})
    // }

    const [user, setUser] = useState('')

    useEffect(() => {
        if(bearerToken === '' || bearerToken === null || bearerToken === undefined) {
            navigate('/login')
        }else{
            setUser(JSON.parse(sessionStorage.userData))
            const logUser = JSON.parse(sessionStorage.userData)
            console.log(logUser)
            setRoles(logUser.roles.map(obj => obj.name))
            console.log(roles)

        }
    }, []);

    const navigateUsers = () => {
        // e.preventDefault()
       
        
        // selectedItem = item
        
           navigate('/users')
             
           
    }
  

    function click() {
        console.log("clicked")
    }

    if(!bearerToken){
        return null
    }
    return (
        <div id="HomePageWrapper">
            <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>
            <div id="homePageWrapperInner">
                <h3 className="pt-4 px-4 mt-2" style={{textAlign: "left"}}>
                    Dobrodošli nazad, {user.first_name} {user.last_name}.
                </h3>
                <p style={{textAlign: "left"}} className="px-4">Što ćemo raditi danas?</p>
                <div className='homePageCardSection p-4 pt-0 ps-3' >
                    {(currentRole === "doctor" || currentRole === "pediatrician") && (
                        <HomeCard title="Moji Pacijenti" url = "/users" description="34 pacijenata" image={patientsImage} buttonText="Vidi sve" />
                    )}
                    {(currentRole === "admin") && (
                        <HomeCard title="Korisnici" url = "/users"  description="34 korisnika" image={patientsImage} buttonText="Vidi sve" />
                    )}
                    <HomeCard title="Druga Mišljenja" description="3 za pregled" image={drugoMisljenje} buttonText="Pregledaj" url = "/drugaMisljenja"/>
                    <HomeCard title="Preporuke za bolovanje"  description="7 za pregled" image={bolovanje} buttonText="Pregledaj" url = "/bolovanja"/>
                    {(currentRole === "parent")  && (
                        <HomeCard title="Moja djeca" url = "/users" description="3 prijavljenje djece" image={djeca} buttonText="Vidi sve"/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
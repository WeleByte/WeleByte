import React, {useEffect, useState} from 'react';
import Navbar from '../components/Header';
import patientsImage from '../assets/images/patientsNo2.png'
import drugoMisljenje from '../assets/images/drugoMisljenje.png'
import bolovanje from '../assets/images/bolovanje.png'
import djeca from '../assets/images/kids2.png'
import HomeCard from '../components/HomeCard';
import {useNavigate} from "react-router-dom";

const HomePage = (props) => {

    const uloga = "doktor"
    const navigate = useNavigate()
    const bearerToken = sessionStorage.getItem('bearerToken');
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

    if(!bearerToken){
        return null
    }
    return (
        <div id="HomePageWrapper">
            <Navbar></Navbar>
            <div id="homePageWrapperInner">
                <h3 className="pt-4 px-4 mt-2" style={{textAlign: "left"}}>
                    Dobrodošli nazad, {user.first_name} {user.last_name}.
                </h3>
                <p style={{textAlign: "left"}} className="px-4">Što ćemo raditi danas?</p>
                <div className='homePageCardSection p-4 pt-0 ps-3' >
                    {(roles.includes("doctor") || roles.includes("pediatrician")) && (
                        <HomeCard title="Moji Pacijenti" description="34 pacijenata" image={patientsImage} buttonText="Vidi sve"/>
                    )}
                    {(roles.includes("admin")) && (
                        <HomeCard title="Korisnici" description="34 korisnika" image={patientsImage} buttonText="Vidi sve"/>
                    )}
                    <HomeCard title="Druga Mišljenja" description="3 za pregled" image={drugoMisljenje} buttonText="Pregledaj"/>
                    <HomeCard title="Preporuke za bolovanje" description="7 za pregled" image={bolovanje} buttonText="Pregledaj"/>
                    {(roles.includes("parent"))  && (
                        <HomeCard title="Moja djeca" description="3 prijavljenje djece" image={djeca} buttonText="Vidi sve"/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
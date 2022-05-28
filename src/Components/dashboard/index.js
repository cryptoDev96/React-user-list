import React, {useState, useEffect, useRef} from 'react';
import UserInfo from '../UserInfo';
import "../../Styles/index.css";
import axios from 'axios';
import UserModal from '../UserModal';
//start git redux-saga
const Dashboard = () => {
    const [componentUser, setComponentUser] = useState([]);
    const [filterGender, setFilterGender] = useState("all");
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const stateRef = useRef();
    stateRef.current = componentUser;

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(
            "https://randomuser.me/api/?results=20"
            );
            response.data.results.map((user, i) => {
                setComponentUser(componentUser => [...componentUser,
                    <UserInfo parentCallback={handleCallback} key={user.login.uuid} user={user} />]);
            });
        };
        getData();
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log("you're at the bottom of the page");
                // Show loading spinner and make fetch request to api
                getData();    
            }
        });
    }, []);
    const handleCallback = (childUserID, show) => {
        if(!show) {
            const filteredUsers = stateRef.current.filter((item) => 
                item.key !== childUserID
            );
            setComponentUser(filteredUsers); 
        } 
        else {
            const modalData = stateRef.current.filter((item) => item.key === childUserID)
            setShow(true);
            setModalData(modalData);
        }
    }
    
    const selectGender = (event) => {
        setFilterGender(event.target.value);
    }
    
    const hideModal = () => {
        setShow(false);
    }
    
    return (
        <div className='content' >
            <UserModal show={show} modalData={modalData} handleClose={hideModal} >
            </UserModal>
            <div className='selectGender'>
                <select className='genderFilter chakra-select' onChange={selectGender}>
                    <option value="all">No filter</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className='userList'>
                {(filterGender === "all") ? 
                (componentUser) :
                (componentUser.map((user, i) => {
                    if(user.props.user.gender === filterGender)
                        return user;
                }))
                }
            </div>
        </div>
    )
}

export default Dashboard;
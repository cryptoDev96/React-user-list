import React, {userState, useEffect, useState} from 'react';
import UserInfo from '../userInfo';
import "../../Styles/index.css";
import axios from 'axios';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        this.getUserData();
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
               console.log("you're at the bottom of the page");
               // Show loading spinner and make fetch request to api
               this.getUserData();     
            }
        });
    }
   
    getUserData = () => {
        // const [userData, setUserData] = useState([]);
        // useEffect(() =>  {
        //     const loadData = async () => {
        //         const response = await axios.get("https://randomuser.me/api/");
        //         setUserData(response.data);
        //         console.log(userData);
        //     }
        //     loadData();
        // }, []);
        let oldList, newList = [];

        const loadData = async () => {
            const response = await axios.get("https://randomuser.me/api/?results=20");
            oldList = this.state.userList;
            newList = oldList.push(response.data.results);
            console.log(newList.length);
            this.setState({userList: response.data.results});
        }
        loadData();
    }

    render() {
        return (
            <div className='content' >
                <div className='selectGender'>
                    <select className='genderFilter chakra-select'>
                        <option value="all">No filter</option>
                        <option value="male">Male</option>
                        <option value="femail">Female</option>
                    </select>
                </div>
                <div className='userList'>
                    {this.state.userList.map((user, i) => {
                        return <UserInfo key={i} user={user} />
                    })}
                </div>
            </div>
        )
    }
}

export default Dashboard;
import React, {userState, useEffect, useState} from 'react';
import UserInfo from '../userInfo';
import "../../Styles/index.css";
import axios from 'axios';

class Dashboard extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            componentUsers: []
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

        const loadData = async () => {
            const response = await axios.get("https://randomuser.me/api/?results=20");
            
            response.data.results.map((user, i) => {
                
                this.setState(prevState => ({
                    componentUsers: [...prevState.componentUsers, <UserInfo key={user.login.uuid} user={user} />]
                }));
            });
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
                    {this.state.componentUsers}
                </div>
            </div>
        )
    }
}

export default Dashboard;
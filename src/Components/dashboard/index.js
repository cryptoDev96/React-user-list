import React from 'react';
import UserInfo from '../userInfo';
import "../../Styles/index.css";
import axios from 'axios';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentUsers: [],
            filterGender: "all"
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
            response.data.results.map((user) => {
                this.setState(prevState => ({
                    componentUsers: [...prevState.componentUsers, 
                        <UserInfo parentCallback={this.handleCallback} key={user.login.uuid} user={user} />]
                }));
            });
        }
        loadData();
    }

    handleCallback = (childUserID) => {
        const filteredUsers = this.state.componentUsers.filter((item) => 
            item.key !== childUserID
        );
        this.setState({componentUsers: filteredUsers});
    }

    selectGender = (event) => {
        this.setState({filterGender: event.target.value});
    }

    render() {
        return (
            <div className='content' >
                <div className='selectGender'>
                    <select className='genderFilter chakra-select' onChange={this.selectGender}>
                        <option value="all">No filter</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className='userList'>
                    {(this.state.filterGender === "all") ? 
                    (this.state.componentUsers) :
                    (this.state.componentUsers.map((user, i) => {
                        if(user.props.user.gender === this.state.filterGender)
                            return user;
                    }))
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard;
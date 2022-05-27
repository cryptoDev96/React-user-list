import React from 'react';
import UserInfo from '../userInfo';
import "../../Styles/index.css";
import axios from 'axios';
import UserModal from '../userModal';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentUsers: [],
            filterGender: "all",
            show: false,
            modalData: []
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

    handleCallback = (childUserID, show) => {
        if(!show) {
            const filteredUsers = this.state.componentUsers.filter((item) => 
            item.key !== childUserID
            );
            this.setState({componentUsers: filteredUsers});
        } 
        else {
            const modalData = this.state.componentUsers.filter((item) => item.key === childUserID)
            this.setState({
                show: show,
                modalData: modalData
            });
        }
            
    }

    selectGender = (event) => {
        this.setState({filterGender: event.target.value});
    }

    hideModal = () => {
        this.setState({show: false});
    }

    render() {
        return (
            
            <div className='content' >
                <UserModal show={this.state.show} modalData={this.state.modalData} handleClose={this.hideModal} >
           
                </UserModal>
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
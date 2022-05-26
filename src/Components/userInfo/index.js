import React from 'react';

class UserInfo extends React.Component {
 
    render() {
        const {gender, name, picture} = this.props.user;

        return (
            <div className='card'>
                <div className='cardHeader'>
                    
                </div>
                <div className='cardImgContent'>
                    <div className='cardImg'>
                        <img alt="Profile Image" className='chakra-image userImg'
                        src={picture.thumbnail} />    
                    </div>
                    
                </div>
                <p className='userName'>{name.first + name.last}</p>
                <p className='userGender'>{gender}</p>
                <button className='chakra-button userBtn'>Connect</button>
            </div>
        )
    }
}

export default UserInfo;
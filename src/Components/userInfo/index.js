import React from 'react';
import "../../Styles/index.css";

const UserInfo = (props) => {
    const closeCard = (uuid, show) => {
        props.parentCallback(uuid,show);
    }
    const {gender, name, picture, login} = props.user;
    return (
        <div className='Card'>
            <div className='Close-icon' onClick={() => closeCard(login.uuid, false)}>
                <div className='Close'></div>
            </div>
            <div className='Card-header'>
                
            </div>
            <div className='Card-img-content'>
                <div className='Card-img'>
                    <img alt="Profile Image" className='User-img'
                    src={picture.thumbnail} />    
                </div>
            </div>
            <p className='User-name'>{name.first + name.last}</p>
            <p className='User-gender'>{gender}</p>
            <button className='User-btn' onClick={() => closeCard(login.uuid, true)}>Connect</button>
        </div>
    )
}

export default UserInfo;
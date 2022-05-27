import React from 'react';
import "../../Styles/index.css";

const UserModal = ({handleClose, show, modalData}) => {
    const showHideClassName = show? "modal display-block" : "display-none"
    // {setUser(modalData)}
    return (
        
            <div className={showHideClassName}>
                <div className='modal-main'>
                    {modalData.map((item, i) => {
                        return (
                        <div key={i}>
                            <p className='chakra-text modal-name'>{item.props.user.name.first + item.props.user.name.last}</p>
                            <p className='chakra-text'>Phone Number: {item.props.user.phone}</p>
                            <p className='chakra-text'>Email: {item.props.user.email}</p>
                        </div>)
                    })}
                    <button className='chakra-button modal-button' onClick={handleClose}>
                        close
                    </button>
                </div>
            </div>
            
        )
}

export default UserModal;
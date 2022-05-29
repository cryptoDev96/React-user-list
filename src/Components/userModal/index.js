import React from 'react';
import "../../Styles/index.css";

const UserModal = ({handleClose, show, modalData}) => {
    const showHideClassName = show? "Modal Display-block" : "Display-none"
    return (
            <div className={showHideClassName}>
                <div className='Modal-main'>
                    {modalData.map((item, i) => {
                        return (
                        <div key={i}>
                            <p className='Modal-name'>{item.props.user.name.first + item.props.user.name.last}</p>
                            <p className=''>Phone Number: {item.props.user.phone}</p>
                            <p className=''>Email: {item.props.user.email}</p>
                        </div>)
                    })}
                    <button className='Modal-btn' onClick={handleClose}>
                        Ok
                    </button>
                </div>
            </div>
        )
}

export default UserModal;
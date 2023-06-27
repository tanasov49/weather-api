import React from 'react';
interface IPopup {
    selectPopup: boolean,
    refPopup: null,
    children: React.ReactNode
}
function Popup({children, selectPopup, refPopup}: IPopup) {
    return (
        <div className={selectPopup ? 'popup popup_active' : 'popup'}>
            <div ref={refPopup} className='popup-container'>
                {children}
            </div>
        </div>
    );
}

export default Popup;
import React from "react";
import "./styles.scss";
interface IPopup {
    selectPopup: boolean;
    refPopup: null;
    children: React.ReactNode;
    clickList: () => void,
    textButton: string,
    titlePopup: string
}
function Popup({ children, selectPopup, refPopup, clickList, textButton, titlePopup}: IPopup) {
    return (
        <>
            <h2 className="title-active">{titlePopup}</h2>
            <button onClick={clickList} className="button-select" type="button">{textButton}</button>
            <div className={selectPopup ? "popup popup_active" : "popup"}>
                <div ref={refPopup} className="popup-container">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Popup;

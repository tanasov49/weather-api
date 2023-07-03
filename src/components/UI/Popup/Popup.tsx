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
        <div className="block-list">
            <h2 className="block-list__title">{titlePopup}</h2>
            <button onClick={clickList} className="block-list__button-select" type="button">{textButton}</button>
            <div className={selectPopup ? "popup popup_active" : "popup"}>
                <div ref={refPopup} className="popup-container">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Popup;

import { useState } from "react";
import "../styles/general.css"
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { mdiChevronDown,mdiChevronUp } from '@mdi/js';


function GeneralSection() {
    const [showLink, setShowLink] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowLink(newView);
    }

    const showSectionBtn = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowSection(newView);
    }

    
    return (
        <section className="general-section">
            <div className="header-section">
                <div>
                    <Icon path={mdiAccount} className="header-icon" />
                    <h2>General Information</h2>
                </div>
                    {!showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                        <Icon path={mdiChevronDown} className="header-icon" />
                    </button>}
                    {showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                        <Icon path={mdiChevronUp} className="header-icon" />
                    </button>}
            </div>
            {showSection && <GeneralSectionForm/>}
            {showSection && <div className="additional-link-section">
                <button 
                  type="button"
                  onClick={onBtnClick(showLink)}>
                    Additional Links
                </button>
                {showLink && <GeneralSectionFormLinks/>}
            </div>}
        </section>
    )
}

function GeneralSectionForm() {
    return (
        <form className="general-info">
            <div className="input-field">
                <label htmlFor="general-name">Full Name</label>
                <input type="text" name="general-name" id="general-name" />
            </div>
            <div className="input-field">
                <label htmlFor="general-email">Email</label>
                <input type="email" name="general-email" id="general-email" />
            </div>
            <div className="input-field">
                <label htmlFor="general-phone">Phone Number</label>
                <input type="email" name="general-phone" id="general-phone" />
            </div>
        </form>
    )
}

function GeneralSectionFormLinks() {
    const supportedLinks = ["LinkedIn", "GitHub"];
    
    return (
        <div className="input-links">
            <form className="general-info-links">
            {supportedLinks.map((link)=> {
                return (
                <div className="input-box">
                    <label htmlFor={"general-link-" + link.toLocaleLowerCase()}>{link}</label>
                    <input type="url" name={"general-link-" + link.toLocaleLowerCase()} id={"general-link-" + link.toLocaleLowerCase()}/>
                </div> 
                )
            })}
            </form>
        </div>
    )
}

export {GeneralSection}
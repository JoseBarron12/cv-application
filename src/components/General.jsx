import { useState } from "react";
import "../styles/general.css"
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { mdiChevronDown,mdiChevronUp, mdiPlus, mdiMinus } from '@mdi/js';

function GeneralSection({generalInput, setGeneralInput}) {
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
            {showSection && <GeneralSectionForm userInput = {generalInput} callBack={setGeneralInput}/>}
            {showSection && <div className="additional-link-section">
                <button 
                  type="button"
                  onClick={(onBtnClick(showLink))}>
                    Additional Links
                    {!showLink && <Icon path={mdiPlus} className="link-icon plus-icon" />}
                    {showLink && <Icon path={mdiMinus} className="link-icon plus-icon" />}
                </button>
                {showLink && <GeneralSectionFormLinks userInput = {generalInput} callBack={setGeneralInput} />}
            </div>}
        </section>
    )
}

function GeneralSectionForm({userInput, callBack}) {
    return (
        <form className="general-info">
            <div className="input-field">
                <label htmlFor="general-name">Full Name</label>
                <input type="text" name="general-name" id="general-name" 
                value={userInput.name} onChange={(event) => {
                    callBack({...userInput, name: event.target.value})
                }}/>
            </div>
            <div className="input-field">
                <label htmlFor="general-email">Email</label>
                <input type="email" name="general-email" id="general-email" 
                 value={userInput.email} onChange={(event) => {
                    callBack({...userInput, email: event.target.value})
                }}/>
            </div>
            <div className="input-field">
                <label htmlFor="general-phone">Phone Number</label>
                <input type="tel" name="general-phone" id="general-phone" 
                value={userInput.number} onChange={(event) => {
                    callBack({...userInput, number: event.target.value})
                }}/>
            </div>
        </form>
    )
}

function GeneralSectionFormLinks({userInput, callBack}) {
    const supportedLinks = ["LinkedIn", "GitHub"];
    
    return (
        <div className="input-links">
            <form className="general-info-links">
            {supportedLinks.map((link, index)=> {
                if(link == "LinkedIn")
                {
                    return (
                    <div className="input-field" key={userInput.id + index}>
                        <label htmlFor={"general-link-" + link.toLocaleLowerCase()}>{link}</label>
                        <input type="url" name={"general-link-" + link.toLocaleLowerCase()} id={"general-link-" + link.toLocaleLowerCase()}
                        value={userInput.linkedIn} onChange={(event) => {
                            callBack({...userInput, linkedIn: event.target.value})
                        }}/>
                    </div> 
                    )
                }
                else if(link == "GitHub") {
                     return (
                    <div className="input-field" key={userInput.id + index}>
                        <label htmlFor={"general-link-" + link.toLocaleLowerCase()}>{link}</label>
                        <input type="url" name={"general-link-" + link.toLocaleLowerCase()} id={"general-link-" + link.toLocaleLowerCase()}
                        value={userInput.github} onChange={(event) => {
                            callBack({...userInput, github: event.target.value})
                        }}/>
                    </div> 
                    )
                }
                else {
                    return (
                    <div className="input-box" key={userInput.id + index}>
                        <label htmlFor={"general-link-" + link.toLocaleLowerCase()}>{link}</label>
                        <input type="url" name={"general-link-" + link.toLocaleLowerCase()} id={"general-link-" + link.toLocaleLowerCase()}/>
                    </div> 
                )
                }
            })}
            </form>
        </div>
    )
}

export {GeneralSection}
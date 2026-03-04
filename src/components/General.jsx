import { useState } from "react";
import "../styles/general.css"
import Icon from '@mdi/react';
import { mdiAccount, mdiClose } from '@mdi/js';
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

function GeneralInput({type, name, id, initialValue, callBack, userInput}) {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [displayX, setDisplayX] = useState(false);

    return (
        <div>
            <input type={type} name={name} id={id} value={currentValue} 
            onChange={(event) => {
                    event.preventDefault();
                    
                    if(type == "text") {
                        callBack({...userInput, name: event.target.value})
                    } else if(type == "email") {
                        callBack({...userInput, email: event.target.value})
                    } else if(type == "tel") {
                        callBack({...userInput, number: event.target.value})
                    } else if(type == "linkedin") {
                        callBack({...userInput, linkedIn: event.target.value})
                    } else if(type == "github") {
                        callBack({...userInput, github: event.target.value})
                    }

                    setCurrentValue(event.target.value);
                    setDisplayX(true);
                    
            }}/>
            {displayX && <ResetBtn callBack={callBack} setCurrentValue={setCurrentValue} setDisplayX={setDisplayX} userInput={userInput} type={type}/>}
        </div>

    )
}

function ResetBtn({callBack, setCurrentValue, setDisplayX, userInput, type}) {
    return (
        <button type="button"  onClick={(event) => {
            event.preventDefault()
            
            if(type == "text") {
                callBack({...userInput, name: ""})
            } else if(type == "email") {
                callBack({...userInput, email: ""})
            } else if(type == "tel") {
                callBack({...userInput, number: ""})
            } else if(type == "linkedin") {
                callBack({...userInput, linkedIn: ""})
            } else if(type == "github") {
                callBack({...userInput, github: ""})
            }


            setCurrentValue("");
            setDisplayX(false);
        }}><Icon path={mdiClose} className="close-icon" />
        </button>
    )
}

function GeneralSectionForm({userInput, callBack}) {
    return (
        <form className="general-info">
            <div className="input-field">
                <label htmlFor="general-name">Full Name</label>
                <GeneralInput type={"text"} name={"general-name"} 
                id={"general-name"} callBack={callBack} userInput={userInput} initialValue={userInput.name}/>
            </div>
            <div className="input-field">
                <label htmlFor="general-email">Email</label>
                <GeneralInput type={"email"} name={"general-email"} 
                id={"general-email"} callBack={callBack} userInput={userInput} initialValue={userInput.email}/>
            </div>
            <div className="input-field">
                <label htmlFor="general-phone">Phone Number</label>
                <GeneralInput type={"tel"} name={"general-phone"} 
                id={"general-phone"} callBack={callBack} userInput={userInput} initialValue={userInput.number}/>
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
                        <GeneralInput type={link.toLocaleLowerCase()} name={"general-link-" + link.toLocaleLowerCase()} 
                        id={"general-link-" + link.toLocaleLowerCase()} callBack={callBack} userInput={userInput} initialValue={userInput.linkedIn}/>
                    </div> 
                    )
                }
                else if(link == "GitHub") {
                     return (
                    <div className="input-field" key={userInput.id + index}>
                        <label htmlFor={"general-link-" + link.toLocaleLowerCase()}>{link}</label>
                        <GeneralInput type={link.toLocaleLowerCase()} name={"general-link-" + link.toLocaleLowerCase()} 
                        id={"general-link-" + link.toLocaleLowerCase()} callBack={callBack} userInput={userInput} initialValue={userInput.github}/>
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
import { useState } from "react";

function GeneralSection() {
    const [showLink, setShowLink] = useState(false);

    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowLink(newView);
    }
    
    return (
        <section className="general-section">
            <h2>General Information</h2>
            <GeneralSectionForm/>
            <div className="additional-link-section">
                <button 
                  type="button"
                  onClick={onBtnClick(showLink)}>
                    Additional Links
                </button>
                {showLink && <GeneralSectionFormLinks/>}
            </div>
        </section>
    )
}

function GeneralSectionForm() {
    return (
        <form className="general-info">
            <div className="input-box">
                <label htmlFor="general-name">Full Name</label>
                <input type="text" name="general-name" id="general-name" />
            </div>
            <div className="input-box">
                <label htmlFor="general-email">Email</label>
                <input type="email" name="general-email" id="general-email" />
            </div>
            <div className="input-box">
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
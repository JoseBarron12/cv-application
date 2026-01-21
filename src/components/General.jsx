function GeneralSection() {
    return (
        <section className="general-section">
            <h2>General Information</h2>
            <GeneralSectionForm showLinks={true}/>
        </section>
    )
}

function GeneralSectionForm({showLinks}) {
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
            {showLinks && <GeneralSectionFormLinks/>}
        </form>
    )
}

function GeneralSectionFormLinks() {
    const supportedLinks = ["LinkedIn", "GitHub"];
    
    return (
        <div className="input-links">
            <h4>Additional Links</h4>
            {supportedLinks.map((link)=> {
                return (
                <div className="input-box">
                    <label htmlFor={"general-link-" + link.toLocaleLowerCase()}>{link}</label>
                    <input type="url" name={"general-link-" + link.toLocaleLowerCase()} id={"general-link-" + link.toLocaleLowerCase()}/>
                </div> 
                )
            })}
        </div>
    )
}

export {GeneralSection}
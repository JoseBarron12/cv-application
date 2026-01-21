function GeneralSection() {
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

export {GeneralSection}
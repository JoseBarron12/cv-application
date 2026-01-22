import { useState } from "react";

function EducationSectionForm() {
    return (
        <form className="education-info">
            <fieldset>
                <legend>School Information</legend>
                <div className="input-field">
                    <label htmlFor="school-name">School</label>
                    <input type="text" name="school-name" id="school-name" />
                </div>
                <div className="input-field">
                    <label htmlFor="location-name">Location</label>
                    <input type="text" name="location-name" id="location-name" />
                </div>
            </fieldset>
            
        </form>
    )
}

export {EducationSectionForm}

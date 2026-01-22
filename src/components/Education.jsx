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
            <fieldset>
                <legend>Degree Information</legend>
                <div className="input-field">
                    <label htmlFor="degree-name">Degree</label>
                    <input type="text" name="degree-name" id="degree-name" />
                </div>
                <div className="input-field">
                    <label htmlFor="study-name">Field of study</label>
                    <input type="text" name="study-name" id="study-name"/>
                </div>
                <div className="input-field">
                    <label htmlFor="start-date">Start date</label>
                </div>
                <div className="input-field">
                    <label htmlFor="end-date">End date</label>
                </div>
                <div className="input-field">
                    <label htmlFor="grade-info">GPA</label>
                    <input type="text" name="grade-info" id="grade-info"/>
                </div>
            </fieldset>
        </form>
    )
}

export {EducationSectionForm}

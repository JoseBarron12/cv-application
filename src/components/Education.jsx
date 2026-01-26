import { useState } from "react";
import { eachMonthOfInterval, format, subYears, addYears, eachYearOfInterval } from "date-fns";

function EducationSection() {
    const [showEducation, setShowEducation] = useState([]);
    
    return (
        <section className="education-section">
            <h2>Education Information</h2>
            <button
             type="button"
             onClick={() => 
                {   
                    setShowEducation([
                        ...showEducation,
                        <EducationSectionForm key={crypto.randomUUID()}/>
                    ])
                    console.log(showEducation);
                }}
            >Add New Education Information</button>
            {showEducation.length != 0 && showEducation.map((form, index) => {
                return (
                    <div className="education-info-section" key={index}>
                        {form}
                        <button 
                         type="button" 
                         className="close-edu-btn"
                         onClick={() => {
                            const newArray = showEducation.filter((formUI, i) => {
                                return i != index
                            });
                            setShowEducation(newArray);
                         }
                         }>X</button>
                    </div>
                    )
            })}
        </section>
    )
}



function EducationSectionForm({numOfEdu}) {
    const [showAchievements, setShowAchievements] = useState(false);
    
    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowAchievements(newView);
    }
    return (
        <form className={"education-info" + numOfEdu}>
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
                    <EducationSectionFormDate isStart={true} idName={"start-date"}/>
                </div>
                <div className="input-field">
                    <label htmlFor="end-date">End date</label>
                    <EducationSectionFormDate isStart={false} idName={"end-date"}/>
                </div>
                <div className="input-field">
                    <label htmlFor="grade-info">GPA</label>
                    <input type="text" name="grade-info" id="grade-info"/>
                </div>
            </fieldset>
            <div className="additional-achievement-section">
                <button 
                  type="button"
                  onClick={onBtnClick(showAchievements)}>
                    Additional Achievements
                </button>
                {showAchievements && <EducationSectionFormAchievement/>}
            </div>
        </form>
    )
}

function EducationSectionFormDate({isStart, idName}) {
    
    const months = eachMonthOfInterval({
        start: new Date(2012, 12, 31),
        end: new Date(2013, 11, 31)
    });

    const years = isStart ? eachYearOfInterval({
        start: new Date(),
        end: subYears(new Date(), 100)
        }) : eachYearOfInterval({
        start: addYears(new Date(), 10),
        end: subYears(new Date(), 100)
    });

    return (
        <div className="date-field">
            <select name="months" id={"month-" + idName}>
               <option value={-1}>Month</option>
               {months.map((month, index) => {
                    return (
                        <option value={index + 1}>
                            {format(month, 'MMMM')}
                        </option>
                    )
               })} 
            </select>
            <select name="years" id={"year-" + idName}>
               <option value={-1}>Year</option>
               {years.map((year) => {
                    return (
                        <option value={year}>
                            {format(year, 'yyyy')}
                        </option>
                    )
               })} 
            </select>
        </div>
    )
}

function EducationSectionFormAchievement() {
    return (
        <fieldset>
            <legend>Add New Achievement</legend>
            <div className="input-field">
                <label htmlFor="achievement-info">Name</label>
                <input type="text" name="achievement-info" id="achievement-info"/>
            </div>
        </fieldset>
    )
}


export {EducationSection}
